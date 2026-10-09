import { PersonalInfoForm } from "@/components/Forms/PersonalInfoForm";
import {
  updatePersonalInfoField,
  type PersonalInfoData,
} from "@/redux/resume/resume-reducer";
import { shallowEqual, usePersonalInfoSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { useAI } from "@hooks/useAI";
import { useRequireAIProvider } from "@hooks/useRequireAIProvider";
import { useTextTitles } from "@hooks/useTextTitles";
import { useCallback } from "react";

/**
 * View controller for the Personal Info form section.
 *
 * Connects the {@link PersonalInfoForm} UI to Redux state and the AI summary.
 *
 * @remarks
 * - Field changes are dispatched via {@link updatePersonalInfoField}
 * - Smart Rewrite writes a new summary from the professional title with
 *   {@link useAI}, after the AI finds the profession the title (or keyword)
 *   points to
 * - Clearing the title clears the summary, since it described that title
 * - If this browser can't run the AI, {@link useRequireAIProvider} explains why
 */
const SUMMARY_KEY = "professionalSummary";

export const PersonalInfoFormView = () => {
  const dispatch = useAppDispatch();
  const data = usePersonalInfoSelector((s) => s, shallowEqual);
  const { improve, isLoading } = useAI();
  const { requireAIProvider } = useRequireAIProvider();
  // Which title the summary was written for
  const { setTextTitle, isSameTitle } = useTextTitles({
    [SUMMARY_KEY]: data.professionalTitle,
  });

  const setSummary = useCallback(
    (value: string) =>
      dispatch(updatePersonalInfoField({ field: "professionalSummary", value })),
    [dispatch],
  );

  const handleChange = useCallback(
    (field: keyof PersonalInfoData, value: string) => {
      dispatch(updatePersonalInfoField({ field, value }));
      // The user wrote this summary for the current title
      if (field === "professionalSummary") {
        setTextTitle(SUMMARY_KEY, data.professionalTitle);
      }
      // Without a title the summary no longer describes anyone's job
      if (field === "professionalTitle" && !value.trim()) setSummary("");
    },
    [dispatch, setTextTitle, setSummary, data.professionalTitle],
  );

  const onSmartRewrite = useCallback(async () => {
    if (!requireAIProvider()) return;

    const title = data.professionalTitle.trim();
    const summary = data.professionalSummary.trim();
    // The button is disabled without a title - the summary is written from it
    if (!title) return;

    // Start from an empty field: the AI writes a new summary from the title
    setSummary("");
    const improved = await improve(
      "smartRewrite",
      (profession) => `Job title: ${profession}`,
      "summary",
      {
        // The AI first finds the profession the title points to
        jobTitle: title,
        // Show the text in the field while the AI writes it
        onPartial: setSummary,
      },
    );
    if (improved) {
      setTextTitle(SUMMARY_KEY, title);
      setSummary(improved);
      return;
    }
    // Rejected or failed: bring the previous summary back only if it was
    // written for this same title - otherwise it describes another job
    setSummary(isSameTitle(SUMMARY_KEY, title) ? summary : "");
  }, [
    requireAIProvider,
    data,
    improve,
    setSummary,
    setTextTitle,
    isSameTitle,
  ]);

  return (
    <PersonalInfoForm
      data={data}
      isRewriting={isLoading}
      isRewriteDisabled={!data.professionalTitle.trim()}
      onChange={handleChange}
      onSmartRewrite={onSmartRewrite}
    />
  );
};
