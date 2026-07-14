import fs from "node:fs";
import path from "node:path";

import { listAgentWitchInstallScriptNames } from "@/lib/agentWitch/listAgentWitchInstallScriptNames";

const scriptsDir = path.join(process.cwd(), "scripts");

const resolveScriptPath = (relativePath: string): string =>
  path.join(scriptsDir, relativePath);

const buildInstallScriptAllowlist = (): Record<string, string> => {
  const entries: Record<string, string> = {};

  for (const scriptName of listAgentWitchInstallScriptNames()) {
    entries[scriptName] = resolveScriptPath(scriptName);
  }

  return entries;
};

const AGENT_WITCH_INSTALL_SCRIPT_ALLOWLIST = buildInstallScriptAllowlist();

export type AgentWitchInstallScriptName =
  keyof typeof AGENT_WITCH_INSTALL_SCRIPT_ALLOWLIST;

export const isAgentWitchInstallScriptName = (
  value: string,
): value is AgentWitchInstallScriptName =>
  Object.prototype.hasOwnProperty.call(
    AGENT_WITCH_INSTALL_SCRIPT_ALLOWLIST,
    value,
  );

export const readAgentWitchInstallScriptSource = (
  scriptName: AgentWitchInstallScriptName,
): string =>
  fs.readFileSync(AGENT_WITCH_INSTALL_SCRIPT_ALLOWLIST[scriptName], "utf8");

export const readAgentWitchClientSource = (): string =>
  readAgentWitchInstallScriptSource("agent-witch.ts");
