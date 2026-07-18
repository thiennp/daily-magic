export const canRequestAgentWitchWake = (): boolean =>
  typeof window !== "undefined";

export const requestAgentWitchWake = async (
  deviceId: string,
): Promise<boolean> => {
  if (!canRequestAgentWitchWake() || deviceId.trim().length === 0) {
    return false;
  }

  try {
    const response = await fetch(
      `/api/agent-witch/devices/${encodeURIComponent(deviceId)}/restart`,
      {
        method: "POST",
        signal: AbortSignal.timeout(15_000),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
};
