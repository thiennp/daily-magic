import { spawnSync } from "node:child_process";
import path from "node:path";

import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";

export const verifyShippedAgentWitchInstallModuleLoads = (input: {
  readonly installDir: string;
  readonly scriptName?: string;
}): void => {
  const bundlePath = path.join(
    input.installDir,
    AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath,
  );
  const result = spawnSync(process.execPath, ["--check", bundlePath], {
    cwd: input.installDir,
    encoding: "utf8",
    timeout: 60_000,
    env: {
      ...process.env,
      AGENT_WITCH_HOME: input.installDir,
    },
  });

  if (result.status !== 0) {
    throw new Error(
      `Failed to validate ${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath}: ${result.stderr || result.stdout}`,
    );
  }
};
