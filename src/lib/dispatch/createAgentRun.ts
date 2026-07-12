import { randomUUID } from "node:crypto";

import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export interface CreateAgentRunInput {
  readonly groupId?: string | null;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly prompt: string;
  readonly status: AgentRunStatusValue;
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly capabilityId?: string | null;
  readonly capabilityVersionId?: string | null;
}

export async function createAgentRun(
  input: CreateAgentRunInput,
): Promise<AgentRunRecord> {
  const sql = getSql();
  const runId = randomUUID();
  const result = asRowArray(
    await sql`
      INSERT INTO agent_runs (
        id,
        group_id,
        requester_user_id,
        executor_user_id,
        prompt,
        status,
        dispatch_policy,
        capability_id,
        capability_version_id
      )
      VALUES (
        ${runId},
        ${input.groupId ?? null},
        ${input.requesterUserId},
        ${input.executorUserId},
        ${input.prompt},
        ${input.status},
        ${input.dispatchPolicy},
        ${input.capabilityId ?? null},
        ${input.capabilityVersionId ?? null}
      )
      RETURNING *
    `,
  );

  return mapAgentRunRow(result[0]);
}
