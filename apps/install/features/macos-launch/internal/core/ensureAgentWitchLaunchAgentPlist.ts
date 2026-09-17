import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  AWI_BUNDLED_COMMAND_DIR,
  AWI_INSTALL_ROOT_FILES,
} from "@agent-witch/install-layout/types";
import {
  resolveAgentWitchDefaultWakePort,
  resolveAgentWitchInstallDir,
} from "@agent-witch/install-layout";

import { buildAgentWitchLaunchAgentPlistXml } from "./buildAgentWitchLaunchAgentPlistXml";
import { isAgentWitchLaunchAgentPlistXmlValid } from "./isAgentWitchLaunchAgentPlistXmlValid";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isValidWakePort = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value > 0 &&
  value <= 65535;

const readWakePortFromInstallDir = (installDir: string): number => {
  const portFilePath = path.join(installDir, AWI_INSTALL_ROOT_FILES.wakePort);
  if (!fs.existsSync(portFilePath)) {
    return resolveAgentWitchDefaultWakePort(installDir);
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(portFilePath, "utf8"));
    if (isRecord(parsed) && isValidWakePort(parsed.wakePort)) {
      return parsed.wakePort;
    }
  } catch {
    return resolveAgentWitchDefaultWakePort(installDir);
  }

  return resolveAgentWitchDefaultWakePort(installDir);
};

export interface EnsureAgentWitchLaunchAgentPlistInput {
  readonly launchAgentLabel: string;
  readonly installDir?: string;
  readonly homeDir?: string;
  readonly wakePort?: number;
}

export interface EnsureAgentWitchLaunchAgentPlistResult {
  readonly ok: boolean;
  readonly rewritten: boolean;
  readonly plistPath: string;
  readonly errorMessage?: string;
}

export const resolveAgentWitchLaunchAgentPlistPath = (
  launchAgentLabel: string,
  homeDir: string = os.homedir(),
): string =>
  path.join(homeDir, "Library", "LaunchAgents", `${launchAgentLabel}.plist`);

/** Rewrite `~/Library/LaunchAgents/<label>.plist` when missing or invalid (AGENT-067). */
export const ensureAgentWitchLaunchAgentPlist = (
  input: EnsureAgentWitchLaunchAgentPlistInput,
): EnsureAgentWitchLaunchAgentPlistResult => {
  const installDir = input.installDir ?? resolveAgentWitchInstallDir();
  const homeDir = input.homeDir ?? os.homedir();
  const plistPath = resolveAgentWitchLaunchAgentPlistPath(
    input.launchAgentLabel,
    homeDir,
  );
  const existing = fs.existsSync(plistPath)
    ? fs.readFileSync(plistPath, "utf8")
    : null;

  if (existing !== null && isAgentWitchLaunchAgentPlistXmlValid(existing)) {
    return { ok: true, rewritten: false, plistPath };
  }

  const xml = buildAgentWitchLaunchAgentPlistXml({
    launchAgentLabel: input.launchAgentLabel,
    runPath: path.join(installDir, AWI_BUNDLED_COMMAND_DIR, "run.sh"),
    installDir,
    homeDir,
    wakePort: input.wakePort ?? readWakePortFromInstallDir(installDir),
  });

  if (!isAgentWitchLaunchAgentPlistXmlValid(xml)) {
    return {
      ok: false,
      rewritten: false,
      plistPath,
      errorMessage: "Generated LaunchAgent plist failed XML validation.",
    };
  }

  try {
    fs.mkdirSync(path.dirname(plistPath), { recursive: true });
    fs.writeFileSync(plistPath, xml, "utf8");
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Could not write LaunchAgent plist.";
    return { ok: false, rewritten: false, plistPath, errorMessage: message };
  }

  return { ok: true, rewritten: true, plistPath };
};
