import { SkillsForm } from "@/components/Forms/SkillsForm";
import { useSkillsSelector, shallowEqual } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { addSkill, removeSkill } from "@/redux/resume/resume-reducer";
import { useState, useCallback } from "react";
import type { KeyboardEvent } from "react";

export const SkillsFormView = () => {
  const dispatch = useAppDispatch();
  const skills = useSkillsSelector((s) => s, shallowEqual);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isSuggesting, setIsSuggesting] = useState(false);

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
    setIsSuggesting(true);
    // TODO: call AI suggest API with jobTitle
    setSuggestedSkills([]);
    setIsSuggesting(false);
  }, []);

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
