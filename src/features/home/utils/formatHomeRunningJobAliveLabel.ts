import { formatAgentLiveProgressLastMacUpdate } from "@/features/agent/utils/formatAgentLiveProgressLastMacUpdate";

/** Relative label for Home running jobs from last_run_heartbeat_at or started_at. */
export const formatHomeRunningJobAliveLabel = (input: {
  readonly lastRunHeartbeatAt: string | null;
  readonly startedAt: string | null;
  readonly createdAt: string;
  readonly nowMs: number;
}): string => {
  if (input.lastRunHeartbeatAt !== null) {
    const heartbeatMs = Date.parse(input.lastRunHeartbeatAt);
    if (Number.isFinite(heartbeatMs)) {
      const label = formatAgentLiveProgressLastMacUpdate(
        Math.max(0, input.nowMs - heartbeatMs),
      );
      if (label !== null) {
        return `Last seen alive ${label}`;
      }
    }
  }

  const startedMs = Date.parse(input.startedAt ?? input.createdAt);
  if (!Number.isFinite(startedMs)) {
    return "Waiting for first heartbeat…";
  }

  const sinceStart = formatAgentLiveProgressLastMacUpdate(
    Math.max(0, input.nowMs - startedMs),
  );
  if (sinceStart === null) {
    return "Waiting for first heartbeat…";
  }

  return `Waiting for first heartbeat · started ${sinceStart}`;
};
