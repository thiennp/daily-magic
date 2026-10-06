import {
  fetchAgentWitchCloudProjects,
  resolveAgentWitchCloudApiConfig,
} from "../agentWitchCloudApi";
import type { RegisteredRunFolder } from "./registeredRunFolder.type";

type FetchProjects = typeof fetchAgentWitchCloudProjects;

const lastGoodByToken = new Map<string, readonly RegisteredRunFolder[]>();

/**
 * Folders the cloud registered for this device (`GET /api/agent-witch/projects`
 * is device-authenticated and filtered to `user_projects.device_id = device`).
 * Falls back to the last good list for this pairing; null when none (fail closed).
 */
export const loadRegisteredRunFolders = async (
  input: { readonly wsUrl: string; readonly pairingToken: string },
  fetchProjects: FetchProjects = fetchAgentWitchCloudProjects,
): Promise<readonly RegisteredRunFolder[] | null> => {
  const cloudConfig = resolveAgentWitchCloudApiConfig(input);
  if (cloudConfig === null) {
    return null;
  }
  const projects = await fetchProjects(cloudConfig);
  if (projects === null) {
    return lastGoodByToken.get(cloudConfig.pairingToken) ?? null;
  }
  const folders = projects.map((project) => ({
    projectId: project.id,
    folderPath: project.folderPath,
  }));
  lastGoodByToken.set(cloudConfig.pairingToken, folders);
  return folders;
};
