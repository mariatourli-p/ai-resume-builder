import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  WorkExperienceForm,
  type WorkExperienceFormProps,
} from "./WorkExperienceForm";

type Entry = NonNullable<WorkExperienceFormProps["entries"]>[number];

const defaultEntries: Entry[] = [
  {
    id: "1",
    roleTitle: "Principal Designer",
    company: "TechFlow Corp",
    duration: "2020 – Present",
    location: "San Francisco, CA",
    achievements:
      "Engineered the strategic redesign of the core user dashboard, catalyzing a 40% surge in retention rates.\nGalvanized a cross-functional, distributed team of 12 designers across 3 timezones, cultivating a high-performance culture of seamless collaboration.",
  },
  {
    id: "2",
    roleTitle: "Senior UI/UX Designer",
    company: "CreativeSols",
    duration: "2016 – 2020",
    location: "New York, NY",
    achievements:
      "Synergized cross-functional engineering teams to architect and deploy 15+ high-fidelity mobile applications.\nArchitected interactive prototypes and pioneered usability studies with 50+ participants to extract strategic, data-driven insights.",
  },
];

const withState = (
  _Story: unknown,
  context: { args: WorkExperienceFormProps },
) => {
  const [entries, setEntries] = useState<Entry[]>(
    context.args.entries ?? defaultEntries,
  );
  const [improvingIds, setImprovingIds] = useState<Set<string>>(new Set());

  const handleAdd = () =>
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        roleTitle: "",
        company: "",
        duration: "",
        location: "",
        achievements: "",
      },
    ]);

  const handleDelete = (id: string) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));

  const handleChange = (
    id: string,
    field: keyof Omit<Entry, "id">,
    value: string,
  ) =>
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );

  const handleImprove = (id: string) => {
    setImprovingIds((prev) => new Set(prev).add(id));
    setTimeout(
      () =>
        setImprovingIds((prev) => {
          const s = new Set(prev);
          s.delete(id);
          return s;
        }),
      2000,
    );
  };

  return (
    <WorkExperienceForm
      {...context.args}
      entries={entries}
      improvingIds={improvingIds}
      onAdd={handleAdd}
      onDelete={handleDelete}
      onChange={handleChange}
      onImprove={handleImprove}
    />
  );
};

const meta: Meta<typeof WorkExperienceForm> = {
  title: "Components/Forms/WorkExperienceForm",
  tags: ["form", "experience", "resume"],
  component: WorkExperienceForm,
  decorators: [withState],
  args: {
    entries: defaultEntries,
    isAIDisabled: false,
  },
  argTypes: {
    entries: {
      control: "object",
      description: "List of work experience entries",
    },
    isAIDisabled: {
      control: "boolean",
      description: "Disables all AI buttons (e.g. when API key is missing)",
    },
    onAdd: { action: "add clicked" },
    onDelete: { action: "delete clicked" },
    onChange: { action: "field changed" },
    onImprove: { action: "improve clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof WorkExperienceForm>;

export const Standard: Story = {};

export const Empty: Story = {
  args: { entries: [] },
};

export const SingleEntry: Story = {
  args: { entries: [defaultEntries[0]] },
};

export const AIDisabled: Story = {
  args: { isAIDisabled: true },
};

export const ImprovingInProgress: Story = {
  args: {
    improvingIds: new Set(["1"]),
  },
};
