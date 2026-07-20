import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import {
  buildRunTerminalSubscriptionKey,
  subscribeDashboardTerminal,
} from "@/lib/dispatch/dashboardTerminalSubscriptionRegistry";
import { dispatchClaudeRunToAgent } from "@/lib/dispatch/dispatchClaudeRunToAgent";
import { markAgentRunRunning } from "@/lib/dispatch/dispatchClaudeRunToAgent";
import {
  buildShellSubscriptionKey,
  createShellSession,
} from "@/lib/dispatch/shellSessionRegistry";

export const startAgentRunWithShellSession = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly agentClient: AgentWitchHubClient;
  readonly sender: AgentWitchHubClient;
  readonly prompt: string;
  readonly runId: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly executorUserId: string;
  readonly deviceId: string | null;
  readonly includeNextActions: boolean;
  readonly sessionContinuation: boolean;
  readonly sourceRunId?: string;
  readonly requestId?: string;
}): Promise<string> => {
  const shellSession = createShellSession({
    ownerUserId: input.executorUserId,
    deviceId: input.deviceId,
    mode: "agent",
    activeRunId: input.runId,
  });
  dispatchClaudeRunToAgent(
    input.runtime,
    input.agentClient,
    input.prompt,
    input.runId,
    input.writerAgent,
    input.requestId,
    input.includeNextActions,
    input.sessionContinuation,
    input.sourceRunId,
    shellSession.shellSessionId,
  );
  await markAgentRunRunning(input.runtime, input.runId);
  subscribeDashboardTerminal(
    input.sender.id,
    buildRunTerminalSubscriptionKey(input.runId),
  );
  subscribeDashboardTerminal(
    input.sender.id,
    buildShellSubscriptionKey(shellSession.shellSessionId),
  );
  return shellSession.shellSessionId;
};
