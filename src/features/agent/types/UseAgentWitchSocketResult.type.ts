import type { useAgentMacShell } from "@/features/agent/hooks/public-api/types";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { AgentWitchSocketDisplay } from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { AgentRunInputRequest } from "@/features/dispatch/public-api/types";

export interface UseAgentWitchSocketResult {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly lastResponse: AgentWitchSocketDisplay;
  readonly clearLastResponse: () => void;
  readonly liveTerminalOutput: string;
  readonly liveTerminalStatus: AgentLiveTerminalStatus;
  readonly liveTerminalPendingCommandLine: string | null;
  readonly liveTerminalRunId: string | null;
  readonly liveTerminalPendingInput: AgentRunInputRequest | null;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly sessionDeviceId: string | null;
  readonly macShell: ReturnType<typeof useAgentMacShell>;
  readonly finishLiveTerminalSession: () => void;
  readonly stopLiveTerminalRun: () => void;
  readonly deleteLiveTerminalRun: () => void;
  readonly submitLiveTerminalInput: (response: string) => void;
  readonly dismissLiveTerminalInput: () => void;
  readonly sendClaudePrompt: (
    prompt: string,
    options?: {
      readonly writerAgent: HarnessWriterAgent;
      readonly targetUserId?: string;
      readonly groupId?: string;
      readonly capabilityId?: string;
      readonly targetDeviceId?: string;
      readonly projectFolderPath?: string;
      /** Required: dispatch always sends the current project's project_id. */
      readonly projectId: string;
      readonly fieldValues?: Readonly<Record<string, string>>;
      readonly useOfficialWorkflowOrchestration?: boolean;
      /** Composer Start: a new task, never a continuation of the open thread (FAIL1). */
      readonly freshStart?: boolean;
    },
  ) => void;
  readonly startWriterSession: (
    writerAgent: HarnessWriterAgent,
    targetDeviceId?: string,
  ) => void;
}
