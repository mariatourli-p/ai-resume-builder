/// <reference types="vite/client" />
export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  professionalSummary: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  dateRange: string;
  achievements: string; // Textarea achievements text, split by newlines for bullet points
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  dateRange: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
}

export interface ResumeStyle {
  themeColor: string; // hex string or Tailwind class suffix
  fontFamily:
    | "sans"
    | "serif"
    | "mono"
    | "literata"
    | "playfair"
    | "space-grotesk";
  fontSize: "sm" | "md" | "lg";
  spacing: "compact" | "comfortable" | "spacious";
}

export type ResumeTemplate = "traditional" | "modern" | "creative";

export interface AnalysisResult {
  score: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  suggestedKeywords: string[];
}
