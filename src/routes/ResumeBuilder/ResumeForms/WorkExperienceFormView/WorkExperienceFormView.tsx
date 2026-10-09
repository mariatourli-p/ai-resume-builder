import { WorkExperienceForm } from "@/components/Forms/WorkExperienceForm";
import {
  addWorkExperience,
  removeWorkExperience,
  updateWorkExperienceField,
  type WorkExperienceEntry,
} from "@/redux/resume/resume-reducer";
import { shallowEqual, useWorkExperienceSelector } from "@/redux/selectors";
import { useAppDispatch, useAppStore } from "@/redux/store";
import { useAI } from "@hooks/useAI";
import { useRequireAIProvider } from "@hooks/useRequireAIProvider";
import { useTextTitles } from "@hooks/useTextTitles";
import { useCallback, useState } from "react";

/**
 * View controller for the Work Experience form section.
 *
 * Connects the {@link WorkExperienceForm} UI to Redux state and the AI
 * achievements generation.
 *
 * @remarks
 * - Entries are stored in Redux and updated via {@link updateWorkExperienceField}
 * - `generatingIds` tracks the entries whose achievements the AI is writing
 * - Callbacks read the latest entries from the store when they run, so they
 *   stay stable and typing in one entry doesn't re-render the others
 */

export const WorkExperienceFormView = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const entries = useWorkExperienceSelector((s) => s, shallowEqual);
  const { improve } = useAI();
  const { requireAIProvider } = useRequireAIProvider();
  const [generatingIds, setGeneratingIds] = useState<string[]>([]);
  // Which role title each entry's achievements were written for
  const { setTextTitle, isSameTitle } = useTextTitles(
    Object.fromEntries(entries.map((entry) => [entry.id, entry.roleTitle])),
  );

  const findEntry = useCallback(
    (id: string) =>
      store.getState().resume.workExperience.find((entry) => entry.id === id),
    [store],
  );

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
      // The user wrote these achievements for the entry's current title
      if (field === "achievements") {
        setTextTitle(id, findEntry(id)?.roleTitle ?? "");
      }
      // Without a title the achievements no longer describe a role
      if (field === "roleTitle" && !value.trim()) {
        dispatch(
          updateWorkExperienceField({ id, field: "achievements", value: "" }),
        );
      }
    },
    [dispatch, setTextTitle, findEntry],
  );

  const onGenerateAchievements = useCallback(
    async (id: string, roleTitle: string) => {
      if (!requireAIProvider()) return;

      const previous = findEntry(id)?.achievements ?? "";
      const setAchievements = (value: string) =>
        dispatch(updateWorkExperienceField({ id, field: "achievements", value }));

      const title = roleTitle.trim();

      // Start from an empty field: the AI writes new achievements from the title
      setAchievements("");
      setGeneratingIds((ids) => [...ids, id]);
      // Show the bullets in the field while the AI writes them
      const improved = await improve(
        "generateAchievements",
        (profession) => `Job title: ${profession}`,
        "achievements",
        {
          // The AI first finds the profession the title points to
          jobTitle: title,
          onPartial: setAchievements,
        },
      ).finally(() =>
        setGeneratingIds((ids) => ids.filter((current) => current !== id)),
      );
      if (improved) {
        setTextTitle(id, title);
        setAchievements(improved);
        return;
      }
      // Rejected or failed: bring the previous text back only if it was
      // written for this same title - otherwise it describes another job
      setAchievements(isSameTitle(id, title) ? previous : "");
    },
    [
      requireAIProvider,
      improve,
      dispatch,
      findEntry,
      setTextTitle,
      isSameTitle,
    ],
  );

  return (
    <WorkExperienceForm
      entries={entries}
      isAIDisabled={false}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChange={handleChange}
      onGenerateAchievements={onGenerateAchievements}
      generatingIds={generatingIds}
    />
  );
};
