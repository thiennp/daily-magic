import {
  beginAgentLiveTerminalSession,
  continueAgentLiveTerminalSession,
  shouldContinueAgentLiveTerminalThread,
  type AgentLiveTerminalState,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/** 37874fdc: a different writer never continues the open session's thread. */
export const resolveNextAgentLiveTerminalBeginState = (
  current: AgentLiveTerminalState,
  commandLine: string,
  writerAgent: HarnessWriterAgent,
  deviceId?: string,
  options?: { readonly fresh?: boolean },
): AgentLiveTerminalState =>
  options?.fresh !== true &&
  shouldContinueAgentLiveTerminalThread(current) &&
  current.sessionWriterAgent === writerAgent
    ? continueAgentLiveTerminalSession(current, commandLine)
    : beginAgentLiveTerminalSession(
        commandLine,
        writerAgent,
        deviceId && deviceId.length > 0 ? deviceId : null,
      );
