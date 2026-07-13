import { randomUUID } from "node:crypto";

import type QueuedAgentRunRecord from "@/lib/dispatch/types/QueuedAgentRunRecord.type";

export interface EnqueueAgentRunInput {
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly prompt: string;
  readonly groupId?: string | null;
  readonly capabilityId?: string | null;
}

const queueById = new Map<string, QueuedAgentRunRecord>();

export async function enqueueAgentRun(
  input: EnqueueAgentRunInput,
): Promise<QueuedAgentRunRecord> {
  const now = new Date().toISOString();
  const record: QueuedAgentRunRecord = {
    id: randomUUID(),
    requesterUserId: input.requesterUserId,
    executorUserId: input.executorUserId,
    groupId: input.groupId ?? null,
    capabilityId: input.capabilityId ?? null,
    prompt: input.prompt,
    createdAt: now,
  };
  queueById.set(record.id, record);
  return record;
}

export async function listQueuedAgentRunsForRequester(
  requesterUserId: string,
): Promise<readonly QueuedAgentRunRecord[]> {
  return [...queueById.values()]
    .filter((item) => item.requesterUserId === requesterUserId)
    .toSorted((left, right) => left.createdAt.localeCompare(right.createdAt));
}

export async function deleteQueuedAgentRun(
  queueId: string,
  requesterUserId: string,
): Promise<boolean> {
  const existing = queueById.get(queueId);
  if (existing === undefined || existing.requesterUserId !== requesterUserId) {
    return false;
  }

  queueById.delete(queueId);
  return true;
}
