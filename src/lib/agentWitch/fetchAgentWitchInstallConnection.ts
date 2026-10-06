import { parseAgentWitchLocalTooOldRefusal } from "@/lib/agentWitch/parseAgentWitchLocalTooOldRefusal";
import type { AgentWitchLocalTooOldRefusal } from "@/lib/agentWitch/types/AgentWitchLocalTooOldRefusal.type";

export interface AgentWitchInstallConnectionResponse {
  readonly ok: boolean;
  readonly finished?: boolean;
  readonly connectedDeviceCount?: number;
  readonly claimedDeviceCount?: number;
  readonly error?: string;
  /** Set when the server refused Connect (HTTP 409 `agent_witch_local_too_old`). */
  readonly tooOldRefusal?: AgentWitchLocalTooOldRefusal;
}

const parseInstallConnectionResponse = (
  payload: unknown,
): AgentWitchInstallConnectionResponse | null => {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const record = payload as {
    ok?: unknown;
    finished?: unknown;
    connectedDeviceCount?: unknown;
    claimedDeviceCount?: unknown;
    error?: unknown;
  };

  if (record.ok !== true) {
    return {
      ok: false,
      error:
        typeof record.error === "string"
          ? record.error
          : "Could not verify Mac connection.",
    };
  }

  return {
    ok: true,
    finished: record.finished === true,
    connectedDeviceCount:
      typeof record.connectedDeviceCount === "number"
        ? record.connectedDeviceCount
        : 0,
    claimedDeviceCount:
      typeof record.claimedDeviceCount === "number"
        ? record.claimedDeviceCount
        : 0,
  };
};

export const fetchAgentWitchInstallConnection = async (input?: {
  readonly tokenHash?: string | null;
}): Promise<AgentWitchInstallConnectionResponse> => {
  const tokenHash = input?.tokenHash?.trim() ?? "";
  const url =
    tokenHash.length > 0
      ? `/api/agent-witch/install-connection?tokenHash=${encodeURIComponent(tokenHash)}`
      : "/api/agent-witch/install-connection";
  const response = await fetch(url);
  const payload: unknown = await response.json().catch(() => null);
  const tooOldRefusal = parseAgentWitchLocalTooOldRefusal(payload);
  if (tooOldRefusal !== null) {
    return {
      ok: false,
      error: "AgentWitch Local is too old to connect. Download the update.",
      tooOldRefusal,
    };
  }

  const parsed = parseInstallConnectionResponse(payload);

  if (parsed === null) {
    return {
      ok: false,
      error: "Could not verify Mac connection.",
    };
  }

  return parsed;
};
