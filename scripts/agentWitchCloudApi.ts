import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "./agentWitchDeviceAuth.constant";
import { resolveAgentWitchAppOriginFromWsUrl } from "./resolveAgentWitchAppOriginFromWsUrl";

export interface AgentWitchCloudApiConfig {
  readonly appOrigin: string;
  readonly pairingToken: string;
}

export interface ClaimedCloudAgentRun {
  readonly id: string;
  readonly prompt: string;
  readonly writerAgent: string;
}

export const resolveAgentWitchCloudApiConfig = (input: {
  readonly wsUrl: string;
  readonly pairingToken: string;
}): AgentWitchCloudApiConfig | null => {
  const appOrigin = resolveAgentWitchAppOriginFromWsUrl(input.wsUrl);

  if (appOrigin === null || input.pairingToken.trim().length === 0) {
    return null;
  }

  return {
    appOrigin,
    pairingToken: input.pairingToken.trim(),
  };
};

const buildDeviceAuthHeaders = (
  pairingToken: string,
): Record<string, string> => ({
  [AGENT_WITCH_PAIRING_TOKEN_HEADER]: pairingToken,
  "Content-Type": "application/json",
});

export const postAgentWitchDeviceHeartbeat = async (
  config: AgentWitchCloudApiConfig,
  hostname: string,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${config.appOrigin}/api/agent-witch/heartbeat`,
      {
        method: "POST",
        headers: buildDeviceAuthHeaders(config.pairingToken),
        body: JSON.stringify({ hostname }),
        signal: AbortSignal.timeout(10_000),
      },
    );

    return response.ok;
  } catch {
    return false;
  }
};

export const claimAgentRunFromCloud = async (
  config: AgentWitchCloudApiConfig,
): Promise<ClaimedCloudAgentRun | null> => {
  try {
    const response = await fetch(
      `${config.appOrigin}/api/agent-witch/runs/claim`,
      {
        method: "POST",
        headers: buildDeviceAuthHeaders(config.pairingToken),
        signal: AbortSignal.timeout(15_000),
      },
    );

    if (!response.ok) {
      return null;
    }

    const body: unknown = await response.json();
    if (
      typeof body !== "object" ||
      body === null ||
      (body as { run?: unknown }).run === null
    ) {
      return null;
    }

    const run = (body as { run: Record<string, unknown> }).run;
    const id = typeof run.id === "string" ? run.id : "";
    const prompt = typeof run.prompt === "string" ? run.prompt : "";
    const writerAgent =
      typeof run.writerAgent === "string" ? run.writerAgent : "claude-cli";

    if (id.length === 0 || prompt.length === 0) {
      return null;
    }

    return { id, prompt, writerAgent };
  } catch {
    return null;
  }
};

export const completeAgentRunOnCloud = async (
  config: AgentWitchCloudApiConfig,
  runId: string,
  exitCode: number,
  output: string,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${config.appOrigin}/api/agent-witch/runs/${encodeURIComponent(runId)}/complete`,
      {
        method: "POST",
        headers: buildDeviceAuthHeaders(config.pairingToken),
        body: JSON.stringify({ exitCode, output }),
        signal: AbortSignal.timeout(30_000),
      },
    );

    return response.ok;
  } catch {
    return false;
  }
};
