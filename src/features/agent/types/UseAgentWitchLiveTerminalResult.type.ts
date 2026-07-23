import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export interface UseAgentWitchLiveTerminalResult {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly activeRunId: string | null;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly pendingCommandLine: string | null;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly sessionDeviceId: string | null;
  readonly beginSession: (
    commandLine: string,
    writerAgent: HarnessWriterAgent,
    deviceId?: string,
  ) => void;
  readonly finishSession: () => void;
  readonly stopRun: () => void;
  readonly deleteRun: () => void;
  readonly applySocketMessage: (raw: string) => void;
  readonly submitInput: (response: string) => void;
  readonly dismissInput: () => void;
}
