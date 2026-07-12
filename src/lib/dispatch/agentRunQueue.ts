import { randomUUID } from "node:crypto";

import mapQueuedAgentRunRow from "@/lib/dispatch/mapQueuedAgentRunRow";
import type QueuedAgentRunRecord from "@/lib/dispatch/types/QueuedAgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export interface EnqueueAgentRunInput {
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly prompt: string;
  readonly groupId?: string | null;
  readonly capabilityId?: string | null;
}

export async function enqueueAgentRun(
  input: EnqueueAgentRunInput,
): Promise<QueuedAgentRunRecord> {
  const sql = getSql();
  const queueId = randomUUID();
  const rows = asRowArray(
    await sql`
      INSERT INTO agent_run_queue (
        id,
        requester_user_id,
        executor_user_id,
        group_id,
        capability_id,
        prompt
      )
      VALUES (
        ${queueId},
        ${input.requesterUserId},
        ${input.executorUserId},
        ${input.groupId ?? null},
        ${input.capabilityId ?? null},
        ${input.prompt}
      )
      RETURNING *
    `,
  );

  return mapQueuedAgentRunRow(rows[0]);
}

export async function listQueuedAgentRunsForRequester(
  requesterUserId: string,
): Promise<readonly QueuedAgentRunRecord[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM agent_run_queue
      WHERE requester_user_id = ${requesterUserId}
      ORDER BY created_at ASC
    `,
  );

  return rows.map(mapQueuedAgentRunRow);
}

export async function deleteQueuedAgentRun(
  queueId: string,
  requesterUserId: string,
): Promise<boolean> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      DELETE FROM agent_run_queue
      WHERE id = ${queueId}
        AND requester_user_id = ${requesterUserId}
      RETURNING id
    `,
  );

  return rows.length > 0;
}
