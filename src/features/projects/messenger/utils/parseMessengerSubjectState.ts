import type { AwcMessengerSubjectStateWire } from "@/features/projects/messenger/types/awcMessengerSubjectStateWire.type";

const SOURCES: ReadonlySet<string> = new Set([
  "deliveries",
  "agent_run",
  "reply_kind",
]);

const isCount = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value >= 0;

/**
 * OW9 `subjectState` (codes only). null = the server says "no subject state";
 * undefined = field absent or unusable (pre-OW9 / browser copy → the client
 * reads live fields instead).
 */
export const parseMessengerSubjectState = (
  value: unknown,
): AwcMessengerSubjectStateWire | null | undefined => {
  if (value === null) return null;
  if (
    typeof value !== "object" ||
    value === undefined ||
    Array.isArray(value)
  ) {
    return undefined;
  }
  const row = value as Record<string, unknown>;
  if (typeof row.source !== "string" || !SOURCES.has(row.source)) {
    return undefined;
  }
  if (typeof row.status !== "string") return undefined;
  return {
    source: row.source as AwcMessengerSubjectStateWire["source"],
    status: row.status,
    ...(isCount(row.done) ? { done: row.done } : {}),
    ...(isCount(row.of) ? { of: row.of } : {}),
    needsYou: row.needsYou === true,
    awaitingApproval: row.awaitingApproval === true,
  };
};
