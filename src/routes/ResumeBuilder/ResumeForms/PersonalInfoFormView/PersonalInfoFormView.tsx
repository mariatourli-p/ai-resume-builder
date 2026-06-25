import { PersonalInfoForm } from "@/components/Forms/PersonalInfoForm";
import {
  setPersonalInfo,
  toggleDialog,
  updatePersonalInfoField,
  type PersonalInfoData,
} from "@/redux/resume/resume-reducer";
import { shallowEqual, usePersonalInfoSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { AI_PROMPTS } from "@/services/aiPrompts";
import { useAI } from "@hooks/useAI";
import { useRequireApiKey } from "@hooks/useRequireApiKey";
import { useCallback } from "react";

/**
 * View controller for the Personal Info form section.
 *
 * Connects the {@link PersonalInfoForm} UI to Redux state and AI enhancement logic.
 * Handles field updates, AI-powered summary improvement, and API key validation
 * before any AI action is triggered.
 *
 * @remarks
 * - Field changes are dispatched via {@link updatePersonalInfoField}
 * - AI enhancement uses {@link useAI} with prompts from {@link AI_PROMPTS}
 * - If no API key is set, {@link useRequireApiKey} opens the missing key dialog automatically
 */
export const PersonalInfoFormView = () => {
  const dispatch = useAppDispatch();
  const data = usePersonalInfoSelector((s) => s, shallowEqual);
  const { improve, isLoading: isEnhancing } = useAI();
  const { requireApiKey } = useRequireApiKey();

  const handleChange = useCallback(
    (field: keyof PersonalInfoData, value: string) => {
      dispatch(updatePersonalInfoField({ field, value }));
    },
    [dispatch],
  );

  const onEnhance = useCallback(
    async (prompt: keyof typeof AI_PROMPTS) => {
      if (!requireApiKey()) return;

      const text = `You are a resume writing expert. Rewrite the following text to be concise, professional, and impactful. 
Return ONLY the improved text. No questions, no options, no markdown, no explanations. Just the rewritten content.;. Job title: ${data.professionalTitle}`;

      // If no professional title is given, request that first to create the summary
      if (!data.professionalTitle) {
        dispatch(
          toggleDialog({
            type: "moreContext",
            message: "Please add professional summary",
          }),
        );
        return;
      }

      const improved = await improve(prompt, text, "summary");
      if (improved) {
        dispatch(setPersonalInfo({ ...data, professionalSummary: improved }));
      }
    },
    [requireApiKey, data, improve, dispatch],
  );

  return (
    <PersonalInfoForm
      data={data}
      isEnhancing={isEnhancing}
      isRewriting={isEnhancing}
      isEnhanceDisabled={!data.professionalSummary}
      onChange={handleChange}
      onEnhance={onEnhance}
      onSmartRewrite={onEnhance}
    />
  );
};
