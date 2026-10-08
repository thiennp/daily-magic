import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { AWI_BUNDLED_COMMAND_DIR } from "@agent-witch/install-layout/types";
import {
  readAgentWitchHostServices,
  resolveAgentWitchInstallDir,
  resolveAgentWitchRuntimeWakePort,
} from "@agent-witch/install-layout";

import { writeAgentWitchAccountLaunchAgentPlist } from "./agentWitchAccountLaunchAgent";
import { buildAgentWitchLaunchAgentPlistXml } from "./buildAgentWitchLaunchAgentPlistXml";
import { isAgentWitchLaunchAgentPlistXmlValid } from "./isAgentWitchLaunchAgentPlistXmlValid";

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

  // Per-account label (AWL-ISO-1): always the account plist (pins AGENT_WITCH_HOST_ACCOUNT).
  const account = readAgentWitchHostServices(installDir)?.accounts.find(
    (row) => row.launchAgentLabel === input.launchAgentLabel,
  );
  if (account !== undefined) {
    try {
      const written = writeAgentWitchAccountLaunchAgentPlist({
        installDir,
        homeDir,
        account,
      });
      return {
        ok: true,
        rewritten: written.changed,
        plistPath: written.plistPath,
      };
    } catch (error) {
      return {
        ok: false,
        rewritten: false,
        plistPath: resolveAgentWitchLaunchAgentPlistPath(
          input.launchAgentLabel,
          homeDir,
        ),
        errorMessage: error instanceof Error ? error.message : String(error),
      };
    }
  }

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
    wakePort: input.wakePort ?? resolveAgentWitchRuntimeWakePort(installDir),
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
