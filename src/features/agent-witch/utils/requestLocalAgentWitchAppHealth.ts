import { AGENT_WITCH_LOCAL_APP_HEALTH_URL } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

export const requestLocalAgentWitchAppHealth = async (): Promise<{
  readonly ok: boolean;
  readonly wsConnected?: boolean;
} | null> => {
  try {
    const response = await fetch(AGENT_WITCH_LOCAL_APP_HEALTH_URL, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
    });
    if (!response.ok) {
      return null;
    }
    const body: unknown = await response.json();
    if (typeof body !== "object" || body === null) {
      return { ok: true };
    }
    return {
      ok: true,
      wsConnected:
        "wsConnected" in body
          ? (body as { wsConnected?: unknown }).wsConnected === true
          : undefined,
    };
  } catch {
    return null;
  }
};
