import { useCallback } from "react";
import { EducationForm } from "@/components/Forms/EducationForm";
import { useEducationSelector, shallowEqual } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import {
  addEducation,
  removeEducation,
  updateEducationField,
  type EducationEntry,
} from "@/redux/resume/resume-reducer";

export const EducationFormView = () => {
  const dispatch = useAppDispatch();
  const entries = useEducationSelector((s) => s, shallowEqual);

  const handleAdd = useCallback(() => {
    dispatch(addEducation());
  }, [dispatch]);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(removeEducation(id));
    },
    [dispatch],
  );

  const handleChange = useCallback(
    (id: string, field: keyof Omit<EducationEntry, "id">, value: string) => {
      dispatch(updateEducationField({ id, field, value }));
    },
    [dispatch],
  );

  return (
    <EducationForm
      entries={entries}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChange={handleChange}
    />
  );
};
