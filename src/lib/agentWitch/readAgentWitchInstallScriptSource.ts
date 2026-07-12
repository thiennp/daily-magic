import fs from "node:fs";
import path from "node:path";

const AGENT_WITCH_INSTALL_SCRIPT_ALLOWLIST = {
  "agent-witch.ts": path.join(process.cwd(), "scripts", "agent-witch.ts"),
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
