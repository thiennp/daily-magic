import { AGENT_WITCH_CONNECTION_STALE_MS } from "@agent-witch/install-connection-health/types";

export type LocalAppHealthFileBadge = "No heartbeat yet" | "Stale" | "Fresh";

export const isAgentWitchLastHeartbeatStale = (
  lastHeartbeatAt: string | null,
  staleAfterMs: number = AGENT_WITCH_CONNECTION_STALE_MS,
  nowMs: number = Date.now(),
): boolean => {
  if (lastHeartbeatAt === null) {
    return true;
  }

  const lastMs = Date.parse(lastHeartbeatAt);
  if (Number.isNaN(lastMs)) {
    return true;
  }

  return nowMs - lastMs > staleAfterMs;
};

export const resolveLocalAppHealthFileBadge = (input: {
  readonly lastHeartbeatAt: string | null;
  readonly heartbeatIsStale: boolean;
}): LocalAppHealthFileBadge => {
  if (input.lastHeartbeatAt === null) {
    return "No heartbeat yet";
  }
  if (input.heartbeatIsStale) {
    return "Stale";
  }
  return "Fresh";
};
