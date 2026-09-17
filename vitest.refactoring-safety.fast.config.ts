import { defineConfig } from "vitest/config";

import { vitestResolveAlias } from "./vitest.resolveAlias";

export default defineConfig({
  test: {
    environment: "node",
    include: [
      "test/**/*.test.ts",
      "packages/shared/**/*.test.ts",
      ".agents/scripts/harnessBootstrap.test.ts",
      ".agents/scripts/lib/architectureRules.test.ts",
    ],
  },
  resolve: {
    alias: vitestResolveAlias,
  },
});
