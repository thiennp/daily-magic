import {
  isCodingToolsPaused,
} from "@agent-witch/install-runtime-client";
import type { AgentWitchClientConfig } from "@agent-witch/install-runtime-client/types";
import {
  loadRegisteredRunFolders,
  resolveAllowedRunFolder,
  type RunFolderDecision,
} from "@agent-witch/live-projects";
import { LocalCodingToolRefusalCode } from "@agent-witch/shared/dispatch";

export interface AdmitLocalCodingToolRunInput {
  readonly config: AgentWitchClientConfig;
  readonly projectId?: string;
  /** From resolveRunProjectFolderPath; null = the project has no folder. */
  readonly requestedFolderPath: string | null;
  readonly defaultFolderPath: string;
}

export interface AdmitLocalCodingToolRunDeps {
  readonly isPaused: (configPath: string) => boolean;
  readonly loadFolders: typeof loadRegisteredRunFolders;
  readonly resolveFolder: typeof resolveAllowedRunFolder;
}

const defaultDeps: AdmitLocalCodingToolRunDeps = {
  isPaused: isCodingToolsPaused,
  loadFolders: loadRegisteredRunFolders,
  resolveFolder: resolveAllowedRunFolder,
};

/**
 * Gate for every cloud-dispatched local coding tool run, before any folder
 * is created or a writer spawns: S0-7a pause switch, then S0-5 folder
 * allowlist (realpath inside a folder registered for this project + device).
 */
export const admitLocalCodingToolRun = async (
  input: AdmitLocalCodingToolRunInput,
  deps: AdmitLocalCodingToolRunDeps = defaultDeps,
): Promise<RunFolderDecision> => {
  if (deps.isPaused(input.config.layout.configPath)) {
    return { ok: false, code: LocalCodingToolRefusalCode.CODING_TOOLS_PAUSED };
  }
  if (input.requestedFolderPath === null) {
    return { ok: false, code: LocalCodingToolRefusalCode.FOLDER_REQUIRED };
  }
  const registeredFolders = await deps.loadFolders({
    wsUrl: input.config.wsUrl,
    pairingToken: input.config.pairingToken,
  });
  return deps.resolveFolder({
    ...(input.projectId !== undefined ? { projectId: input.projectId } : {}),
    requestedFolderPath: input.requestedFolderPath,
    registeredFolders,
    managedProjectsDir: input.config.layout.projectsDir,
    defaultFolderPath: input.defaultFolderPath,
  });
};

