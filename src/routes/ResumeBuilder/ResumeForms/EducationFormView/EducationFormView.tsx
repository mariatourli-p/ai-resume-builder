import { EducationForm } from "@/components/Forms/EducationForm";
import {
  addEducation,
  removeEducation,
  updateEducationField,
  type EducationEntry,
} from "@/redux/resume/resume-reducer";
import { shallowEqual, useEducationSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { useCallback } from "react";

/**
 * View controller for the Education form section.
 *
 * Connects the {@link EducationForm} UI to Redux state.
 * Handles adding, removing, and updating education entries.
 *
 * @remarks
 * - Entries are stored in Redux and updated via {@link updateEducationField}
 * - New entries are appended via {@link addEducation} with empty default fields
 * - Deletion is handled via {@link removeEducation} by entry id
 */

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
