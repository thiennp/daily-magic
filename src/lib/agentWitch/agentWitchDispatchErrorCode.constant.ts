export const AGENT_WITCH_DISPATCH_ERROR_CODES = {
  MAC_OFFLINE: "mac_offline",
  MAC_RECONNECTING: "mac_reconnecting",
  MAC_QUEUED: "mac_queued",
} as const;

export type AgentWitchDispatchErrorCode =
  (typeof AGENT_WITCH_DISPATCH_ERROR_CODES)[keyof typeof AGENT_WITCH_DISPATCH_ERROR_CODES];
