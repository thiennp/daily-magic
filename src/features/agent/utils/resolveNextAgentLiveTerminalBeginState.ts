import {
  beginAgentLiveTerminalSession,
  continueAgentLiveTerminalSession,
  shouldContinueAgentLiveTerminalThread,
  type AgentLiveTerminalState,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/**
 * 37874fdc: a different writer never continues the open session's thread.
 * ed42d8ce: neither does a different computer (the picker no longer locks to
 * an ended session's computer).
 */
export const resolveNextAgentLiveTerminalBeginState = (
  current: AgentLiveTerminalState,
  commandLine: string,
  writerAgent: HarnessWriterAgent,
  deviceId?: string,
  options?: { readonly fresh?: boolean },
): AgentLiveTerminalState =>
  options?.fresh !== true &&
  shouldContinueAgentLiveTerminalThread(current) &&
  current.sessionWriterAgent === writerAgent &&
  (deviceId === undefined ||
    deviceId.length === 0 ||
    current.sessionDeviceId === null ||
    current.sessionDeviceId === deviceId)
    ? continueAgentLiveTerminalSession(current, commandLine)
    : beginAgentLiveTerminalSession(
        commandLine,
        writerAgent,
        deviceId && deviceId.length > 0 ? deviceId : null,
      );
