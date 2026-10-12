/**
 * Selector hooks for resume state.
 */
import { type EqualityFn } from "react-redux";
import type {
  CourseEntry,
  EducationEntry,
  ExperienceSection,
  PersonalInfoData,
  WorkExperienceEntry,
} from "./resume/resume-reducer";
import { shallowEqual, useAppSelector } from "./store";

export const usePersonalInfoSelector = <T>(
  project: (slice: PersonalInfoData) => T,
  equalityFn?: EqualityFn<T>,
) => useAppSelector((s) => project(s.resume.personalInfo), equalityFn);

export const useSkillsSelector = <T>(
  project: (slice: string[]) => T,
  equalityFn?: EqualityFn<T>,
) => useAppSelector((s) => project(s.resume.skills), equalityFn);

/** Entries of Work Experience or Volunteering, which share the same card */
export const useExperienceSelector = <T>(
  section: ExperienceSection,
  project: (slice: WorkExperienceEntry[]) => T,
  equalityFn?: EqualityFn<T>,
) => useAppSelector((s) => project(s.resume[section]), equalityFn);

export const useCoursesSelector = <T>(
  project: (slice: CourseEntry[]) => T,
  equalityFn?: EqualityFn<T>,
) => useAppSelector((s) => project(s.resume.courses), equalityFn);

export const useEducationSelector = <T>(
  project: (slice: EducationEntry[]) => T,
  equalityFn?: EqualityFn<T>,
) => useAppSelector((s) => project(s.resume.education), equalityFn);

export const useAccentColorSelector = <T>(
  project: (slice: string) => T,
  equalityFn?: EqualityFn<T>,
) => useAppSelector((s) => project(s.resume.accentColor), equalityFn);

export { shallowEqual };
