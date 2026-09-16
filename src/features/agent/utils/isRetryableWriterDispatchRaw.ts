import { AGENT_WITCH_DISPATCH_ERROR_CODES } from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const isRetryableWriterDispatchRaw = (raw: string): boolean => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || !isRecord(parsed.payload)) {
      return false;
    }

    return (
      parsed.payload.errorCode ===
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING
    );
  } catch {
    return false;
  }
};
