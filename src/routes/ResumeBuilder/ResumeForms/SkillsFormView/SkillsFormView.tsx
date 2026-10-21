import { SkillsForm } from "@/components/Forms/SkillsForm";
import { enTokens } from "@/locale/en/en-tokens";
import {
  addSkill,
  removeSkill,
  toggleDialog,
} from "@/redux/resume/resume-reducer";
import {
  shallowEqual,
  usePersonalInfoSelector,
  useSkillsSelector,
} from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { parseSkillList } from "@/utils/parseSkillList";
import { useAI } from "@hooks/useAI";
import { useEnsureAIAvailable } from "@hooks/useEnsureAIAvailable";
import type { KeyboardEvent } from "react";
import { useCallback, useState } from "react";

/**
 * View controller for the Skills form section.
 *
 * Connects the {@link SkillsForm} UI to Redux state and AI skill suggestion logic.
 * Manages local input state, keyboard interactions, and suggested skills list.
 *
 * @remarks
 * - Skills are stored in Redux and updated via {@link addSkill} and {@link removeSkill}
 * - Pressing Enter on the input adds the skill immediately
 * - Duplicate and empty skills are silently ignored
 * - {@link handleSuggest} asks the AI for skills that fit the professional
 *   title (Personal Info), after the AI finds the profession the title (or
 *   keyword) points to
 */
export const SkillsFormView = () => {
  const dispatch = useAppDispatch();
  const skills = useSkillsSelector((s) => s, shallowEqual);
  const professionalTitle = usePersonalInfoSelector((s) => s.professionalTitle);
  const [suggestions, setSuggestions] = useState<{
    title: string;
    skills: string[];
  }>();
  const [input, setInput] = useState("");
  const { improve, isLoading } = useAI();
  const { ensureAIAvailable } = useEnsureAIAvailable();

  const title = professionalTitle.trim();
  // Suggestions for an older title no longer apply
  const suggestedSkills =
    suggestions?.title === title ? suggestions.skills : [];

  const handleAdd = useCallback(
    (skill: string) => {
      const trimmed = skill.trim();
      if (trimmed && !skills.includes(trimmed)) {
        dispatch(addSkill(trimmed));
      }
      setInput("");
    },
    [dispatch, skills],
  );

  const handleRemove = useCallback(
    (skill: string) => {
      dispatch(removeSkill(skill));
    },
    [dispatch],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAdd(input);
      }
    },
    [input, handleAdd],
  );

  const showMessage = useCallback(
    (message: string) =>
      dispatch(toggleDialog({ type: "moreContext", message })),
    [dispatch],
  );

  const handleSuggest = useCallback(async () => {
    if (!(await ensureAIAvailable())) return;

    // The title tells the AI which skills fit the role
    if (!title) {
      showMessage(enTokens.moreContextDialog.missingTitle);
      return;
    }

    // Built from the profession the AI finds for the title or keyword
    const buildInput = (profession: string) =>
      skills.length
        ? `Job title: ${profession}\n\nCurrent skills: ${skills.join(", ")}`
        : `Job title: ${profession}`;

    const result = await improve("suggestSkills", buildInput, "skills", {
      // The AI first finds the profession the title points to
      jobTitle: title,
    });
    // Rejected or failed: useAI already showed the reason
    if (result === null) return;

    const newSkills = parseSkillList(result, skills);
    if (!newSkills.length) {
      showMessage(enTokens.moreContextDialog.noSkills);
      return;
    }

    setSuggestions({ title, skills: newSkills });
  }, [ensureAIAvailable, title, skills, improve, showMessage]);

  return (
    <SkillsForm
      skills={skills}
      suggestedSkills={suggestedSkills}
      jobTitle={title || undefined}
      input={input}
      appliedSet={new Set(skills)}
      isSuggesting={isLoading}
      onInputChange={setInput}
      onKeyDown={handleKeyDown}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onSuggest={handleSuggest}
    />
  );
};
