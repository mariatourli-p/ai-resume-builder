import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrandingColorsView } from "./BrandingColorsView";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const meta: Meta<typeof BrandingColorsView> = {
  title: "Components/SectionsBar/BrandingColors",
  tags: ["color", "palette", "branding"],
  component: BrandingColorsView,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div style={{ width: 280, padding: 16, background: "#f8fafc" }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BrandingColorsView>;

export const Default: Story = {};
