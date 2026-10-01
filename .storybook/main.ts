import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/utils/storybook/stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "msw-storybook-addon"],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
};

export default config;
