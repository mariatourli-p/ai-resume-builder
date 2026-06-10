/**
 * Selector hooks for resume state.
 */
import { useAppSelector, shallowEqual } from "./store";
import { type EqualityFn } from "react-redux";
import type {
  PersonalInfoData,
  WorkExperienceEntry,
  EducationEntry,
} from "./resume/resume-reducer";

export const usePersonalInfoSelector = <T>(
  project: (slice: PersonalInfoData) => T,
  equalityFn?: EqualityFn<T>,
) => useAppSelector((s) => project(s.resume.personalInfo), equalityFn);

export const useSkillsSelector = <T>(
  project: (slice: string[]) => T,
  equalityFn?: EqualityFn<T>,
) => useAppSelector((s) => project(s.resume.skills), equalityFn);

export const useWorkExperienceSelector = <T>(
  project: (slice: WorkExperienceEntry[]) => T,
  equalityFn?: EqualityFn<T>,
) => useAppSelector((s) => project(s.resume.workExperience), equalityFn);

export const useEducationSelector = <T>(
  project: (slice: EducationEntry[]) => T,
  equalityFn?: EqualityFn<T>,
) => useAppSelector((s) => project(s.resume.education), equalityFn);

export { shallowEqual };
