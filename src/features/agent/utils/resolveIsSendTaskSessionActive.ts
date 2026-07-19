import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentMacShellStatus } from "@/features/agent/utils/reduceAgentMacShellMessage";

/** Whether Send-a-task should show the live session instead of the wizard. */
export const resolveIsSendTaskSessionActive = (input: {
  readonly hasWriterSession: boolean;
  readonly liveTerminalStatus: AgentLiveTerminalStatus;
  readonly macShellStatus: AgentMacShellStatus;
}): boolean => {
  const isLiveTaskSession =
    input.hasWriterSession &&
    input.liveTerminalStatus !== "idle" &&
    input.liveTerminalStatus !== "finished" &&
    input.liveTerminalStatus !== "error";

  return isLiveTaskSession || input.macShellStatus !== "idle";
};
