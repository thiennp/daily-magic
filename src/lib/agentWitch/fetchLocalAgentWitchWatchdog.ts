import { fetchLocalAgentWitchWakeJson } from "@/lib/agentWitch/fetchLocalAgentWitchWakeJson";

export interface LocalAgentWitchWatchdogSnapshot {
  readonly reachable: boolean;
  readonly status: unknown;
  readonly logs: readonly unknown[];
}

export const fetchLocalAgentWitchWatchdog = async (input?: {
  readonly logLimit?: number;
  readonly includeLogs?: boolean;
}): Promise<LocalAgentWitchWatchdogSnapshot> => {
  const logLimit = input?.logLimit ?? 20;
  const includeLogs = input?.includeLogs !== false;

  const statusResult = await fetchLocalAgentWitchWakeJson("/watchdog/status");
  if (!statusResult.reachable) {
    return {
      reachable: false,
      status: null,
      logs: [],
    };
  }

  if (!includeLogs) {
    return {
      reachable: true,
      status: statusResult.payload,
      logs: [],
    };
  }

  const logsResult = await fetchLocalAgentWitchWakeJson(
    `/watchdog/logs?limit=${encodeURIComponent(String(logLimit))}`,
  );

  const logsPayload =
    logsResult.reachable &&
    typeof logsResult.payload === "object" &&
    logsResult.payload !== null &&
    Array.isArray((logsResult.payload as { logs?: unknown }).logs)
      ? ((logsResult.payload as { logs: readonly unknown[] }).logs ?? [])
      : [];

  return {
    reachable: true,
    status: statusResult.payload,
    logs: logsPayload,
  };
};

export const requestLocalAgentWitchWatchdogRevive = async (): Promise<{
  readonly reachable: boolean;
  readonly result: unknown;
}> => {
  const reviveResult = await fetchLocalAgentWitchWakeJson("/watchdog/revive", {
    method: "POST",
  });

  if (!reviveResult.reachable) {
    return { reachable: false, result: null };
  }

  return {
    reachable: true,
    result: reviveResult.payload,
  };
};
