export const AGENT_RUN_LOST_CONNECTION_REASONS = {
  STALE: "No run heartbeat from your computer — the job was marked stale.",
  DISCONNECT: "Lost connection to the host before the result arrived.",
} as const;

export const formatAgentRunTerminalReasonLine = (
  denialReason?: string | null,
): string => {
  const reason = denialReason?.trim();
  if (!reason) {
    return "";
  }
  if (
    reason === AGENT_RUN_LOST_CONNECTION_REASONS.STALE ||
    reason === AGENT_RUN_LOST_CONNECTION_REASONS.DISCONNECT
  ) {
    return "Lost connection to your computer — this task stopped.";
  }
  return reason;
};
