import fs from "node:fs";

import { resolveAgentWitchInstallBundleOutfile } from "@agent-witch/install-bundle";

import { AGENT_WITCH_HOST_RESTART_LOG_PREFIX } from "./restartAgentWitchHostAfterBundleUpdate";

/** Ensures bundle updates relaunch the host on non-systemd / non-launchd modes. */
export const assertShippedInstallBundleHostRestart = (
  workspaceRoot: string,
): void => {
  const bundlePath = resolveAgentWitchInstallBundleOutfile(workspaceRoot);
  const source = fs.readFileSync(bundlePath, "utf8");

  if (!source.includes(AGENT_WITCH_HOST_RESTART_LOG_PREFIX)) {
    throw new Error(
      `Shipped install bundle is missing host restart log prefix (${AGENT_WITCH_HOST_RESTART_LOG_PREFIX}). Rebuild with npm run build:agent-witch and bump AGENT_WITCH_INSTALL_BUNDLE_VERSION.`,
    );
  }

  if (!source.includes("detached-relaunch") || !source.includes("setsid")) {
    throw new Error(
      "Shipped install bundle is missing detached host relaunch wiring (setsid / detached-relaunch). Rebuild with npm run build:agent-witch.",
    );
  }
};
