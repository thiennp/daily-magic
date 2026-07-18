import { AGENT_WITCH_PROD_WAKE_PORT } from "@/lib/agentWitch/resolveAgentWitchAppHome";
import {
  resolveAgentWitchWakeBaseUrlForPage,
  resolveAgentWitchWakePortForPage,
} from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrl";

export const AGENT_WITCH_WAKE_DEFAULT_PORT = AGENT_WITCH_PROD_WAKE_PORT;

export {
  resolveAgentWitchWakeBaseUrlForPage,
  resolveAgentWitchWakePortForPage,
};

/** @deprecated Prefer resolveAgentWitchWakeBaseUrlForPage() */
export const AGENT_WITCH_WAKE_BASE_URL = `http://127.0.0.1:${AGENT_WITCH_PROD_WAKE_PORT}`;

export const canRequestAgentWitchWake = (): boolean =>
  typeof window !== "undefined";

export const requestAgentWitchWake = async (): Promise<boolean> => {
  if (!canRequestAgentWitchWake()) {
    return false;
  }

  try {
    const response = await fetch(
      `${resolveAgentWitchWakeBaseUrlForPage()}/restart`,
      {
        method: "POST",
        mode: "cors",
        signal: AbortSignal.timeout(120_000),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
};
