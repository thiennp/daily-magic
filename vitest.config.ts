import { defineConfig } from "vitest/config";

import { vitestResolveAlias } from "./vitest.resolveAlias";

export default defineConfig({
  test: {
    environment: "node",
    include: [
      "src/**/*.test.ts",
      "scripts/**/*.test.ts",
      ".agents/**/*.test.ts",
      "test/**/*.test.ts",
      "packages/shared/**/*.test.ts",
      "apps/bridge/**/*.test.ts",
      "apps/install/**/*.test.ts",
      "apps/live/**/*.test.ts",
    ],
  },
  resolve: {
    alias: vitestResolveAlias,
  },
});
