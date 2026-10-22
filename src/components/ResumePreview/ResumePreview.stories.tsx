import { PRESENT } from "@/utils/formatDateRange";
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
      photo: "",
    },
    workExperience: [],
    volunteering: [],
    education: [],
    courses: [],
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
      photo: "",
    },
    workExperience: [
      {
        id: "1",
        roleTitle: "Principal Designer",
        company: "TechFlow Corp",
        startDate: "2020-03",
        endDate: PRESENT,
        location: "San Francisco, CA",
        achievements:
          "Engineered the strategic redesign of the core user dashboard\nIncreased retention rates by 40%",
      },
      {
        id: "2",
        roleTitle: "Senior UI/UX Designer",
        company: "CreativeSols",
        startDate: "2016-09",
        endDate: "2020-02",
        location: "New York, NY",
        achievements:
          "Synergized cross-functional engineering teams to architect 15+ mobile applications\nArchitected interactive prototypes with 50+ usability study participants",
      },
    ],
    volunteering: [
      {
        id: "v1",
        roleTitle: "Volunteer Design Mentor",
        company: "Code for Good",
        startDate: "2019-01",
        endDate: PRESENT,
        location: "Remote",
        achievements: "Mentored 12 junior designers through portfolio reviews",
      },
    ],
    courses: [
      {
        id: "c1",
        title: "Advanced Design Systems",
        organizer: "Interaction Design Foundation",
        date: "2023-04",
        description:
          "Built a token-based component library as the final project.",
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
