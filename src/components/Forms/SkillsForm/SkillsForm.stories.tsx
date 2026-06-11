import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SkillsForm, type SkillsFormProps } from "./SkillsForm";

const defaultSkills = [
  "User Experience (UX)",
  "User Interface (UI)",
  "Design Systems",
  "Interactive Prototyping",
  "Figma",
  "Usability Testing",
  "SaaS Product Strategy",
  "Frontend Integration",
  "Vector Graphics",
  "Motion Design",
];

const allSuggestions = [
  "User Experience (UX)",
  "User Interface (UI)",
  "Design Systems",
  "Interactive Prototyping",
  "Figma",
  "Usability Testing",
  "SaaS Product Strategy",
  "Frontend Integration",
  "Vector Graphics",
  "Motion Design",
  "Product Architecture",
  "React.js",
  "User Research",
  "KPI Optimization",
  "A/B Testing",
  "Stakeholder Alignment",
];

const withState = (_Story: unknown, context: { args: SkillsFormProps }) => {
  const [skills, setSkills] = useState<string[]>(
    context.args.skills ?? defaultSkills,
  );
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>(
    context.args.suggestedSkills ?? [],
  );
  const [input, setInput] = useState("");
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleAdd = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd(input);
    }
  };

  const handleRemove = (skill: string) =>
    setSkills((prev) => prev.filter((s) => s !== skill));

  const handleSuggest = () => {
    setIsSuggesting(true);
    setTimeout(() => {
      setSuggestedSkills(allSuggestions);
      setIsSuggesting(false);
    }, 1500);
  };

  return (
    <SkillsForm
      {...context.args}
      input={input}
      skills={skills}
      suggestedSkills={suggestedSkills}
      appliedSet={new Set(skills)}
      isSuggesting={isSuggesting}
      onInputChange={setInput}
      onKeyDown={handleKeyDown}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onSuggest={handleSuggest}
    />
  );
};

const meta: Meta<typeof SkillsForm> = {
  title: "Components/Forms/SkillsForm",
  tags: ["form", "skills", "resume"],
  component: SkillsForm,
  decorators: [withState],
  args: {
    skills: defaultSkills,
    suggestedSkills: [],
    jobTitle: "Senior Product Designer",
    isAIDisabled: false,
    isSuggesting: false,
    input: "",
  },
  argTypes: {
    skills: { control: "object", description: "Currently applied skills" },
    suggestedSkills: { control: "object", description: "AI-suggested skills" },
    jobTitle: {
      control: "text",
      description: "Job title used for AI suggestions",
    },
    isAIDisabled: {
      control: "boolean",
      description: "Disables AI suggest button",
    },
    isSuggesting: {
      control: "boolean",
      description: "Shows loading state on suggest button",
    },
    onAdd: { action: "skill added" },
    onRemove: { action: "skill removed" },
    onSuggest: { action: "suggest clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof SkillsForm>;

export const Standard: Story = {};
export const Empty: Story = { args: { skills: [], suggestedSkills: [] } };
export const WithSuggestions: Story = {
  args: { suggestedSkills: allSuggestions },
};
export const AIDisabled: Story = { args: { isAIDisabled: true } };
export const SuggestingInProgress: Story = { args: { isSuggesting: true } };
