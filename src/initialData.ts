import type { ResumeData, ResumeStyle } from "./types";

export const initialResumeData: ResumeData = {
  personal: {
    fullName: "JOHN DOE",
    professionalTitle: "Senior Product Designer",
    professionalSummary:
      "Visionary Product Designer with over 8 years of experience leading cross-functional teams in the development of complex SaaS platforms. Expert in human-centered design principles and scalable design systems.",
    email: "john.doe@example.com",
    phone: "555-0123",
    location: "San Francisco, CA",
    website: "portfolio.com",
  },
  experience: [
    {
      id: "exp-1",
      role: "Principal Designer",
      company: "TechFlow Corp",
      location: "San Francisco, CA",
      dateRange: "2020 – Present",
      achievements:
        "Led redesign of core dashboard resulting in 40% increase in user retention.\nManaged a team of 12 designers across 3 timezones.\nImplemented a comprehensive design system that reduced dev handover time by 30%.",
    },
    {
      id: "exp-2",
      role: "Senior UI/UX Designer",
      company: "CreativeSols",
      location: "Los Angeles, CA",
      dateRange: "2016 – 2020",
      achievements:
        "Collaborated with engineering to ship over 15 high-fidelity mobile applications.\nCreated interactive motion prototypes that increased client sign-off rates by 25%.",
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Rhode Island School of Design",
      degree: "BFA in Interaction Design",
      location: "Providence, RI",
      dateRange: "2011 – 2015",
    },
  ],
  skills: [
    "Product Design",
    "Figma",
    "Design Systems",
    "UI/UX Design",
    "Prototyping",
    "User Research",
    "HTML/CSS/JS",
    "SaaS Platforms",
    "Motion Design",
    "Team Leadership",
  ],
};

export const defaultStyle: ResumeStyle = {
  themeColor: "#4b41e1", // CareerFlow AI Blue
  fontFamily: "literata",
  fontSize: "md",
  spacing: "comfortable",
};
