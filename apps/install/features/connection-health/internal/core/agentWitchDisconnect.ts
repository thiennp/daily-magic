/**
 * Why the Mac lost (or never got) its cloud WebSocket, and how long to wait
 * before the next attempt. Pure functions: callers inject `random`.
 *
 * "Server down" (Railway fallback 404, 5xx, DNS, refused) keeps the identity
 * and backs off quietly. An identity rejection (`device_not_linked`) retries
 * rarely. A socket that opened but never got `system.ack` keeps growing its
 * delay instead of looping every 2s.
 */
export type AgentWitchDisconnectKind =
  "server_down" | "dns" | "device_not_linked" | "closed_before_ack" | "unknown";

export interface AgentWitchDisconnectSignal {
  readonly statusCode?: number | null;
  /** Value of the `x-railway-fallback` response header, when present. */
  readonly railwayFallback?: string | null;
  /** Node error code such as ENOTFOUND, ECONNREFUSED. */
  readonly errorCode?: string | null;
  readonly closeCode?: number | null;
  readonly socketWasOpen: boolean;
  readonly notLinked: boolean;
}

const DNS_ERROR_CODES = new Set(["ENOTFOUND", "EAI_AGAIN"]);
const NETWORK_ERROR_CODES = new Set([
  "ECONNREFUSED",
  "ECONNRESET",
  "ETIMEDOUT",
  "EHOSTUNREACH",
  "ENETUNREACH",
]);

/** Cap for server-down / DNS retries: recover within ~2 minutes of the fix. */
export const AGENT_WITCH_SERVER_DOWN_MAX_DELAY_MS = 120_000;
export const AGENT_WITCH_SERVER_DOWN_MIN_DELAY_MS = 5_000;
export const AGENT_WITCH_DEFAULT_MAX_DELAY_MS = 30_000;
/** Revoked/unlinked device: retry rarely instead of every 2s. */
export const AGENT_WITCH_NOT_LINKED_RETRY_MS = 5 * 60 * 1_000;

const JITTER_RATIO = 0.2;

export const classifyAgentWitchDisconnect = (
  signal: AgentWitchDisconnectSignal,
): AgentWitchDisconnectKind => {
  if (signal.notLinked) {
    return "device_not_linked";
  }
  if (signal.errorCode != null && DNS_ERROR_CODES.has(signal.errorCode)) {
    return "dns";
  }
  const status = signal.statusCode ?? null;
  const isHttpServerFailure =
    status !== null && (status === 404 || status === 429 || status >= 500);
  if (
    isHttpServerFailure ||
    (signal.railwayFallback != null && signal.railwayFallback.length > 0)
  ) {
    return "server_down";
  }
  if (signal.errorCode != null && NETWORK_ERROR_CODES.has(signal.errorCode)) {
    return "server_down";
  }
  if (!signal.socketWasOpen) {
    return "server_down";
  }
  return "closed_before_ack";
};

const withJitter = (delayMs: number, random: () => number): number => {
  const spread = delayMs * JITTER_RATIO;
  return Math.round(delayMs - spread + random() * spread * 2);
};

export const computeAgentWitchReconnectDelayMs = (input: {
  readonly attempt: number;
  readonly kind: AgentWitchDisconnectKind;
  readonly random?: () => number;
}): number => {
  const random = input.random ?? Math.random;
  if (input.kind === "device_not_linked") {
    return withJitter(AGENT_WITCH_NOT_LINKED_RETRY_MS, random);
  }
  if (input.kind === "server_down" || input.kind === "dns") {
    const delayMs =
      AGENT_WITCH_SERVER_DOWN_MIN_DELAY_MS * 2 ** Math.max(0, input.attempt);
    return withJitter(
      Math.min(AGENT_WITCH_SERVER_DOWN_MAX_DELAY_MS, delayMs),
      random,
    );
  }
  const delayMs = 1_000 * 2 ** Math.max(0, input.attempt);
  return withJitter(
    Math.min(AGENT_WITCH_DEFAULT_MAX_DELAY_MS, delayMs),
    random,
  );
};

export const describeAgentWitchDisconnectKind = (
  kind: AgentWitchDisconnectKind,
): string => {
  switch (kind) {
    case "server_down":
      return "AgentWitch cloud is unreachable (server side). This computer's link is kept.";
    case "dns":
      return "Cannot resolve the AgentWitch cloud address (network or DNS). This computer's link is kept.";
    case "device_not_linked":
      return "The cloud does not recognise this computer as linked. Run the install command from Home while signed in.";
    case "closed_before_ack":
      return "The cloud closed the connection before acknowledging this computer.";
    case "unknown":
      return "Disconnected from the AgentWitch cloud.";
  }
};
