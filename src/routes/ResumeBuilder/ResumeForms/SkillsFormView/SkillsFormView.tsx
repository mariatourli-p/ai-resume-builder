import { SkillsForm } from "@/components/Forms/SkillsForm";
import { addSkill, removeSkill } from "@/redux/resume/resume-reducer";
import { shallowEqual, useSkillsSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { useRequireApiKey } from "@hooks/useRequireApiKey";
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
 * - {@link handleSuggest} is a placeholder for AI-powered skill suggestions based on job title
 */
export const SkillsFormView = () => {
  const dispatch = useAppDispatch();
  const skills = useSkillsSelector((s) => s, shallowEqual);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { requireApiKey } = useRequireApiKey();

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

  const handleSuggest = useCallback(async () => {
    if (!requireApiKey()) return;

    setIsSuggesting(true);
    // TODO: call AI suggest API with jobTitle
    setSuggestedSkills([]);
    setIsSuggesting(false);
  }, [requireApiKey]);

  return (
    <SkillsForm
      skills={skills}
      suggestedSkills={suggestedSkills}
      input={input}
      appliedSet={new Set(skills)}
      isSuggesting={isSuggesting}
      onInputChange={setInput}
      onKeyDown={handleKeyDown}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onSuggest={handleSuggest}
    />
  );
};
