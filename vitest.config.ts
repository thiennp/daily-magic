import { defineConfig } from "vitest/config";

import { vitestResolveAlias } from "./vitest.resolveAlias";

export default defineConfig({
  test: {
    env: {
      TZ: "Europe/Berlin",
    },
    environment: "node",
    // Render tests import whole feature barrels; under the full parallel run the
    // default 5s timed out (they pass alone in ~10s). A real hang still fails at 30s.
    testTimeout: 30_000,
    hookTimeout: 30_000,
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
