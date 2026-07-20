import { randomUUID } from "node:crypto";

import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export interface CreateEphemeralAgentRunInput {
  readonly groupId?: string | null;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly prompt: string;
  readonly status: AgentRunStatusValue;
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly capabilityId?: string | null;
  readonly capabilityVersionId?: string | null;
  readonly approvalExpiresAt?: string | null;
}

export const createEphemeralAgentRun = (
  input: CreateEphemeralAgentRunInput,
): AgentRunRecord => {
  const now = new Date().toISOString();
  return {
    id: randomUUID(),
    groupId: input.groupId ?? null,
    requesterUserId: input.requesterUserId,
    executorUserId: input.executorUserId,
    prompt: input.prompt,
    status: input.status,
    dispatchPolicy: input.dispatchPolicy,
    resultOutput: null,
    resultExitCode: null,
    denialReason: null,
    createdAt: now,
    updatedAt: now,
    startedAt: null,
    completedAt: null,
    approvalExpiresAt: input.approvalExpiresAt ?? null,
    capabilityId: input.capabilityId ?? null,
    capabilityVersionId: input.capabilityVersionId ?? null,
    deviceId: null,
    writerAgent: "claude-cli",
    lastRunHeartbeatAt: null,
  };
};
