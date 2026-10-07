import type { AgentWitchCloudApiConfig } from "./agentWitchCloudApi";
import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "./agentWitchDeviceAuth.constant";

export type UpdateAgentWitchCloudProjectFolderResult =
  | { readonly ok: true; readonly projectName: string | null }
  | { readonly ok: false; readonly httpStatus: number | null };

const readProjectName = (payload: unknown): string | null => {
  const project = (payload as { project?: { name?: unknown } } | null)?.project;
  return typeof project?.name === "string" && project.name.trim().length > 0
    ? project.name.trim()
    : null;
};

/**
 * PATCH the project folder on AWC (device-auth). AWC also binds the project to
 * this device (`user_projects.device_id`), which is what the run-folder
 * allowlist reads back.
 */
export const updateAgentWitchCloudProjectFolder = async (
  config: AgentWitchCloudApiConfig,
  projectId: string,
  folderPath: string,
): Promise<UpdateAgentWitchCloudProjectFolderResult> => {
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
    if (!response.ok) {
      return { ok: false, httpStatus: response.status };
    }
    const payload: unknown = await response.json().catch(() => null);
    return { ok: true, projectName: readProjectName(payload) };
  } catch {
    return { ok: false, httpStatus: null };
  }
};
