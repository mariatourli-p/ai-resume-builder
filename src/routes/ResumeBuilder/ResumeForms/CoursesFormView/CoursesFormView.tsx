import { CoursesForm } from "@/components/Forms/CoursesForm";
import {
  addCourse,
  removeCourse,
  updateCourseField,
  type CourseEntry,
} from "@/redux/resume/resume-reducer";
import { shallowEqual, useCoursesSelector } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { useCallback } from "react";

/**
 * View controller for the Courses & Seminars form section.
 *
 * Connects the {@link CoursesForm} UI to Redux state.
 *
 * @remarks
 * - Entries are stored in Redux and updated via {@link updateCourseField}
 * - New entries are appended via {@link addCourse} with empty fields
 * - Deletion is handled via {@link removeCourse} by entry id
 */
export const CoursesFormView = () => {
  const dispatch = useAppDispatch();
  const entries = useCoursesSelector((s) => s, shallowEqual);

  // Adds an empty card. When: the user clicks Add Course
  const handleAdd = useCallback(() => {
    dispatch(addCourse());
  }, [dispatch]);

  // Removes a card. When: the user clicks the card's delete icon
  const handleDelete = useCallback(
    (id: string) => {
      dispatch(removeCourse(id));
    },
    [dispatch],
  );

  // Saves a field. When: on every change in a card (passed as `onChange`)
  const handleChange = useCallback(
    (id: string, field: keyof Omit<CourseEntry, "id">, value: string) => {
      dispatch(updateCourseField({ id, field, value }));
    },
    [dispatch],
  );

  return (
    <CoursesForm
      entries={entries}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChange={handleChange}
    />
  );
};
