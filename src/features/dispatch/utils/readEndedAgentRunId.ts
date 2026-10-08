import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const readId = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

const LIVE_RUN_STATUSES = new Set(["running", "pending_approval"]);

/** afae8216: a result frame, or a run record that left running/pending. */
export const readEndedAgentRunId = (
  type: unknown,
  payload: Record<string, unknown>,
): string | null => {
  if (type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT) {
    return readId(payload.agentRunId);
  }
  if (type !== AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD) {
    return null;
  }
  const run = payload.run;
  if (typeof run !== "object" || run === null) {
    return null;
  }
  const record = run as Record<string, unknown>;
  return typeof record.status === "string" &&
    !LIVE_RUN_STATUSES.has(record.status)
    ? readId(record.id)
    : null;
};
