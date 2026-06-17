import type { Preview } from "@storybook/react-vite";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
