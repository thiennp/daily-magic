export const AGENT_WITCH_WAKE_DEFAULT_PORT = 47892;

export const AGENT_WITCH_WAKE_BASE_URL = `http://127.0.0.1:${AGENT_WITCH_WAKE_DEFAULT_PORT}`;

export const canRequestAgentWitchWake = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const hostname = window.location.hostname;
  return hostname === "localhost" || hostname === "127.0.0.1";
};

export const requestAgentWitchWake = async (): Promise<boolean> => {
  if (!canRequestAgentWitchWake()) {
    return false;
  }

  try {
    const response = await fetch(`${AGENT_WITCH_WAKE_BASE_URL}/wake`, {
      method: "POST",
      mode: "cors",
      signal: AbortSignal.timeout(2_000),
    });
    return response.ok;
  } catch {
    return false;
  }
};
