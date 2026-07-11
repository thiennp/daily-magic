import { getUserById } from "@/lib/auth/userRepository";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export async function enrichAgentRunRecord(
  run: AgentRunRecord,
): Promise<EnrichedAgentRunRecord> {
  const [requester, executor] = await Promise.all([
    getUserById(run.requesterUserId),
    getUserById(run.executorUserId),
  ]);

  return {
    ...run,
    requesterEmail: requester?.email ?? run.requesterUserId,
    executorEmail: executor?.email ?? run.executorUserId,
    requesterName: requester?.name ?? null,
    executorName: executor?.name ?? null,
  };
}

export async function enrichAgentRunRecords(
  runs: readonly AgentRunRecord[],
): Promise<readonly EnrichedAgentRunRecord[]> {
  return Promise.all(runs.map((run) => enrichAgentRunRecord(run)));
}
