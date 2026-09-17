import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
} from "@agent-witch/install-layout";

import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";

const resolveLaunchAgentsDir = (): string =>
  path.join(os.homedir(), "Library", "LaunchAgents");

export const collectAgentWitchLaunchAgentLabels = (
  installDir: string = resolveAgentWitchInstallDir(),
): readonly string[] => {
  const prefix = resolveAgentWitchLaunchAgentPrefix(installDir);
  const labels = new Set<string>([
    `${prefix}-wake`,
    `${prefix}-live`,
    `${prefix}-watchdog`,
    `${prefix}-updater`,
    `${prefix}-automation-scheduler`,
  ]);

  for (const target of listAgentWitchLaunchTargets(installDir)) {
    labels.add(target.launchAgentLabel);
  }

  const launchAgentsDir = resolveLaunchAgentsDir();
  if (fs.existsSync(launchAgentsDir)) {
    for (const entry of fs.readdirSync(launchAgentsDir)) {
      if (!entry.endsWith(".plist")) {
        continue;
      }

      const launchAgentLabel = entry.slice(0, -".plist".length);
      if (
        launchAgentLabel === prefix ||
        launchAgentLabel.startsWith(`${prefix}.`) ||
        launchAgentLabel.startsWith(`${prefix}-`)
      ) {
        labels.add(launchAgentLabel);
      }
    }
  }

  return [...labels];
};
