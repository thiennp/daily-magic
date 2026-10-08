import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_HOST_ACCOUNT_ENV,
  readAgentWitchWakePortFromFile,
  resolveAgentWitchAccountProfileDir,
} from "@agent-witch/install-layout";
import {
  AWI_BUNDLED_COMMAND_DIR,
  type AgentWitchHostServiceAccount,
} from "@agent-witch/install-layout/types";

import { buildAgentWitchLaunchAgentPlistXml } from "./buildAgentWitchLaunchAgentPlistXml";
import { isAgentWitchLaunchAgentPlistXmlValid } from "./isAgentWitchLaunchAgentPlistXmlValid";

/** Env that pins a LaunchAgent to one account (run.sh routes logs by AGENT_WITCH_PROFILE). */
export const buildAgentWitchAccountLaunchAgentEnvironment = (
  account: Pick<AgentWitchHostServiceAccount, "email">,
): Readonly<Record<string, string>> => ({
  [AGENT_WITCH_HOST_ACCOUNT_ENV]: account.email,
  AGENT_WITCH_PROFILE: account.email,
});

export const resolveAgentWitchAccountLaunchAgentPlistPath = (
  homeDir: string,
  launchAgentLabel: string,
): string =>
  path.join(homeDir, "Library", "LaunchAgents", `${launchAgentLabel}.plist`);

export const buildAgentWitchAccountLaunchAgentPlistXml = (input: {
  readonly installDir: string;
  readonly homeDir: string;
  readonly account: AgentWitchHostServiceAccount;
}): string =>
  buildAgentWitchLaunchAgentPlistXml({
    launchAgentLabel: input.account.launchAgentLabel,
    runPath: path.join(input.installDir, AWI_BUNDLED_COMMAND_DIR, "run.sh"),
    installDir: input.installDir,
    homeDir: input.homeDir,
    // profiles/<email>/wake-port.json wins (the wake server may have moved ports).
    wakePort:
      readAgentWitchWakePortFromFile(
        resolveAgentWitchAccountProfileDir(
          input.installDir,
          input.account.email,
        ),
      ) ?? input.account.wakePort,
    extraEnvironment: buildAgentWitchAccountLaunchAgentEnvironment(
      input.account,
    ),
  });

const readIfExists = (filePath: string): string | null => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
};

/** Writes `~/Library/LaunchAgents/<account label>.plist`; only rewrites when the content differs. */
export const writeAgentWitchAccountLaunchAgentPlist = (input: {
  readonly installDir: string;
  readonly homeDir: string;
  readonly account: AgentWitchHostServiceAccount;
}): { readonly plistPath: string; readonly changed: boolean } => {
  const plistPath = resolveAgentWitchAccountLaunchAgentPlistPath(
    input.homeDir,
    input.account.launchAgentLabel,
  );
  const xml = buildAgentWitchAccountLaunchAgentPlistXml(input);
  if (!isAgentWitchLaunchAgentPlistXmlValid(xml)) {
    throw new Error(
      `Generated LaunchAgent plist for ${input.account.email} failed XML validation.`,
    );
  }
  if (readIfExists(plistPath) === xml) {
    return { plistPath, changed: false };
  }
  fs.mkdirSync(path.dirname(plistPath), { recursive: true });
  const tmpPath = `${plistPath}.${String(process.pid)}.tmp`;
  fs.writeFileSync(tmpPath, xml, "utf8");
  fs.renameSync(tmpPath, plistPath);
  return { plistPath, changed: true };
};
