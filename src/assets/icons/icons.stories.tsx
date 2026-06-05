import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconPersonal,
  IconExperience,
  IconEducation,
  IconSkills,
  IconProjects,
  IconAI,
  IconDownload,
  IconSettings,
  IconAdd,
  IconUndo,
  IconSaved,
  IconDelete,
  IconError,
  IconEmail,
  IconLocation,
  IconTemplate,
} from "./index";

const meta: Meta = {
  title: "Assets/Icons",
  parameters: {
    layout: "padded",
  },
};

export default meta;

// ── Types ─────────────────────────────────────────────────────────────────────

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

interface IconEntry {
  name: string;
  component: IconComponent;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const sectionIcons: IconEntry[] = [
  { name: "IconPersonal", component: IconPersonal },
  { name: "IconExperience", component: IconExperience },
  { name: "IconEducation", component: IconEducation },
  { name: "IconSkills", component: IconSkills },
  { name: "IconProjects", component: IconProjects },
];

const actionIcons: IconEntry[] = [
  { name: "IconAI", component: IconAI },
  { name: "IconDownload", component: IconDownload },
  { name: "IconSettings", component: IconSettings },
  { name: "IconAdd", component: IconAdd },
  { name: "IconUndo", component: IconUndo },
  { name: "IconSaved", component: IconSaved },
  { name: "IconDelete", component: IconDelete },
  { name: "IconError", component: IconError },
  { name: "IconTemplate", component: IconTemplate },
];

const contactIcons: IconEntry[] = [
  { name: "IconEmail", component: IconEmail },
  { name: "IconLocation", component: IconLocation },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function IconGrid({
  icons,
  size,
  className,
}: {
  icons: IconEntry[];
  size: number;
  className?: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "12px",
      }}
    >
      {icons.map(({ name, component: Icon }) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "16px 8px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          <Icon size={size} className={className} />
          <span
            style={{
              fontSize: "11px",
              color: "#6b7280",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

function Section({
  title,
  icons,
  size,
  className,
}: {
  title: string;
  icons: IconEntry[];
  size: number;
  className?: string;
}) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h3
        style={{
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#9ca3af",
          marginBottom: "12px",
        }}
      >
        {title}
      </h3>
      <IconGrid icons={icons} size={size} className={className} />
    </div>
  );
}

// ── Stories ───────────────────────────────────────────────────────────────────

type StoryArgs = {
  size: number;
  className?: string;
};

export const AllIcons: StoryObj<StoryArgs> = {
  args: {
    size: 20,
  },
  argTypes: {
    size: {
      control: { type: "range", min: 12, max: 48, step: 2 },
      description: "Icon size in px",
    },
    className: {
      control: "text",
      description: "Optional Tailwind or CSS class (e.g. text-blue-500)",
    },
  },
  render: ({ size, className }) => (
    <div style={{ fontFamily: "sans-serif" }}>
      <Section
        title="Section icons"
        icons={sectionIcons}
        size={size}
        className={className}
      />
      <Section
        title="Action icons"
        icons={actionIcons}
        size={size}
        className={className}
      />
      <Section
        title="Contact icons"
        icons={contactIcons}
        size={size}
        className={className}
      />
    </div>
  ),
};

export const SectionIcons: StoryObj<StoryArgs> = {
  args: { size: 20 },
  argTypes: {
    size: { control: { type: "range", min: 12, max: 48, step: 2 } },
  },
  render: ({ size, className }) => (
    <IconGrid icons={sectionIcons} size={size} className={className} />
  ),
};

export const ActionIcons: StoryObj<StoryArgs> = {
  args: { size: 20 },
  argTypes: {
    size: { control: { type: "range", min: 12, max: 48, step: 2 } },
  },
  render: ({ size, className }) => (
    <IconGrid icons={actionIcons} size={size} className={className} />
  ),
};

export const ContactIcons: StoryObj<StoryArgs> = {
  args: { size: 20 },
  argTypes: {
    size: { control: { type: "range", min: 12, max: 48, step: 2 } },
  },
  render: ({ size, className }) => (
    <IconGrid icons={contactIcons} size={size} className={className} />
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {[12, 16, 20, 24, 32, 48].map((size) => (
        <div
          key={size}
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
        >
          <span style={{ fontSize: "12px", color: "#6b7280", width: "32px" }}>
            {size}px
          </span>
          <IconPersonal size={size} />
          <IconAI size={size} />
          <IconDownload size={size} />
          <IconEmail size={size} />
          <IconDelete size={size} />
        </div>
      ))}
    </div>
  ),
};
