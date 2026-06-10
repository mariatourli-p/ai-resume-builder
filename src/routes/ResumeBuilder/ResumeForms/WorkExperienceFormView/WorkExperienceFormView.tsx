import { WorkExperienceForm } from "@/components/Forms/WorkExperienceForm";
import { useWorkExperienceSelector, shallowEqual } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import {
  addWorkExperience,
  removeWorkExperience,
  updateWorkExperienceField,
  type WorkExperienceEntry,
} from "@/redux/resume/resume-reducer";
import { useState, useCallback } from "react";

export const WorkExperienceFormView = () => {
  const dispatch = useAppDispatch();
  const entries = useWorkExperienceSelector((s) => s, shallowEqual);
  const [improvingIds, setImprovingIds] = useState<Set<string>>(new Set());

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

  const handleImprove = useCallback(async (id: string) => {
    setImprovingIds((prev) => new Set(prev).add(id));
    // TODO: call AI improve API
    setImprovingIds((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });
  }, []);

  return (
    <WorkExperienceForm
      entries={entries}
      improvingIds={improvingIds}
      isAIDisabled={false}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChange={handleChange}
      onImprove={handleImprove}
    />
  );
};
