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
};

export type WorkExperienceEntry = {
  id: string;
  roleTitle: string;
  company: string;
  duration: string;
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

export type ResumeState = {
  personalInfo: PersonalInfoData;
  skills: string[];
  workExperience: WorkExperienceEntry[];
  education: EducationEntry[];
  accentColor: string;
};

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
  },
  accentColor: DEFAULT_ACCENT_COLOR,
  skills: [],
  workExperience: [],
  education: [],
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
    setPersonalInfo(state, action: PayloadAction<PersonalInfoData>) {
      state.personalInfo = action.payload;
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

    // Work Experience
    addWorkExperience(state) {
      state.workExperience.push({
        id: crypto.randomUUID(),
        roleTitle: "",
        company: "",
        duration: "",
        location: "",
        achievements: "",
      });
    },
    updateWorkExperienceField(
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Omit<WorkExperienceEntry, "id">;
        value: string;
      }>,
    ) {
      const entry = state.workExperience.find(
        (e) => e.id === action.payload.id,
      );
      if (entry) entry[action.payload.field] = action.payload.value;
    },
    removeWorkExperience(state, action: PayloadAction<string>) {
      state.workExperience = state.workExperience.filter(
        (e) => e.id !== action.payload,
      );
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

    // Reset
    resetResume() {
      return initialState;
    },

    setAccentColor(state, action: PayloadAction<string>) {
      state.accentColor = action.payload;
    },
  },
});

export const {
  updatePersonalInfoField,
  setPersonalInfo,
  addSkill,
  removeSkill,
  addWorkExperience,
  updateWorkExperienceField,
  removeWorkExperience,
  addEducation,
  updateEducationField,
  removeEducation,
  resetResume,
  setAccentColor,
} = resumeSlice.actions;

export const resumeReducer = resumeSlice.reducer;
