import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrandingColorsView } from "./BrandingColorsView";

const meta: Meta<typeof BrandingColorsView> = {
  title: "Components/SectionsBar/BrandingColors",
  tags: ["color", "palette", "branding"],
  component: BrandingColorsView,
  decorators: [
    (Story) => (
      <div style={{ width: 280, padding: 16, background: "#f8fafc" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BrandingColorsView>;

export const Default: Story = {};
