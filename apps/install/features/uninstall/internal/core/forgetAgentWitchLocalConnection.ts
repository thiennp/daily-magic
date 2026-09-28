import { execFile } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { collectAgentWitchLaunchAgentLabels } from "@agent-witch/install-macos-launch";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

const execFileAsync = promisify(execFile);

const CONNECTION_FILE_NAMES = [
  "config.json",
  "device-keypair.json",
  "connection-health.json",
  "pending-run-inputs.json",
  "run-completion-outbox.json",
] as const;

const INSTALL_ROOT_CONNECTION_FILE_NAMES = [
  "active-profile.json",
  "install-version.json",
  "wake-port.json",
  "link-code.txt",
  "watchdog-reinstall-state.json",
] as const;

export interface ForgetAgentWitchLocalConnectionResult {
  readonly removedLaunchAgentLabels: readonly string[];
}

const removeFileIfPresent = (filePath: string): void => {
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { force: true });
  }
};

const bootoutLaunchAgent = async (launchAgentLabel: string): Promise<void> => {
  const uid = process.getuid?.();
  if (uid === undefined || process.platform !== "darwin") {
    return;
  }

  await execFileAsync("launchctl", [
    "bootout",
    `gui/${uid}/${launchAgentLabel}`,
  ]).catch(() => undefined);
};

/**
 * Stops AWI/AWB for this install and deletes connection files plus the shipped
 * app code. Project, harness, report, run, rag, and Ollama folders stay.
 */
export const forgetAgentWitchLocalConnection = async (input: {
  readonly layout: Pick<
    AgentWitchLocalLayout,
    "installDir" | "appDir" | "configPath"
  >;
  readonly listLaunchAgentLabels?: (installDir: string) => readonly string[];
  readonly launchAgentsDir?: string;
  readonly bootoutLaunchAgent?: (launchAgentLabel: string) => Promise<void>;
}): Promise<ForgetAgentWitchLocalConnectionResult> => {
  const listLabels =
    input.listLaunchAgentLabels ?? collectAgentWitchLaunchAgentLabels;
  const removedLaunchAgentLabels = listLabels(input.layout.installDir);
  const launchAgentsDir =
    input.launchAgentsDir ?? path.join(os.homedir(), "Library", "LaunchAgents");
  const bootout = input.bootoutLaunchAgent ?? bootoutLaunchAgent;

  for (const launchAgentLabel of removedLaunchAgentLabels) {
    await bootout(launchAgentLabel);
    removeFileIfPresent(
      path.join(launchAgentsDir, `${launchAgentLabel}.plist`),
    );
  }

  const profileDir = path.dirname(input.layout.configPath);
  for (const fileName of CONNECTION_FILE_NAMES) {
    removeFileIfPresent(path.join(profileDir, fileName));
  }

  for (const fileName of INSTALL_ROOT_CONNECTION_FILE_NAMES) {
    removeFileIfPresent(path.join(input.layout.installDir, fileName));
  }

  fs.rmSync(input.layout.appDir, { recursive: true, force: true });

  return { removedLaunchAgentLabels };
};
