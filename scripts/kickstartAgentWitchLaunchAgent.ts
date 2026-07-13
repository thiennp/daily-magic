import { execFile } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface KickstartLaunchAgentResult {
  readonly ok: boolean;
  readonly errorMessage?: string;
}

const resolveLaunchAgentPlistPath = (launchAgentLabel: string): string =>
  path.join(os.homedir(), "Library", "LaunchAgents", `${launchAgentLabel}.plist`);

const isLaunchAgentLoaded = async (serviceTarget: string): Promise<boolean> => {
  try {
    await execFileAsync("launchctl", ["print", serviceTarget]);
    return true;
  } catch {
    return false;
  }
};

const bootstrapLaunchAgent = async (
  domain: string,
  serviceTarget: string,
  plistPath: string,
): Promise<void> => {
  if (await isLaunchAgentLoaded(serviceTarget)) {
    await execFileAsync("launchctl", ["bootout", serviceTarget]).catch(() => undefined);
  }

  await execFileAsync("launchctl", ["bootstrap", domain, plistPath]);
  await execFileAsync("launchctl", ["enable", serviceTarget]);
};

const kickstartLoadedLaunchAgent = async (
  serviceTarget: string,
): Promise<boolean> => {
  try {
    await execFileAsync("launchctl", ["kickstart", "-k", serviceTarget]);
    return true;
  } catch {
    return false;
  }
};

export const kickstartAgentWitchLaunchAgent = async (
  launchAgentLabel: string,
): Promise<KickstartLaunchAgentResult> => {
  if (process.platform !== "darwin") {
    return {
      ok: false,
      errorMessage: "launchctl kickstart is only supported on macOS.",
    };
  }

  const uid = process.getuid?.();
  if (uid === undefined) {
    return {
      ok: false,
      errorMessage: "Could not resolve the current user id for launchctl.",
    };
  }

  const domain = `gui/${uid}`;
  const serviceTarget = `${domain}/${launchAgentLabel}`;

  if (await kickstartLoadedLaunchAgent(serviceTarget)) {
    return { ok: true };
  }

  const plistPath = resolveLaunchAgentPlistPath(launchAgentLabel);
  if (!fs.existsSync(plistPath)) {
    return {
      ok: false,
      errorMessage: `LaunchAgent plist not found for ${launchAgentLabel}.`,
    };
  }

  try {
    await bootstrapLaunchAgent(domain, serviceTarget, plistPath);
    if (await kickstartLoadedLaunchAgent(serviceTarget)) {
      return { ok: true };
    }

    return {
      ok: false,
      errorMessage: `launchctl kickstart failed for ${launchAgentLabel}.`,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "launchctl bootstrap failed.";
    return { ok: false, errorMessage: message };
  }
};
