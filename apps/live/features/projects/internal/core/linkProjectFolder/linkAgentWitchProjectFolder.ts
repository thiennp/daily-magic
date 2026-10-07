import type { AgentWitchCloudApiConfig } from "../agentWitchCloudApi";
import { syncProjectHarnessBindingsToCloud } from "../agentWitchCloudApi";
import { ensureAgentWitchProjectFolder } from "../ensureAgentWitchProjectFolder";
import { listLinkedHarnessSetSlugsFromProjectFolder } from "../listLinkedHarnessSetSlugsFromProjectFolder";
import { updateAgentWitchCloudProjectFolder } from "../updateAgentWitchCloudProjectFolder";
import { describeLinkedProjectFolders } from "./describeLinkedProjectFolders";
import { saveLinkedProjectFolder } from "./linkedProjectFoldersFile";
import {
  validateLinkableProjectFolder,
  type LinkableProjectFolderRefusalCode,
} from "./validateLinkableProjectFolder";

export interface LinkAgentWitchProjectFolderInput {
  readonly projectId: string;
  readonly folderPath: string;
  readonly allowOutsideHome?: boolean;
  /** AWL profile dir (dirname of config.json) — where the local link file lives. */
  readonly profileDir: string;
  /** null = this computer is not paired / config unreadable. */
  readonly cloudConfig: AgentWitchCloudApiConfig | null;
  readonly homeDir?: string;
  readonly updateCloudFolder?: typeof updateAgentWitchCloudProjectFolder;
  readonly syncHarnessBindings?: typeof syncProjectHarnessBindingsToCloud;
  readonly now?: () => Date;
}

export type LinkAgentWitchProjectFolderResult =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly projectName: string | null;
      readonly folderPath: string;
      readonly isGitRepo: boolean;
      readonly linkedSetSlugs: readonly string[];
      readonly bindingsSynced: boolean;
      readonly summary: string;
    }
  | {
      readonly ok: false;
      readonly httpStatus: 400 | 409 | 502;
      readonly code:
        | LinkableProjectFolderRefusalCode
        | "project_id_invalid"
        | "not_paired"
        | "cloud_update_failed";
      readonly message: string;
    };

const PROJECT_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;

/**
 * Link a local folder to an AgentWitch project on this computer (the project
 * computer). Reuses the existing contract: AWC `user_projects.folder_path` +
 * device binding (PATCH), the in-folder `.agent-witch/` layout, and harness
 * auto-discovery; adds a local link file so status works offline.
 */
export const linkAgentWitchProjectFolder = async (
  input: LinkAgentWitchProjectFolderInput,
): Promise<LinkAgentWitchProjectFolderResult> => {
  const projectId = input.projectId.trim();
  if (!PROJECT_ID_PATTERN.test(projectId)) {
    return {
      ok: false,
      httpStatus: 400,
      code: "project_id_invalid",
      message: "Pick an AgentWitch project first.",
    };
  }
  const check = validateLinkableProjectFolder({
    folderPath: input.folderPath,
    ...(input.allowOutsideHome !== undefined
      ? { allowOutsideHome: input.allowOutsideHome }
      : {}),
    ...(input.homeDir !== undefined ? { homeDir: input.homeDir } : {}),
  });
  if (!check.ok) {
    return {
      ok: false,
      httpStatus: 400,
      code: check.code,
      message: check.message,
    };
  }
  if (input.cloudConfig === null) {
    return {
      ok: false,
      httpStatus: 409,
      code: "not_paired",
      message: "Connect this computer to AgentWitch first.",
    };
  }
  const updateCloudFolder =
    input.updateCloudFolder ?? updateAgentWitchCloudProjectFolder;
  const cloud = await updateCloudFolder(
    input.cloudConfig,
    projectId,
    check.folderRealPath,
  );
  if (!cloud.ok) {
    return {
      ok: false,
      httpStatus: 502,
      code: "cloud_update_failed",
      message:
        cloud.httpStatus === 404
          ? "AgentWitch could not find that project for your account."
          : "Could not save the folder to AgentWitch. Try again.",
    };
  }

  ensureAgentWitchProjectFolder({
    projectFolderPath: check.folderRealPath,
    projectId,
    ...(cloud.projectName !== null ? { projectName: cloud.projectName } : {}),
  });
  saveLinkedProjectFolder(input.profileDir, {
    projectId,
    projectName: cloud.projectName,
    folderPath: check.folderRealPath,
    isGitRepo: check.isGitRepo,
    linkedAt: (input.now?.() ?? new Date()).toISOString(),
  });

  // Auto-discover harness already linked on disk and sync cloud bindings.
  const linkedSetSlugs = listLinkedHarnessSetSlugsFromProjectFolder(
    check.folderRealPath,
  );
  const syncHarnessBindings =
    input.syncHarnessBindings ?? syncProjectHarnessBindingsToCloud;
  const bindingsSynced = await syncHarnessBindings(
    input.cloudConfig,
    projectId,
    linkedSetSlugs,
  );
  const status = describeLinkedProjectFolders(input.profileDir, input.homeDir);
  const summary =
    status.folders.find((folder) => folder.projectId === projectId)?.summary ??
    status.summary;

  return {
    ok: true,
    projectId,
    projectName: cloud.projectName,
    folderPath: check.folderRealPath,
    isGitRepo: check.isGitRepo,
    linkedSetSlugs,
    bindingsSynced,
    summary,
  };
};
