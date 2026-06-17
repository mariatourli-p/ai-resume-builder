import { WorkExperienceForm } from "@/components/Forms/WorkExperienceForm";
import {
  addWorkExperience,
  removeWorkExperience,
  updateWorkExperienceField,
  type WorkExperienceEntry,
} from "@/redux/resume/resume-reducer";
import { shallowEqual, useWorkExperienceSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { AI_PROMPTS } from "@/services/aiPrompts";
import { useAI } from "@hooks/useAI";
import { useCallback, useState } from "react";

export const WorkExperienceFormView = () => {
  const dispatch = useAppDispatch();
  const entries = useWorkExperienceSelector((s) => s, shallowEqual);
  const [quantifyingIds, setQuantifyingIds] = useState<Set<string>>(new Set());
  const [verbIds, setVerbIds] = useState<Set<string>>(new Set());
  const { improve } = useAI();

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

  const handleImprove = useCallback(
    async (
      id: string,
      prompt: keyof typeof AI_PROMPTS,
      setIds: React.Dispatch<React.SetStateAction<Set<string>>>,
    ) => {
      const entry = entries.find((e) => e.id === id);
      if (!entry?.achievements?.trim()) return;

      setIds((prev) => new Set(prev).add(id));
      const improved = await improve(AI_PROMPTS[prompt], entry.achievements);
      if (improved) {
        dispatch(
          updateWorkExperienceField({
            id,
            field: "achievements",
            value: improved,
          }),
        );
      }
      setIds((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    },
    [improve, entries, dispatch],
  );

  return (
    <WorkExperienceForm
      entries={entries}
      improvingIds={quantifyingIds}
      isAIDisabled={false}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChange={handleChange}
      quantifyingIds={quantifyingIds}
      verbIds={verbIds}
      onQuantifyMetrics={(id) =>
        handleImprove(id, "quantifyMetrics", setQuantifyingIds)
      }
      onStrongerVerbs={(id) => handleImprove(id, "strongerVerbs", setVerbIds)}
    />
  );
};
