import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { HARNESS_WRITER_AGENTS } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { formatWriterCliDisplayCommand } from "@/lib/agentWitch/formatWriterCliDisplayCommand";
import type { WriterCliSessionTurn } from "@/lib/agentWitch/writerCliSessionTurn.type";

export const AGENT_LIVE_BASH_PROMPT = "agent-witch@mac ~ % ";

const isHarnessWriterAgent = (value: string): value is HarnessWriterAgent =>
  (HARNESS_WRITER_AGENTS as readonly string[]).includes(value);

export const formatAgentLiveTerminalCommandLine = (
  prompt: string,
  writerAgent: string = "claude-cli",
  sessionTurn: WriterCliSessionTurn = "first",
): string => {
  const resolvedWriter: HarnessWriterAgent = isHarnessWriterAgent(writerAgent)
    ? writerAgent
    : "claude-cli";

  return formatWriterCliDisplayCommand(resolvedWriter, prompt, sessionTurn);
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

export const appendAgentLiveTerminalCommand = (
  output: string,
  commandLine: string,
): string => {
  if (output.length === 0) {
    return buildAgentLiveTerminalCommandEntry(commandLine);
  }

  if (output.endsWith(AGENT_LIVE_BASH_PROMPT)) {
    return `${output}${commandLine}\n`;
  }

  const suffix = output.endsWith("\n") ? "" : "\n";
  return `${output}${suffix}${buildAgentLiveTerminalCommandEntry(commandLine)}`;
};

export const appendAgentLiveTerminalCommandIfMissing = (
  output: string,
  commandLine: string,
): string => {
  if (commandLine.length === 0) {
    return output;
  }

  if (output.includes(`${AGENT_LIVE_BASH_PROMPT}${commandLine}`)) {
    return output;
  }

  return appendAgentLiveTerminalCommand(output, commandLine);
};
