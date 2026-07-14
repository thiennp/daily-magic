import { AGENT_WITCH_WAKE_DEFAULT_PORT } from "@/lib/agentWitch/linkLocalAgentAccount";

const resolveLocalWakeBaseUrl = (): string => {
  const portFromEnv = process.env.AGENT_WITCH_WAKE_PORT?.trim();
  if (portFromEnv !== undefined && portFromEnv.length > 0) {
    const parsedPort = Number.parseInt(portFromEnv, 10);
    if (Number.isFinite(parsedPort) && parsedPort > 0 && parsedPort <= 65535) {
      return `http://127.0.0.1:${parsedPort}`;
    }
  }

  return `http://127.0.0.1:${AGENT_WITCH_WAKE_DEFAULT_PORT}`;
};

const fetchLocalWakeJson = async (
  path: string,
  init?: RequestInit,
): Promise<
  | { readonly reachable: true; readonly payload: unknown }
  | { readonly reachable: false }
> => {
  try {
    const response = await fetch(`${resolveLocalWakeBaseUrl()}${path}`, {
      ...init,
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return { reachable: false };
    }

    return {
      reachable: true,
      payload: await response.json(),
    };
  } catch {
    return { reachable: false };
  }
};

export interface LocalAgentWitchSelfUpdateSnapshot {
  readonly reachable: boolean;
  readonly status: unknown;
  readonly logs: readonly unknown[];
}

export const fetchLocalAgentWitchSelfUpdate = async (input?: {
  readonly logLimit?: number;
  readonly includeLogs?: boolean;
}): Promise<LocalAgentWitchSelfUpdateSnapshot> => {
  const logLimit = input?.logLimit ?? 20;
  const includeLogs = input?.includeLogs !== false;

  const statusResult = await fetchLocalWakeJson("/update/status");
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

  const logsResult = await fetchLocalWakeJson(
    `/update/logs?limit=${encodeURIComponent(String(logLimit))}`,
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

export const requestLocalAgentWitchSelfUpdateRun = async (): Promise<{
  readonly reachable: boolean;
  readonly result: unknown;
}> => {
  const updateResult = await fetchLocalWakeJson("/update/run", {
    method: "POST",
  });

  if (!updateResult.reachable) {
    return { reachable: false, result: null };
  }

  return {
    reachable: true,
    result: updateResult.payload,
  };
};
