/**
 * Reducer for resume form data.
 * Manages all resume sections: personal info, skills, work experience, and education.
 */
import { DEFAULT_ACCENT_COLOR } from "@/components/AppBars/SectionsBar/BrandingColors/constants";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// --- Types ---
export type PersonalInfoData = {
  fullName: string;
  professionalTitle: string;
  emailAddress: string;
  phone: string;
  location: string;
  portfolio: string;
  professionalSummary: string;
  /** Square JPEG as a data URL (small enough for localStorage), or `""` */
  photo: string;
};

export type WorkExperienceEntry = {
  id: string;
  roleTitle: string;
  company: string;
  /** Start month as `YYYY-MM`, or `""` */
  startDate: string;
  /** End month as `YYYY-MM`, `PRESENT` while still in the role, or `""` */
  endDate: string;
  location: string;
  achievements: string;
};

export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  graduationDate: string;
  location: string;
};

/** Sections that use the experience card: role, organization, dates, achievements */
export type ExperienceSection = "workExperience" | "volunteering";

export type CourseEntry = {
  id: string;
  title: string;
  organizer: string;
  /** Month as `YYYY-MM`, or `""` */
  date: string;
};

export type DialogType = "aiError" | "moreContext" | null;

export type ResumeState = {
  personalInfo: PersonalInfoData;
  skills: string[];
  workExperience: WorkExperienceEntry[];
  volunteering: WorkExperienceEntry[];
  education: EducationEntry[];
  courses: CourseEntry[];
  accentColor: string;
  activeTemplate: string;
  dialogType: DialogType;
  dialogMessage: string | null;
};

export type DialogPayload = {
  type: DialogType;
  message?: string;
} | null;

// --- Initial State ---
const initialState: ResumeState = {
  personalInfo: {
    fullName: "",
    professionalTitle: "",
    emailAddress: "",
    phone: "",
    location: "",
    portfolio: "",
    professionalSummary: "",
    photo: "",
  },
  accentColor: DEFAULT_ACCENT_COLOR,
  skills: [],
  workExperience: [],
  volunteering: [],
  education: [],
  courses: [],
  activeTemplate: "Classic Modern",
  dialogType: null,
  dialogMessage: null,
};

// --- Slice ---
const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    // Personal Info
    updatePersonalInfoField(
      state,
      action: PayloadAction<{ field: keyof PersonalInfoData; value: string }>,
    ) {
      state.personalInfo[action.payload.field] = action.payload.value;
    },

    // Skills
    addSkill(state, action: PayloadAction<string>) {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload);
      }
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter((s) => s !== action.payload);
    },

    // Work Experience and Volunteering
    addExperience(state, action: PayloadAction<ExperienceSection>) {
      state[action.payload].push({
        id: crypto.randomUUID(),
        roleTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        location: "",
        achievements: "",
      });
    },
    updateExperienceField(
      state,
      action: PayloadAction<{
        section: ExperienceSection;
        id: string;
        field: keyof Omit<WorkExperienceEntry, "id">;
        value: string;
      }>,
    ) {
      const { section, id, field, value } = action.payload;
      const entry = state[section].find((e) => e.id === id);
      if (entry) entry[field] = value;
    },
    removeExperience(
      state,
      action: PayloadAction<{ section: ExperienceSection; id: string }>,
    ) {
      const { section, id } = action.payload;
      state[section] = state[section].filter((e) => e.id !== id);
    },

    // Education
    addEducation(state) {
      state.education.push({
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        graduationDate: "",
        location: "",
      });
    },
    updateEducationField(
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Omit<EducationEntry, "id">;
        value: string;
      }>,
    ) {
      const entry = state.education.find((e) => e.id === action.payload.id);
      if (entry) entry[action.payload.field] = action.payload.value;
    },
    removeEducation(state, action: PayloadAction<string>) {
      state.education = state.education.filter((e) => e.id !== action.payload);
    },

    // Courses & Seminars
    addCourse(state) {
      state.courses.push({
        id: crypto.randomUUID(),
        title: "",
        organizer: "",
        date: "",
      });
    },
    updateCourseField(
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Omit<CourseEntry, "id">;
        value: string;
      }>,
    ) {
      const entry = state.courses.find((e) => e.id === action.payload.id);
      if (entry) entry[action.payload.field] = action.payload.value;
    },
    removeCourse(state, action: PayloadAction<string>) {
      state.courses = state.courses.filter((e) => e.id !== action.payload);
    },

    setAccentColor(state, action: PayloadAction<string>) {
      state.accentColor = action.payload;
    },

    setActiveTemplate: (state, action: PayloadAction<string>) => {
      state.activeTemplate = action.payload;
    },

    toggleDialog: (state, action: PayloadAction<DialogPayload>) => {
      state.dialogType = action.payload?.type ?? null;
      state.dialogMessage = action.payload?.message ?? null;
    },
  },
});

export const {
  updatePersonalInfoField,
  addSkill,
  removeSkill,
  addExperience,
  updateExperienceField,
  removeExperience,
  addEducation,
  updateEducationField,
  removeEducation,
  addCourse,
  updateCourseField,
  removeCourse,
  setAccentColor,
  setActiveTemplate,
  toggleDialog,
} = resumeSlice.actions;

export const resumeReducer = resumeSlice.reducer;
