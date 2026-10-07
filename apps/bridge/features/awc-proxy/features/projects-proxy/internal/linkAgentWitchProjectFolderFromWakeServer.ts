import path from "node:path";

import { readAgentWitchRunConfig } from "@agent-witch/install-runtime-client";
import {
  describeLinkedProjectFolders,
  linkAgentWitchProjectFolder,
  resolveAgentWitchCloudApiConfig,
  type LinkAgentWitchProjectFolderResult,
  type LinkedProjectFoldersStatus,
} from "@agent-witch/live-projects";

import { isRecord } from "../../../../server/internal/isRecord";

/** POST /projects/link-folder — AWC typed-path link (no native dialog). */
export const linkAgentWitchProjectFolderFromWakeServer = async (
  body: unknown,
  link: typeof linkAgentWitchProjectFolder = linkAgentWitchProjectFolder,
): Promise<LinkAgentWitchProjectFolderResult> => {
  if (
    !isRecord(body) ||
    typeof body.projectId !== "string" ||
    typeof body.folderPath !== "string"
  ) {
    return {
      ok: false,
      httpStatus: 400,
      code: "folder_required",
      message: "Send projectId and folderPath.",
    };
  }
  const runConfig = readAgentWitchRunConfig();
  if (runConfig === null) {
    return {
      ok: false,
      httpStatus: 409,
      code: "not_paired",
      message: "Connect this computer to AgentWitch first.",
    };
  }
  return link({
    projectId: body.projectId,
    folderPath: body.folderPath,
    allowOutsideHome: body.allowOutsideHome === true,
    profileDir: path.dirname(runConfig.layout.configPath),
    cloudConfig: resolveAgentWitchCloudApiConfig({
      wsUrl: runConfig.wsUrl,
      pairingToken: runConfig.pairingToken,
    }),
  });
};

/** GET /projects/folders — linked folders on this computer, plain words. */
export const describeAgentWitchProjectFoldersFromWakeServer =
  (): LinkedProjectFoldersStatus => {
    const runConfig = readAgentWitchRunConfig();
    return runConfig === null
      ? {
          summary: "This computer is not connected to AgentWitch yet.",
          folders: [],
        }
      : describeLinkedProjectFolders(path.dirname(runConfig.layout.configPath));
  };
