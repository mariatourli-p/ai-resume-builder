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
import { useCallback, useRef, useState } from "react";

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
 * - Editing or deleting a role title keeps the achievements; only Generate
 *   Achievements replaces them, and a failed run brings the previous text back
 */
export const WorkExperienceFormView = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  // All cards, to show them; callbacks read entries from `store` instead
  const entries = useWorkExperienceSelector((s) => s, shallowEqual);
  const { improve } = useAI();
  // Checked before every AI request: explains why the AI can't run here
  const { requireAIProvider } = useRequireAIProvider();
  // Cards whose achievements the AI is writing - shows their spinner
  const [generatingIds, setGeneratingIds] = useState<string[]>([]);
  /**
   * Cards whose achievements the AI wrote and the user hasn't edited since.
   * Their text is not sent back as the user's notes, so each run writes new
   * bullets. A ref, because it is only read when the button is clicked and
   * must not re-render the form.
   */
  const aiWrittenIds = useRef(new Set<string>());

  /**
   * Returns a card's latest data from the store.
   *
   * When: inside the callbacks below, at the moment they run.
   *
   * Why: reading the store instead of `entries` keeps the callbacks the same
   * function on every key press, so the memoized cards don't re-render.
   */
  const findEntry = useCallback(
    (id: string) =>
      store.getState().resume.workExperience.find((entry) => entry.id === id),
    [store],
  );

  // Adds an empty card. When: the user clicks Add Experience
  const handleAdd = useCallback(() => {
    dispatch(addWorkExperience());
  }, [dispatch]);

  // Removes a card. When: the user clicks the card's delete icon
  const handleDelete = useCallback(
    (id: string) => {
      dispatch(removeWorkExperience(id));
    },
    [dispatch],
  );

  /**
   * Saves what the user types in any field of a card.
   *
   * When: on every key press in a card (passed as `onChange`).
   *
   * Why, besides saving the value: once the user edits the achievements,
   * they count as the user's own notes again, even if the AI wrote them.
   *
   * Editing or deleting the role title never touches the achievements - the
   * user may be retyping the title. They only change when the user clicks
   * Generate Achievements.
   */
  const handleChange = useCallback(
    (
      id: string,
      field: keyof Omit<WorkExperienceEntry, "id">,
      value: string,
    ) => {
      dispatch(updateWorkExperienceField({ id, field, value }));
      if (field === "achievements") aiWrittenIds.current.delete(id);
    },
    [dispatch],
  );

  /**
   * Asks the AI to write the achievements of one card.
   *
   * When: the user clicks Generate Achievements on a card (the button is
   * disabled while the role title is empty).
   *
   * Steps:
   * 1. Stops if the AI can't run in this browser
   * 2. Keeps the current text; if the user wrote it, it becomes the notes
   *    the AI builds the bullets from
   * 3. Empties the field and shows the spinner
   * 4. `improve` finds the profession the role title points to, writes the
   *    bullets - showing them in the field as they are written - and checks
   *    the result
   * 5. On success, keeps the new bullets. On failure, brings the previous
   *    text back exactly as it was
   */
  const onGenerateAchievements = useCallback(
    async (id: string, roleTitle: string) => {
      console.log("🚀 ~  ~ id: , roleTitle: string:", id, roleTitle);
      if (!requireAIProvider()) return;

      const previous = findEntry(id)?.achievements ?? "";
      const updateAchievements = (value: string) =>
        dispatch(
          updateWorkExperienceField({ id, field: "achievements", value }),
        );

      const title = roleTitle.trim();
      /**
       * What the user wrote is the base for the new bullets. The AI's own
       * earlier bullets are not, so each run writes new ones.
       */
      const notes = aiWrittenIds.current.has(id) ? "" : previous.trim();
      /**
       * The profession alone loses the other keywords of the title
       * (e.g. the tools in "Python developer, Django, AWS"), so send both
       */
      const buildInput = (profession: string) =>
        [
          `Job title: ${profession}`,
          profession.toLowerCase() !== title.toLowerCase() &&
            `Role title as written: ${title}`,
          notes && `User's notes:\n${notes}`,
        ]
          .filter(Boolean)
          .join("\n\n");

      // Start from an empty field: the AI writes the achievements again
      updateAchievements("");
      setGeneratingIds((ids) => [...ids, id]);
      // Show the bullets in the field while the AI writes them
      const improved = await improve(
        "generateAchievements",
        buildInput,
        "achievements",
        {
          // The AI first finds the profession the title points to
          jobTitle: title,
          onPartial: updateAchievements,
        },
      ).finally(() =>
        setGeneratingIds((ids) => ids.filter((current) => current !== id)),
      );
      if (improved) {
        aiWrittenIds.current.add(id);
        updateAchievements(improved);
        return;
      }
      // Rejected or failed: bring back the text from before the click
      updateAchievements(previous);
    },
    [requireAIProvider, improve, dispatch, findEntry],
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
