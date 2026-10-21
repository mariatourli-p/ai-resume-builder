import { IconVolunteering } from "@/assets/Icons";
import {
  WorkExperienceForm,
  type ExperienceLabels,
} from "@/components/Forms/WorkExperienceForm";
import { enTokens } from "@/locale/en/en-tokens";
import {
  addExperience,
  removeExperience,
  updateAchievements,
  updateExperienceField,
  type ExperienceField,
  type ExperienceSection,
} from "@/redux/resume/resume-reducer";
import { shallowEqual, useExperienceSelector } from "@/redux/selectors";
import { useAppDispatch, useAppStore } from "@/redux/store";
import { useAI } from "@hooks/useAI";
import { useEnsureAIAvailable } from "@hooks/useEnsureAIAvailable";
import { useCallback, useState } from "react";

const { volunteering } = enTokens.sections;

/**
 * Volunteering texts for the shared form. A module constant, so the memoized
 * cards get the same object on every render.
 */
const VOLUNTEERING_LABELS: ExperienceLabels = {
  title: volunteering.title,
  addButton: volunteering.addButton,
  organization: volunteering.fields.organization.label,
  current: volunteering.fields.current,
  icon: IconVolunteering,
};

export type WorkExperienceFormViewProps = {
  /**
   * Which list the form edits. Volunteering has the same fields as a job,
   * so it reuses this view - and its AI achievements - with its own texts.
   */
  section?: ExperienceSection;
};

/**
 * View controller for the Work Experience and Volunteering form sections.
 *
 * Connects the {@link WorkExperienceForm} UI to Redux state and the AI
 * achievements generation.
 *
 * @remarks
 * - Entries are stored in Redux and updated via {@link updateExperienceField}
 * - `generatingIds` tracks the entries whose achievements the AI is writing
 * - Callbacks read the latest entries from the store when they run, so they
 *   stay stable and typing in one entry doesn't re-render the others
 * - Editing or deleting a role title keeps the achievements; only Generate
 *   Achievements replaces them, and a failed run brings the previous text back
 * - Each card saves who wrote its achievements (`isAIWritten`) and for which
 *   role (`achievementsRole`), so only the user's text for the current role
 *   is sent to the AI as notes, even after a reload
 */
