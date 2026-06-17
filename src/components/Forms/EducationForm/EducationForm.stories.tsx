import { store } from "@/redux/store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Provider } from "react-redux";
import { EducationForm, type EducationFormProps } from "./EducationForm";

type Entry = NonNullable<EducationFormProps["entries"]>[number];

const defaultEntries: Entry[] = [
  {
    id: "1",
    institution: "Rhode Island School of Design",
    degree: "BFA in Interaction Design",
    graduationDate: "2011 – 2015",
    location: "Providence, RI",
  },
];

const withState = (_Story: unknown, context: { args: EducationFormProps }) => {
  const [entries, setEntries] = useState<Entry[]>(
    context.args.entries ?? defaultEntries,
  );

  const handleAdd = () =>
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        graduationDate: "",
        location: "",
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

  return (
    <Provider store={store}>
      <EducationForm
        {...context.args}
        entries={entries}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onChange={handleChange}
      />
    </Provider>
  );
};

const meta: Meta<typeof EducationForm> = {
  title: "Components/Forms/EducationForm",
  tags: ["form", "education", "resume"],
  component: EducationForm,
  decorators: [withState],
  args: {
    entries: defaultEntries,
  },
  argTypes: {
    entries: {
      control: "object",
      description: "List of education entries",
    },
    onAdd: { action: "add clicked" },
    onDelete: { action: "delete clicked" },
    onChange: { action: "field changed" },
  },
};

export default meta;
type Story = StoryObj<typeof EducationForm>;

export const Standard: Story = {};
export const Empty: Story = { args: { entries: [] } };
export const SingleEntry: Story = { args: { entries: [defaultEntries[0]] } };
export const MultipleEntries: Story = {
  args: {
    entries: [
      ...defaultEntries,
      {
        id: "2",
        institution: "MIT",
        degree: "MSc in Human-Computer Interaction",
        graduationDate: "2015 – 2017",
        location: "Cambridge, MA",
      },
    ],
  },
};
