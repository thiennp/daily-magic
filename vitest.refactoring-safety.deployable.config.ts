import { defineConfig } from "vitest/config";

import { vitestResolveAlias } from "./vitest.resolveAlias";

/** Set process.env.REFACTORING_SAFETY_DEPLOYABLE=AWC|AWL|AWB|AWI before running. */
const deployable = process.env.REFACTORING_SAFETY_DEPLOYABLE ?? "AWC";

const includeByDeployable: Record<string, readonly string[]> = {
  AWC: [
    "src/lib/agentWitch/**/*.test.ts",
    "src/lib/dispatch/**/*.test.ts",
    "src/features/agent-witch/online-wake/**/*.test.ts",
  ],
  AWL: [
    "src/lib/agentWitch/agentWitchLocalAppPort.constant.test.ts",
    "scripts/buildAgentWitchLocal*.test.ts",
    "scripts/agentWitchLocal*.test.ts",
    "scripts/buildAgentWitchLocalAppShell.test.ts",
  ],
  AWB: [
    "apps/bridge/**/*.test.ts",
    "test/awbFeaturesRegistry.test.ts",
    "test/deployableBoundary.test.ts",
    "scripts/ensureAgentWitchCoupledWakeClientHealth.test.ts",
    "scripts/requestLocalAgentWitch*.test.ts",
    "src/features/agent-witch/utils/*Wake*.test.ts",
  ],
  AWI: [
    "src/lib/agentWitch/renderInstallAgentWitchScript.test.ts",
    "src/lib/agentWitch/buildAgentWitchInstallScriptConfigBlock.test.ts",
    "scripts/agentWitchInstallVersion*.test.ts",
    "scripts/kickstartAgentWitchClientLaunchAgents.test.ts",
  ],
};

const include = includeByDeployable[deployable];
if (!include) {
  throw new Error(
    `Unknown REFACTORING_SAFETY_DEPLOYABLE=${deployable}. Use AWC, AWL, AWB, or AWI.`,
  );
}

export default defineConfig({
  test: {
    environment: "node",
    include: [...include],
  },
  resolve: {
    alias: vitestResolveAlias,
  },
});
