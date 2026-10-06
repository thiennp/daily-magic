import type { AgentWitchCloudApiConfig } from "./agentWitchCloudApi";
import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "./agentWitchDeviceAuth.constant";

export const deleteAgentWitchCloudProject = async (
  config: AgentWitchCloudApiConfig,
  projectId: string,
): Promise<{ readonly ok: boolean; readonly errorMessage: string | null }> => {
  try {
    const response = await fetch(
      `${config.appOrigin}/api/agent-witch/projects/${encodeURIComponent(projectId)}`,
      {
        method: "DELETE",
        headers: {
          [AGENT_WITCH_PAIRING_TOKEN_HEADER]: config.pairingToken,
        },
        signal: AbortSignal.timeout(15_000),
      },
    );

    if (response.ok) {
      return { ok: true, errorMessage: null };
    }

    const body: unknown = await response.json().catch(() => null);
    const message =
      typeof body === "object" &&
      body !== null &&
      typeof (body as { errorMessage?: unknown }).errorMessage === "string"
        ? (body as { errorMessage: string }).errorMessage
        : `Delete failed (${response.status})`;

    return { ok: false, errorMessage: message };
  } catch {
    return {
      ok: false,
      errorMessage: "Could not reach AgentWitch Cloud.",
    };
  }
};
