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
    ],
  },
  resolve: {
    alias: vitestResolveAlias,
  },
});
