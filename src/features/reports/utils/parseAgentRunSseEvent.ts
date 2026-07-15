import type AgentRunSseEvent from "@/features/reports/types/AgentRunSseEvent.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const parseAgentRunSseEvent = (raw: string): AgentRunSseEvent | null => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return null;
    }

    const seq = parsed.seq;
    const kind = parsed.kind;
    const payload = parsed.payload;
    const createdAt = parsed.createdAt;

    if (
      typeof seq !== "number" ||
      typeof kind !== "string" ||
      !isRecord(payload) ||
      typeof createdAt !== "string"
    ) {
      return null;
    }

    return { seq, kind, payload, createdAt };
  } catch {
    return null;
  }
};
