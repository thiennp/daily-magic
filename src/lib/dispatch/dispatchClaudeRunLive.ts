import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { startAgentRunWithShellSession } from "@/lib/dispatch/startAgentRunWithShellSession";

export const dispatchClaudeRunLive = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly agentClient: AgentWitchHubClient;
  readonly sender: AgentWitchHubClient;
  readonly prompt: string;
  readonly runId: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly executorUserId: string;
  readonly deviceId: string | null;
  readonly requesterUserId: string;
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly includeNextActions: boolean;
  readonly sessionContinuation: boolean;
  readonly sourceRunId?: string;
  readonly projectFolderPath?: string;
  readonly requestId?: string;
}): Promise<AgentWitchMessage> => {
  const shellSessionId = await startAgentRunWithShellSession({
    runtime: input.runtime,
    agentClient: input.agentClient,
    sender: input.sender,
    prompt: input.prompt,
    runId: input.runId,
    writerAgent: input.writerAgent,
    executorUserId: input.executorUserId,
    deviceId: input.deviceId,
    includeNextActions: input.includeNextActions,
    sessionContinuation: input.sessionContinuation,
    sourceRunId: input.sourceRunId,
    projectFolderPath: input.projectFolderPath,
    requestId: input.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      dispatched: true,
      agentRunId: input.runId,
      agentClientId: input.agentClient.id,
      ...(shellSessionId !== undefined ? { shellSessionId } : {}),
      shellCanWrite: input.requesterUserId === input.executorUserId,
      dispatchPolicy: input.dispatchPolicy,
    },
    requestId: input.requestId,
  };
};
