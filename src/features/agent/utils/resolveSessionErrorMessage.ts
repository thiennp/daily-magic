import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

const GENERIC_SESSION_ERROR =
  "Something went wrong. You can retry without starting over.";

// a6053d1c: the trailing shell prompt ("agent-witch@mac ~ %") is chrome,
// not the error; it showed as stray pink text above the floater.
const SHELL_PROMPT_LINE = /^agent-witch@(?:mac|linux)\s+~\s+[%$]/i;

const readTrailingSessionError = (output: string): string | null => {
  const lines = output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !SHELL_PROMPT_LINE.test(line));
  if (lines.length === 0) {
    return null;
  }
  return lines[lines.length - 1] ?? null;
};

export const resolveSessionErrorMessage = (input: {
  readonly liveTerminalStatus: AgentLiveTerminalStatus;
  readonly liveTerminalOutput?: string;
  readonly lastResponse: {
    readonly text: string;
    readonly isError: boolean;
  };
}): string | null => {
  if (input.lastResponse.isError) {
    return input.lastResponse.text;
  }

  if (input.liveTerminalStatus === "error") {
    const fromOutput = readTrailingSessionError(input.liveTerminalOutput ?? "");
    if (fromOutput !== null) {
      return fromOutput;
    }
    return GENERIC_SESSION_ERROR;
  }

  return null;
};
