import fs from "node:fs";
import path from "node:path";

const AGENT_WITCH_INSTALL_SCRIPT_ALLOWLIST = {
  "agent-witch.ts": path.join(process.cwd(), "scripts", "agent-witch.ts"),
  "agent-witch-wake-server.ts": path.join(
    process.cwd(),
    "scripts",
    "agent-witch-wake-server.ts",
  ),
  "agentWitchWakeConstants.ts": path.join(
    process.cwd(),
    "scripts",
    "agentWitchWakeConstants.ts",
  ),
  "agentWitchWakeHandlers.ts": path.join(
    process.cwd(),
    "scripts",
    "agentWitchWakeHandlers.ts",
  ),
  "kickstartAgentWitchLaunchAgent.ts": path.join(
    process.cwd(),
    "scripts",
    "kickstartAgentWitchLaunchAgent.ts",
  ),
  "listAgentWitchLaunchTargets.ts": path.join(
    process.cwd(),
    "scripts",
    "listAgentWitchLaunchTargets.ts",
  ),
  "readHarnessExportSets.ts": path.join(
    process.cwd(),
    "scripts",
    "readHarnessExportSets.ts",
  ),
  "resolveAgentWitchLocalLayout.ts": path.join(
    process.cwd(),
    "scripts",
    "resolveAgentWitchLocalLayout.ts",
  ),
  "ensureAgentWitchProfile.ts": path.join(
    process.cwd(),
    "scripts",
    "ensureAgentWitchProfile.ts",
  ),
  "linkAgentWitchAccountLocally.ts": path.join(
    process.cwd(),
    "scripts",
    "linkAgentWitchAccountLocally.ts",
  ),
} as const;

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
