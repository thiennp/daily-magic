import { randomUUID } from "node:crypto";

import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";

export interface CreateAgentRunInput {
  readonly id?: string;
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

const createAgentRun = async (
  input: CreateAgentRunInput,
): Promise<AgentRunRecord> => {
  const runId = input.id ?? randomUUID();
  const writerAgent = input.writerAgent ?? "claude-cli";

  if (isAgentWitchDevDashboardEnabled()) {
    const now = new Date().toISOString();
    const run: AgentRunRecord = {
      id: runId,
      groupId: input.groupId ?? null,
      requesterUserId: input.requesterUserId,
      executorUserId: input.executorUserId,
      deviceId: input.deviceId ?? null,
      prompt: input.prompt,
      status: input.status,
      dispatchPolicy: input.dispatchPolicy,
      writerAgent,
      capabilityId: input.capabilityId ?? null,
      capabilityVersionId: input.capabilityVersionId ?? null,
      approvalExpiresAt: input.approvalExpiresAt ?? null,
      resultOutput: null,
      resultExitCode: null,
      denialReason: null,
      createdAt: now,
      updatedAt: now,
      startedAt: null,
      completedAt: null,
      lastRunHeartbeatAt: null,
    };
    registerAgentRunSession(run);
    return run;
  }

  const sql = getSql();
  const result = asRowArray(
    await sql`
      INSERT INTO agent_runs (
        id,
        group_id,
        requester_user_id,
        executor_user_id,
        device_id,
        prompt,
        status,
        dispatch_policy,
        writer_agent,
        capability_id,
        capability_version_id,
        approval_expires_at
      )
      VALUES (
        ${runId},
        ${input.groupId ?? null},
        ${input.requesterUserId},
        ${input.executorUserId},
        ${input.deviceId ?? null},
        ${input.prompt},
        ${input.status},
        ${input.dispatchPolicy},
        ${writerAgent},
        ${input.capabilityId ?? null},
        ${input.capabilityVersionId ?? null},
        ${input.approvalExpiresAt ?? null}
      )
      RETURNING *
    `,
  );

  return mapAgentRunRow(result[0]);
};

export default createAgentRun;
