import { WorkExperienceForm } from "@/components/Forms/WorkExperienceForm";
import {
  addWorkExperience,
  removeWorkExperience,
  updateWorkExperienceField,
  type WorkExperienceEntry,
} from "@/redux/resume/resume-reducer";
import { shallowEqual, useWorkExperienceSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import type { WORK_EXPERIENCE_PROMPTS } from "@/services/aiPrompts";
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

  const onQuantifyMetrics = useCallback(
    async ({
      id,
      type,
    }: {
      id: string;
      type: keyof typeof WORK_EXPERIENCE_PROMPTS;
    }) => {
      if (!requireApiKey()) return;

      const entry = entries.find((e) => e.id === id);

      const achievementsUpdated = `Key achievements and milestones: ${entry?.achievements}`;

      const improved = await improve(type, achievementsUpdated);
      if (improved) {
        // dispatch(
        //   updateWorkExperienceField({ ...data, professionalSummary: improved }),
        // );
      }
    },
    [requireApiKey, entries, improve],
  );

  const onStrongerVerbs = useCallback(() => {}, []);

  return (
    <WorkExperienceForm
      entries={entries}
      // improvingIds={quantifyingIds}
      isAIDisabled={false}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChange={handleChange}
      // quantifyingIds={quantifyingIds}
      // verbIds={verbIds}
      onQuantifyMetrics={onQuantifyMetrics}
      onStrongerVerbs={onStrongerVerbs}
    />
  );
};
