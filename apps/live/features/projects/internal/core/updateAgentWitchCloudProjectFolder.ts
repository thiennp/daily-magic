import type { AgentWitchCloudApiConfig } from "./agentWitchCloudApi";
import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "./agentWitchDeviceAuth.constant";

export const updateAgentWitchCloudProjectFolder = async (
  config: AgentWitchCloudApiConfig,
  projectId: string,
  folderPath: string,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${config.appOrigin}/api/agent-witch/projects/${encodeURIComponent(projectId)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          [AGENT_WITCH_PAIRING_TOKEN_HEADER]: config.pairingToken,
        },
        body: JSON.stringify({ folderPath }),
        signal: AbortSignal.timeout(15_000),
      },
    );

    return response.ok;
  } catch {
    return false;
  }
};
