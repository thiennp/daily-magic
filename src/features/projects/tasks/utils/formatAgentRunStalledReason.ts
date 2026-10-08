import { formatProjectTaskMetaTime } from "@/features/projects/tasks/utils/projectTaskTimeline";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/**
 * 41888ea3: Stalled says when the computer last sent an update.
 * f5881faa: the Stalled chip / status label already says "Stalled", so the
 * reason does not repeat it ("Stalled — Stalled — last update…").
 */
export const formatAgentRunStalledReason = (
  run: Pick<AgentRunRecord, "lastRunHeartbeatAt" | "startedAt" | "createdAt">,
): string => {
  const lastAlive = run.lastRunHeartbeatAt ?? run.startedAt ?? run.createdAt;
  return `Last update from your computer ${formatProjectTaskMetaTime(lastAlive)}.`;
};
