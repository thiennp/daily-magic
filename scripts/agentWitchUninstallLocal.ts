import { execFile, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
} from "./resolveAgentWitchLocalLayout";

const execFileAsync = promisify(execFile);

export interface AgentWitchUninstallLocalResult {
  readonly ok: boolean;
  readonly message: string;
  readonly removedLaunchAgentLabels: readonly string[];
}

const resolveLaunchAgentsDir = (): string =>
  path.join(os.homedir(), "Library", "LaunchAgents");

const bootoutLaunchAgent = async (launchAgentLabel: string): Promise<void> => {
  const uid = process.getuid?.();
  if (uid === undefined) {
    return;
  }

  const serviceTarget = `gui/${uid}/${launchAgentLabel}`;
  await execFileAsync("launchctl", ["bootout", serviceTarget]).catch(
    () => undefined,
  );
};

const removeLaunchAgentPlist = (launchAgentLabel: string): void => {
  const plistPath = path.join(
    resolveLaunchAgentsDir(),
    `${launchAgentLabel}.plist`,
  );

  if (fs.existsSync(plistPath)) {
    fs.unlinkSync(plistPath);
  }
};

export const collectAgentWitchLaunchAgentLabels = (
  installDir: string = resolveAgentWitchInstallDir(),
): readonly string[] => {
  const prefix = resolveAgentWitchLaunchAgentPrefix(installDir);
  const labels = new Set<string>([
    `${prefix}-wake`,
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

const scheduleInstallDirRemoval = (installDir: string): void => {
  const child = spawn(
    "sh",
    ["-c", `sleep 2 && rm -rf ${JSON.stringify(installDir)}`],
    {
      detached: true,
      stdio: "ignore",
    },
  );
  child.unref();
};

export const runAgentWitchUninstallLocal =
  async (): Promise<AgentWitchUninstallLocalResult> => {
    if (process.platform !== "darwin") {
      return {
        ok: false,
        message: "Local uninstall is only supported on macOS.",
        removedLaunchAgentLabels: [],
      };
    }

    const installDir = resolveAgentWitchInstallDir();
    if (!fs.existsSync(installDir)) {
      return {
        ok: false,
        message: "No local Agent Witch install directory was found.",
        removedLaunchAgentLabels: [],
      };
    }

    const removedLaunchAgentLabels =
      collectAgentWitchLaunchAgentLabels(installDir);

    for (const launchAgentLabel of removedLaunchAgentLabels) {
      await bootoutLaunchAgent(launchAgentLabel);
      removeLaunchAgentPlist(launchAgentLabel);
    }

    scheduleInstallDirRemoval(installDir);

    return {
      ok: true,
      message:
        "Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",
      removedLaunchAgentLabels,
    };
  };
