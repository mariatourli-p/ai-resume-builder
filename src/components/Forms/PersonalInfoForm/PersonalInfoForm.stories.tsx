import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  PersonalInfoForm,
  type PersonalInfoFormProps,
} from "./PersonalInfoForm";

type Data = NonNullable<PersonalInfoFormProps["data"]>;

const defaultData: NonNullable<PersonalInfoFormProps["data"]> = {
  fullName: "John Doe",
  professionalTitle: "Senior Product Designer",
  emailAddress: "john.doe@example.com",
  phone: "555-0123",
  location: "San Francisco, CA",
  portfolio: "portfolio.johndoe.design",
  professionalSummary:
    "Senior Product Designer with over 8 years of experience spearheading UX strategy and leading cross-functional teams to build high-impact SaaS platforms.",
};

const withState = (
  _Story: unknown,
  context: { args: PersonalInfoFormProps },
) => {
  const [data, setData] = useState<Data>(context.args.data ?? defaultData);

  return (
    <PersonalInfoForm
      {...context.args}
      data={data}
      onChange={(field, value) =>
        setData((prev) => ({ ...prev, [field]: value }))
      }
    />
  );
};

const meta: Meta<typeof PersonalInfoForm> = {
  title: "Components/Forms/PersonalInfoForm",
  tags: ["form", "personal", "resume"],
  component: PersonalInfoForm,
  decorators: [withState],
  args: {
    data: defaultData,
    isEnhancing: false,
    // isEnhanceDisabled: true,
    isRewriting: false,
  },
  argTypes: {
    data: {
      control: "object",
      description: "All field values for the personal info section",
    },
    isEnhancing: {
      control: "boolean",
      description: "Shows loading state on the Enhance button",
    },
    isRewriting: {
      control: "boolean",
      description: "Shows loading state on the Smart Rewrite button",
    },
    onEnhance: {
      action: "enhance clicked",
      description: "Fired when the Enhance button is pressed",
    },
    onSmartRewrite: {
      action: "smart rewrite clicked",
      description:
        "Fired when the Smart Rewrite button inside the summary is pressed",
    },
    onChange: {
      action: "field changed",
      description: "Fired on any field change with the field key and new value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PersonalInfoForm>;

export const Standard: Story = {};

export const Empty: Story = {
  args: {
    data: {
      fullName: "",
      professionalTitle: "",
      emailAddress: "",
      phone: "",
      location: "",
      portfolio: "",
      professionalSummary: "",
    },
  },
};

export const EnhancingInProgress: Story = {
  args: { isEnhancing: true },
};

export const RewritingInProgress: Story = {
  args: { isRewriting: true },
};

export const LongSummary: Story = {
  args: {
    data: {
      ...defaultData,
      professionalSummary:
        "Senior Product Designer with over 8 years of experience. "
          .repeat(6)
          .trim(),
    },
  },
};
