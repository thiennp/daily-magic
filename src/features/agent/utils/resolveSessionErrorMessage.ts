import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

const GENERIC_SESSION_ERROR =
  "Something went wrong. You can retry without starting over.";

const readTrailingSessionError = (output: string): string | null => {
  const lines = output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
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
