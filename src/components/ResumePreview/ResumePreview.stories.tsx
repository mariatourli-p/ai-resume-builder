import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResumePreview } from "./ResumePreview";

const meta: Meta<typeof ResumePreview> = {
  title: "Components/ResumePreview",
  component: ResumePreview,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ResumePreview>;

export const Empty: Story = {
  args: {
    accentColor: "#4b41e1",
    fontFamily: "Inter, sans-serif",
    personalInfo: {
      fullName: "",
      professionalTitle: "",
      emailAddress: "",
      phone: "",
      location: "",
      portfolio: "",
      professionalSummary: "",
    },
    workExperience: [],
    education: [],
    skills: [],
  },
};

export const Filled: Story = {
  args: {
    accentColor: "#4b41e1",
    fontFamily: "Inter, sans-serif",
    personalInfo: {
      fullName: "John Doe",
      professionalTitle: "Senior Product Designer",
      emailAddress: "john.doe@example.com",
      phone: "555-0123",
      location: "San Francisco, CA",
      portfolio: "portfolio.johndoe.design",
      professionalSummary:
        "Senior Product Designer with over eight years of experience architecting UX strategy and scaling design systems for high-growth SaaS platforms.",
    },
    workExperience: [
      {
        id: "1",
        roleTitle: "Principal Designer",
        company: "TechFlow Corp",
        duration: "2020 – Present",
        location: "San Francisco, CA",
        achievements:
          "Engineered the strategic redesign of the core user dashboard\nIncreased retention rates by 40%",
      },
      {
        id: "2",
        roleTitle: "Senior UI/UX Designer",
        company: "CreativeSols",
        duration: "2016 – 2020",
        location: "New York, NY",
        achievements:
          "Synergized cross-functional engineering teams to architect 15+ mobile applications\nArchitected interactive prototypes with 50+ usability study participants",
      },
    ],
    education: [
      {
        id: "1",
        institution: "Rhode Island School of Design",
        degree: "BFA in Interaction Design",
        graduationDate: "2015",
        location: "Providence, RI",
      },
    ],
    skills: [
      "Figma",
      "Design Systems",
      "User Research",
      "Prototyping",
      "React",
      "TypeScript",
    ],
  },
};
