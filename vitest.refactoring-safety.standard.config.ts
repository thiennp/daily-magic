import { defineConfig } from "vitest/config";

import { vitestResolveAlias } from "./vitest.resolveAlias";

export default defineConfig({
  test: {
    environment: "node",
    include: [
      "test/**/*.test.ts",
      "apps/install/features/**/*.test.ts",
      ".agents/**/*.test.ts",
      "src/lib/agentWitch/**/*.test.ts",
      "src/lib/dispatch/**/*.test.ts",
      "src/features/agent-witch/**/*.test.ts",
      "scripts/agentWitch*.test.ts",
      "apps/live/features/**/*.test.ts",
      "scripts/ensureAgentWitch*.test.ts",
      "scripts/resolveAgentWitch*.test.ts",
      "scripts/reviveAgentWitch*.test.ts",
      "scripts/requestLocalAgentWitch*.test.ts",
    ],
  },
  resolve: {
    alias: vitestResolveAlias,
  },
});
