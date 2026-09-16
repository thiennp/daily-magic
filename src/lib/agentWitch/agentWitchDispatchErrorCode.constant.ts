export const AGENT_WITCH_DISPATCH_ERROR_CODES = {
  MAC_OFFLINE: "mac_offline",
  MAC_RECONNECTING: "mac_reconnecting",
  MAC_QUEUED: "mac_queued",
  MAC_REPLACED: "mac_replaced",
} as const;

/** The targeted device row was superseded by a re-pair of the same Mac. */
export const MAC_REPLACED_ERROR =
  "This Mac was re-paired. Reselect it and try again.";

/** Interactive work cannot wait, so the caller is asked to retry shortly. */
export const MAC_RECONNECTING_RETRY_ERROR =
  "The selected Mac is reconnecting. Try again in a few seconds.";

/** Queueable work is held until the Mac checks in again. */
export const MAC_RECONNECTING_QUEUED_ERROR =
  "The selected Mac is reconnecting. Your task will send when it checks in.";

export type AgentWitchDispatchErrorCode =
  (typeof AGENT_WITCH_DISPATCH_ERROR_CODES)[keyof typeof AGENT_WITCH_DISPATCH_ERROR_CODES];
