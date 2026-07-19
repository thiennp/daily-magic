import {
  beginAgentLiveTerminalSession,
  continueAgentLiveTerminalSession,
  shouldContinueAgentLiveTerminalThread,
  type AgentLiveTerminalState,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const resolveNextAgentLiveTerminalBeginState = (
  current: AgentLiveTerminalState,
  commandLine: string,
  writerAgent: HarnessWriterAgent,
  deviceId?: string,
): AgentLiveTerminalState =>
  shouldContinueAgentLiveTerminalThread(current)
    ? continueAgentLiveTerminalSession(current, commandLine)
    : beginAgentLiveTerminalSession(
        commandLine,
        writerAgent,
        deviceId && deviceId.length > 0 ? deviceId : null,
      );
