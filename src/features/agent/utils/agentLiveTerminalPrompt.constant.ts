export const AGENT_LIVE_BASH_PROMPT = "agent-witch@mac ~ % ";

const truncateCommand = (value: string, maxLength: number = 120): string => {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1)}…`;
};

export const formatAgentLiveTerminalCommandLine = (
  prompt: string,
  writerAgent: string = "claude-cli",
): string => {
  const escaped = truncateCommand(prompt).replace(/"/g, '\\"');
  return `${writerAgent} "${escaped}"`;
};

export const buildAgentLiveTerminalCommandEntry = (
  commandLine: string,
): string => `${AGENT_LIVE_BASH_PROMPT}${commandLine}\n`;

export const buildAgentLiveTerminalIdleLine = (): string =>
  AGENT_LIVE_BASH_PROMPT;

export const appendAgentLiveTerminalPrompt = (output: string): string => {
  if (output.endsWith(AGENT_LIVE_BASH_PROMPT)) {
    return output;
  }

  const suffix = output.endsWith("\n") ? "" : "\n";
  return `${output}${suffix}${AGENT_LIVE_BASH_PROMPT}`;
};
