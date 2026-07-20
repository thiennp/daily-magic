export interface AgentWitchInstallConnectionResponse {
  readonly ok: boolean;
  readonly finished?: boolean;
  readonly connectedDeviceCount?: number;
  readonly claimedDeviceCount?: number;
  readonly error?: string;
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

export const fetchAgentWitchInstallConnection =
  async (): Promise<AgentWitchInstallConnectionResponse> => {
    const response = await fetch("/api/agent-witch/install-connection");
    const payload: unknown = await response.json().catch(() => null);
    const parsed = parseInstallConnectionResponse(payload);

    if (parsed === null) {
      return {
        ok: false,
        error: "Could not verify Mac connection.",
      };
    }

    return parsed;
  };
