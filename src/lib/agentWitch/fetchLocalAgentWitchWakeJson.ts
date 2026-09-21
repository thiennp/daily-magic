import {
  AGENT_WITCH_LOCAL_WAKE_PORT,
  AGENT_WITCH_PROD_WAKE_PORT,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";

export const resolveLocalAgentWitchWakeBaseUrl = (): string =>
  resolveLocalAgentWitchWakeBaseUrlForWakePort();

export const resolveLocalAgentWitchWakeBaseUrlForWakePort = (
  wakePort?: number,
): string => {
  if (
    wakePort !== undefined &&
    Number.isInteger(wakePort) &&
    wakePort > 0 &&
    wakePort <= 65_535
  ) {
    return `http://127.0.0.1:${wakePort}`;
  }

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
  init?: RequestInit & { readonly wakePort?: number },
): Promise<
  | { readonly reachable: true; readonly payload: unknown }
  | { readonly reachable: false }
> => {
  const { wakePort, ...requestInit } = init ?? {};

  try {
    const response = await fetch(
      `${resolveLocalAgentWitchWakeBaseUrlForWakePort(wakePort)}${path}`,
      {
        ...requestInit,
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
