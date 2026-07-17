import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

export const resolveSessionErrorMessage = (input: {
  readonly liveTerminalStatus: AgentLiveTerminalStatus;
  readonly isSessionActive: boolean;
  readonly lastResponse: {
    readonly text: string;
    readonly isError: boolean;
  };
}): string | null => {
  if (input.liveTerminalStatus === "error") {
    if (input.lastResponse.isError) {
      return input.lastResponse.text;
    }

    return "Something went wrong. You can retry without starting over.";
  }

  if (!input.isSessionActive && input.lastResponse.isError) {
    return input.lastResponse.text;
  }

  return null;
};
