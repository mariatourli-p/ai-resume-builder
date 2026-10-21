import { PersonalInfoForm } from "@/components/Forms/PersonalInfoForm";
import {
  updatePersonalInfoField,
  type PersonalInfoData,
} from "@/redux/resume/resume-reducer";
import { shallowEqual, usePersonalInfoSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { useAI } from "@hooks/useAI";
import { useEnsureAIAvailable } from "@hooks/useEnsureAIAvailable";
import { resizePhoto } from "@/utils/resizePhoto";
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
 * - Editing or deleting the title keeps the summary; only Smart Rewrite
 *   replaces it, and only with a summary that passed the AI's check
 * - If this browser can't run the AI, {@link useEnsureAIAvailable} explains why
 */
export const PersonalInfoFormView = () => {
  const dispatch = useAppDispatch();
  /**
   * All Personal Info fields, because the form shows all of them.
   * `shallowEqual` re-renders this view only when one of these fields
   * changes - typing in other sections (Work Experience, Skills) doesn't.
   */
  const data = usePersonalInfoSelector((s) => s, shallowEqual);
  /**
   * `improve` runs the AI request; `isLoading` shows the spinner on the
   * Smart Rewrite button while the AI writes and checks the summary
   */
  const { improve, isLoading } = useAI();
  /**
   * Checked before every AI request: shows why the AI can't run in this
   * browser (e.g. not Chrome) instead of failing silently
   */
  const { ensureAIAvailable } = useEnsureAIAvailable();

  /**
   * Saves what the user types in any Personal Info field.
   *
   * When: on every key press in the form (passed as `onChange`).
   *
   * Why: the form fields show what is in Redux, so the new value must be
   * saved there to appear. Editing or deleting the title never touches the
   * summary - the user may be retyping the title. The summary only changes
   * when the user clicks Smart Rewrite.
   */
  const handleChange = useCallback(
    (field: keyof PersonalInfoData, value: string) => {
      dispatch(updatePersonalInfoField({ field, value }));
    },
    [dispatch],
  );

  /**
   * Saves the photo the user picked.
   *
   * When: the user chooses an image with Upload / Change photo (passed as
   * `onPhotoSelect`).
   *
   * Why: phone photos are several MB, but the whole resume must fit in
   * localStorage, so the image is cropped to a small square JPEG first. A
   * file the browser can't read as an image keeps the current photo.
   */
  const handlePhotoSelect = useCallback(
    async (file: File) => {
      try {
        const photo = await resizePhoto(file);
        dispatch(updatePersonalInfoField({ field: "photo", value: photo }));
      } catch {
        // Not a readable image - keep the current photo
      }
    },
    [dispatch],
  );

  /**
   * Removes the photo from the resume.
   *
   * When: the user clicks Remove next to the photo (passed as `onPhotoRemove`).
   */
  const handlePhotoRemove = useCallback(
    () => dispatch(updatePersonalInfoField({ field: "photo", value: "" })),
    [dispatch],
  );

  /**
   * Asks the AI to write a new summary from the professional title.
   *
   * When: the user clicks Smart Rewrite (passed as `onSmartRewrite`). The
   * button is disabled while the title is empty.
   *
   * Steps:
   * 1. Stops if the AI can't run in this browser
   * 2. `improve` finds the profession the title points to (e.g. "React" ->
   *    "React Developer"), writes a new summary from it and checks it
   * 3. Only a summary that passed the check replaces the current one. Until
   *    then the field keeps the user's text, so a rejected or failed rewrite
   *    leaves it untouched - the AI never deletes the user's text without
   *    writing a new one
   */
  const onSmartRewrite = useCallback(async () => {
    if (!ensureAIAvailable()) return;

    const title = data.professionalTitle.trim();
    // The button is disabled without a title - the summary is written from it
    if (!title) return;

    const improved = await improve(
      "smartRewrite",
      (profession) => `Job title: ${profession}`,
      "summary",
      // The AI first finds the profession the title points to
      { jobTitle: title },
    );
    if (improved) {
      dispatch(
        updatePersonalInfoField({
          field: "professionalSummary",
          value: improved,
        }),
      );
    }
  }, [ensureAIAvailable, data.professionalTitle, improve, dispatch]);

  return (
    <PersonalInfoForm
      data={data}
      isRewriting={isLoading}
      /**
       * The summary is written from the title, so there is nothing to
       * rewrite without one
       */
      isRewriteDisabled={!data.professionalTitle.trim()}
      onChange={handleChange}
      onSmartRewrite={onSmartRewrite}
      onPhotoSelect={handlePhotoSelect}
      onPhotoRemove={handlePhotoRemove}
    />
  );
};
