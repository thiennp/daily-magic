import fs from "node:fs";
import path from "node:path";

import { AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES } from "@/lib/agentWitch/agentWitchClientInstallScripts.constant";

const scriptsDir = path.join(process.cwd(), "scripts");

const resolveScriptPath = (relativePath: string): string =>
  path.join(scriptsDir, relativePath);

const AGENT_WITCH_WAKE_INSTALL_SCRIPT_NAMES = [
  "agent-witch-wake-server.ts",
  "agentWitchWakeConstants.ts",
  "agentWitchWakeHandlers.ts",
  "agentWitchWakeAllowedOrigins.ts",
  "kickstartAgentWitchLaunchAgent.ts",
  "listAgentWitchLaunchTargets.ts",
  "ensureAgentWitchProfile.ts",
  "linkAgentWitchAccountLocally.ts",
  "spawnAgentWitchClient.ts",
  "agent-witch-wake-cli.ts",
  "agent-witch-watchdog.ts",
  "reviveAgentWitchWebSocket.ts",
  "agentWitchConnectionHealth.ts",
  "agentWitchConnectionHealth.constants.ts",
  "isAgentWitchLaunchAgentRunning.ts",
  "agentWitchWatchdogLog.ts",
  "buildAgentWitchWatchdogStatus.ts",
] as const;

const buildInstallScriptAllowlist = (): Record<string, string> => {
  const entries: Record<string, string> = {
    "agent-witch.ts": resolveScriptPath("agent-witch.ts"),
  };

  for (const scriptName of AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES) {
    entries[scriptName] = resolveScriptPath(scriptName);
  }

  for (const scriptName of AGENT_WITCH_WAKE_INSTALL_SCRIPT_NAMES) {
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
