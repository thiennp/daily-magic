export const AGENT_WITCH_WAKE_SHELL_RELATIVE_PATH = ".agent-witch/wake.sh";

export const buildAgentWitchWakeTerminalCommand = (): string =>
  `~/${AGENT_WITCH_WAKE_SHELL_RELATIVE_PATH}`;
