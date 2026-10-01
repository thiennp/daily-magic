import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeConfig } from "vite";

import { vitestResolveAlias } from "../vitest.resolveAlias.ts";

const config: StorybookConfig = {
  stories: ["../src/utils/storybook/stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "msw-storybook-addon"],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  viteFinal: async (config) =>
    mergeConfig(config, {
      resolve: {
        alias: vitestResolveAlias,
      },
    }),
};

export default config;
