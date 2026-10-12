import { store } from "@/redux/store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Provider } from "react-redux";
import { CoursesForm, type CoursesFormProps } from "./CoursesForm";

type Entry = NonNullable<CoursesFormProps["entries"]>[number];

const defaultEntries: Entry[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    organizer: "Frontend Masters",
    date: "2024-05",
  },
];

const withState = (_Story: unknown, context: { args: CoursesFormProps }) => {
  const [entries, setEntries] = useState<Entry[]>(
    context.args.entries ?? defaultEntries,
  );

  const handleAdd = () =>
    setEntries((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: "", organizer: "", date: "" },
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
      <CoursesForm
        {...context.args}
        entries={entries}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onChange={handleChange}
      />
    </Provider>
  );
};

const meta: Meta<typeof CoursesForm> = {
  title: "Components/Forms/CoursesForm",
  tags: ["form", "courses", "resume"],
  component: CoursesForm,
  decorators: [withState],
  args: {
    entries: defaultEntries,
  },
  argTypes: {
    entries: {
      control: "object",
      description: "List of courses and seminars",
    },
    onAdd: { action: "add clicked" },
    onDelete: { action: "delete clicked" },
    onChange: { action: "field changed" },
  },
};

export default meta;
type Story = StoryObj<typeof CoursesForm>;

export const Standard: Story = {};
export const Empty: Story = { args: { entries: [] } };
export const MultipleEntries: Story = {
  args: {
    entries: [
      ...defaultEntries,
      {
        id: "2",
        title: "Certified Scrum Master",
        organizer: "Scrum Alliance",
        date: "2023-11",
      },
    ],
  },
};
