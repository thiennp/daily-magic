import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import createAgentRun from "@/lib/dispatch/createAgentRun";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export interface PersistAgentRunInput {
  readonly groupId?: string | null;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly deviceId?: string | null;
  readonly prompt: string;
  readonly status: AgentRunStatusValue;
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly writerAgent?: HarnessWriterAgent;
  readonly capabilityId?: string | null;
  readonly capabilityVersionId?: string | null;
  readonly approvalExpiresAt?: string | null;
}

export const persistAgentRun = async (
  input: PersistAgentRunInput,
): Promise<AgentRunRecord> => {
  const run = await createAgentRun(input);
  registerAgentRunSession(run);
  return run;
};
