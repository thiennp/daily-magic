import {
  AGENT_WITCH_LOCAL_WAKE_PORT,
  AGENT_WITCH_PROD_WAKE_PORT,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";

export const resolveLocalAgentWitchWakeBaseUrl = (): string => {
  const portFromEnv = process.env.AGENT_WITCH_WAKE_PORT?.trim();
  if (portFromEnv !== undefined && portFromEnv.length > 0) {
    const parsedPort = Number.parseInt(portFromEnv, 10);
    if (Number.isFinite(parsedPort) && parsedPort > 0 && parsedPort <= 65535) {
      return `http://127.0.0.1:${parsedPort}`;
    }
  }

  const useLocalAppPort =
    process.env.VERCEL !== "1" && process.env.NODE_ENV !== "production";

  return `http://127.0.0.1:${useLocalAppPort ? AGENT_WITCH_LOCAL_WAKE_PORT : AGENT_WITCH_PROD_WAKE_PORT}`;
};

export const fetchLocalAgentWitchWakeJson = async (
  path: string,
  init?: RequestInit,
): Promise<
  | { readonly reachable: true; readonly payload: unknown }
  | { readonly reachable: false }
> => {
  try {
    const response = await fetch(
      `${resolveLocalAgentWitchWakeBaseUrl()}${path}`,
      {
        ...init,
        signal: AbortSignal.timeout(2_500),
      },
    );

    if (!response.ok) {
      return { reachable: false };
    }

    return {
      reachable: true,
      payload: await response.json(),
    };
  } catch {
    return { reachable: false };
  }
};