export const WorkExperienceFormView = ({
  section = "workExperience",
}: WorkExperienceFormViewProps) => {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  // All cards, to show them; callbacks read entries from `store` instead
  const entries = useExperienceSelector(section, (s) => s, shallowEqual);
  const { improve } = useAI();
  // Checked before every AI request: asks for consent, or explains why not
  const { ensureAIAvailable } = useEnsureAIAvailable();
  // Cards whose achievements the AI is writing - shows their spinner
  const [generatingIds, setGeneratingIds] = useState<string[]>([]);

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
      store.getState().resume[section].find((entry) => entry.id === id),
    [store, section],
  );

  // Adds an empty card. When: the user clicks Add Experience / Add Volunteering
  const handleAdd = useCallback(() => {
    dispatch(addExperience(section));
  }, [dispatch, section]);

  // Removes a card. When: the user clicks the card's delete icon
  const handleDelete = useCallback(
    (id: string) => {
      dispatch(removeExperience({ section, id }));
    },
    [dispatch, section],
  );

  /**
   * Saves what the user types in any field of a card.
   *
   * When: on every key press in a card (passed as `onChange`).
   *
   * Once the user edits the achievements, the reducer counts them as the
   * user's own notes for the current role, even if the AI wrote them.
   *
   * Editing or deleting the role title never touches the achievements - the
   * user may be retyping the title. They only change when the user clicks
   * Generate Achievements.
   */
  const handleChange = useCallback(
    (id: string, field: ExperienceField, value: string) => {
      dispatch(updateExperienceField({ section, id, field, value }));
    },
    [dispatch, section],
  );

  /**
   * Saves the month the user picks in a card's start or end date picker.
   *
   * When: the user picks or clears a month (passed as `onStartDateChange` /
   * `onEndDateChange`). The card passes its id as the picker's `name`.
   *
   * Why: one stable function for all cards, instead of a new one per card,
   * lets the memoized date pickers skip re-rendering on every key press.
   */
  const updateStartDate = useCallback(
    (value: string, id: string) => handleChange(id, "startDate", value),
    [handleChange],
  );
  const updateEndDate = useCallback(
    (value: string, id: string) => handleChange(id, "endDate", value),
    [handleChange],
  );

  /**
   * Asks the AI to write the achievements of one card.
   *
   * When: the user clicks Generate Achievements on a card (the button is
   * disabled while the role title is empty).
   *
   * Steps:
   * 1. On the first click, asks whether the text may go online; stops if
   *    the AI can't run
   * 2. Keeps the current text; if the user wrote it for this same role, it
   *    becomes the notes the AI builds the bullets from. If the role changed,
   *    only the role is sent
   * 3. Empties the field and shows the spinner
   * 4. `improve` finds the profession the role title points to (work), or
   *    checks that the role and organization say what the volunteer work
   *    was about,
   *    writes the bullets - showing them in the field as they are written -
   *    and checks the result. Volunteering uses its own prompt, built from
   *    the role as written and the organization
   * 5. On success, keeps the new bullets. On failure, brings the previous
   *    text back exactly as it was
   */
  const onGenerateAchievements = useCallback(
    async (id: string, roleTitle: string) => {
      if (!(await ensureAIAvailable())) return;

      const entry = findEntry(id);
      const previous = entry?.achievements ?? "";
      const wasAIWritten = entry?.isAIWritten ?? false;
      const previousRole = entry?.achievementsRole;
      const title = roleTitle.trim();
      // Bullets the AI writes now belong to the current role
      const writeAchievements = (
        value: string,
        isAIWritten = true,
        role: string | undefined = title,
      ) =>
        dispatch(updateAchievements({ section, id, value, isAIWritten, role }));

      /**
       * What the user wrote for this role is the base for the new bullets.
       * Text written for another role is not (it would bring the old role
       * back), and neither are the AI's own bullets, so each run writes new
       * ones. Text written before any title counts as written for this one.
       */
      const isSameRole =
        previousRole === "" ||
        previousRole?.toLowerCase() === title.toLowerCase();
      const notes = !wasAIWritten && isSameRole ? previous.trim() : "";
      const isVolunteering = section === "volunteering";
      const organization = entry?.company.trim() ?? "";
      const isSameAsTitle = (profession: string) =>
        profession.toLowerCase() === title.toLowerCase();
      /**
       * Work: the profession alone loses the other keywords of the title
       * (e.g. the tools in "Python developer, Django, AWS"), so send both.
       *
       * Volunteering: `profession` is the area the AI found (e.g. "Health
       * and safety"). It is sent with the role as written and the
       * organization, which tell the cause.
       */
      const buildInput = (profession: string) => {
        return (
          isVolunteering
            ? [
                `Volunteer role: ${title}`,
                profession && `Area of work: ${profession}`,
                organization && `Organization: ${organization}`,
                notes && `User's notes:\n${notes}`,
              ]
            : [
                `Job title: ${profession}`,
                !isSameAsTitle(profession) && `Role title as written: ${title}`,
                notes && `User's notes:\n${notes}`,
              ]
        )
          .filter(Boolean)
          .join("\n\n");
      };

      // Start from an empty field: the AI writes the achievements again
      writeAchievements("");
      setGeneratingIds((ids) => [...ids, id]);
      // Show the bullets in the field while the AI writes them
      const improved = await improve(
        isVolunteering
          ? "generateVolunteeringAchievements"
          : "generateAchievements",
        buildInput,
        "achievements",
        {
          /**
           * Work: the AI first finds the profession the title points to.
           * Volunteering skips that step: its titles are often a cause or
           * an area ("Advocacy & Awareness"), not a profession, and would be
           * rejected. Instead, the AI finds the area of work from the role
           * or the organization. The notes are left out: after a reload,
           * old AI bullets count as notes and would let any title pass.
           */
          jobTitle: isVolunteering ? undefined : title,
          volunteerWork: isVolunteering
            ? [
                `Volunteer role: ${title}`,
                organization && `Organization: ${organization}`,
              ]
                .filter(Boolean)
                .join(", ")
            : undefined,
          onPartial: writeAchievements,
        },
      ).finally(() =>
        setGeneratingIds((ids) => ids.filter((current) => current !== id)),
      );
      if (improved) {
        writeAchievements(improved);
        return;
      }
      // Rejected or failed: bring back the text from before the click
      writeAchievements(previous, wasAIWritten, previousRole);
    },
    [ensureAIAvailable, improve, dispatch, findEntry, section],
  );

  return (
    <WorkExperienceForm
      entries={entries}
      isAIDisabled={false}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChange={handleChange}
      onStartDateChange={updateStartDate}
      onEndDateChange={updateEndDate}
      onGenerateAchievements={onGenerateAchievements}
      generatingIds={generatingIds}
      labels={section === "volunteering" ? VOLUNTEERING_LABELS : undefined}
    />
  );
};
