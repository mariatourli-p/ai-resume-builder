import { WorkExperienceForm } from "@/components/Forms/WorkExperienceForm";
import {
  addWorkExperience,
  removeWorkExperience,
  updateWorkExperienceField,
  type WorkExperienceEntry,
} from "@/redux/resume/resume-reducer";
import { shallowEqual, useWorkExperienceSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { useAI } from "@hooks/useAI";
import { useRequireApiKey } from "@hooks/useRequireApiKey";
import { useCallback } from "react";

/**
 * View controller for the Work Experience form section.
 *
 * Connects the {@link WorkExperienceForm} UI to Redux state and AI improvement logic.
 * Manages per-entry loading states for two distinct AI actions: metric quantification
 * and stronger verb rewrites.
 *
 * @remarks
 * - Entries are stored in Redux and updated via {@link updateWorkExperienceField}
 * - Each AI action tracks its loading state independently per entry id using `Set<string>`
 * - `quantifyingIds` tracks entries currently being quantified
 * - `verbIds` tracks entries currently undergoing verb improvement
 * - AI actions are no-ops if the entry's achievements field is empty
 * - {@link handleImprove} is a shared handler parameterized by prompt and state setter
 */

export const WorkExperienceFormView = () => {
  const dispatch = useAppDispatch();
  const entries = useWorkExperienceSelector((s) => s, shallowEqual);
  const { improve } = useAI();
  const { requireApiKey } = useRequireApiKey();

  const handleAdd = useCallback(() => {
    dispatch(addWorkExperience());
  }, [dispatch]);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(removeWorkExperience(id));
    },
    [dispatch],
  );

  const handleChange = useCallback(
    (
      id: string,
      field: keyof Omit<WorkExperienceEntry, "id">,
      value: string,
    ) => {
      dispatch(updateWorkExperienceField({ id, field, value }));
    },
    [dispatch],
  );

  const onGenerateAchievements = useCallback(
    async (id: string, roleTitle: string) => {
      if (!requireApiKey()) return;

      const improved = await improve(
        "generateAchievements",
        roleTitle,
        "achievements",
      );
      if (improved) {
        dispatch(
          updateWorkExperienceField({
            id,
            field: "achievements",
            value: improved,
          }),
        );
      }
    },
    [requireApiKey, improve, dispatch],
  );

  return (
    <WorkExperienceForm
      entries={entries}
      isAIDisabled={false}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChange={handleChange}
      onGenerateAchievements={onGenerateAchievements}
    />
  );
};
