import type { Preview } from "@storybook/nextjs-vite";
import { mswLoader } from "msw-storybook-addon/csf3";

import "../src/app/globals.css";

const preview: Preview = {
  loaders: [mswLoader()],
  parameters: {
    layout: "fullscreen",
    controls: { hideNoControlsWarning: true },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
        query: {},
      },
    },
  },
};

export default preview;
