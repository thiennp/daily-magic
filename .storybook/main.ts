import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/nextjs-vite";

const storybookDir = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/utils/storybook/stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "msw-storybook-addon"],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  viteFinal: async (viteConfig) => {
    const alias = viteConfig.resolve?.alias ?? {};
    const mergedAlias = Array.isArray(alias)
      ? [...alias]
      : Object.entries(alias).map(([find, replacement]) => ({
          find,
          replacement,
        }));

    mergedAlias.push(
      {
        find: /^@agent-witch\/install-layout$/,
        replacement: path.resolve(
          storybookDir,
          "../src/utils/storybook/shims/install-layout/infrastructure.ts",
        ),
      },
      {
        find: /^@agent-witch\/install-runtime-client$/,
        replacement: path.resolve(
          storybookDir,
          "../src/utils/storybook/shims/install-runtime-client.storybook.ts",
        ),
      },
      {
        find: path.resolve(
          storybookDir,
          "../apps/live/features/prompt-optimizer/internal/core/readPromptSdlcFolderSkills.ts",
        ),
        replacement: path.resolve(
          storybookDir,
          "../src/utils/storybook/shims/readPromptSdlcFolderSkills.storybook.ts",
        ),
      },
    );

    return {
      ...viteConfig,
      resolve: {
        ...viteConfig.resolve,
        alias: mergedAlias,
      },
    };
  },
};

export default config;
