import { AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES } from "@/lib/agentWitch/agentWitchClientInstallScripts.constant";
import { AGENT_WITCH_WAKE_INSTALL_SCRIPT_NAMES } from "@/lib/agentWitch/agentWitchWakeInstallScripts.constant";

export const listAgentWitchInstallScriptNames = (): readonly string[] => [
  "agent-witch.ts",
  ...AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES,
  ...AGENT_WITCH_WAKE_INSTALL_SCRIPT_NAMES,
];
