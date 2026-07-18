export interface AgentWitchTrafficEntry {
  readonly id: string;
  readonly at: string;
  readonly direction: "server_to_mac" | "mac_to_server" | "browser_to_server";
  readonly path: string;
  readonly summary: string;
  readonly request?: unknown;
  readonly response?: unknown;
}

const MAX_ENTRIES = 100;

const trafficGlobal = globalThis as typeof globalThis & {
  __dailyMagicAgentWitchTraffic?: AgentWitchTrafficEntry[];
};

const getLog = (): AgentWitchTrafficEntry[] => {
  if (trafficGlobal.__dailyMagicAgentWitchTraffic === undefined) {
    trafficGlobal.__dailyMagicAgentWitchTraffic = [];
  }
  return trafficGlobal.__dailyMagicAgentWitchTraffic;
};

export const recordAgentWitchTraffic = (input: {
  readonly direction: AgentWitchTrafficEntry["direction"];
  readonly path: string;
  readonly summary: string;
  readonly request?: unknown;
  readonly response?: unknown;
}): void => {
  const log = getLog();
  log.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
    direction: input.direction,
    path: input.path,
    summary: input.summary,
    ...(input.request !== undefined ? { request: input.request } : {}),
    ...(input.response !== undefined ? { response: input.response } : {}),
  });

  if (log.length > MAX_ENTRIES) {
    log.length = MAX_ENTRIES;
  }
};

export const listAgentWitchTraffic = (): readonly AgentWitchTrafficEntry[] => [
  ...getLog(),
];

export const clearAgentWitchTraffic = (): void => {
  trafficGlobal.__dailyMagicAgentWitchTraffic = [];
};
