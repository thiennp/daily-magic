import { readAgentWitchRunConfig } from "@agent-witch/install-runtime-client";
import {
  ensureAgentWitchProjectFolder,
  pickMacOsFolderDialog,
  resolveAgentWitchCloudApiConfig,
  updateAgentWitchCloudProjectFolder,
} from "@agent-witch/live-projects";

import { isRecord } from "../../../../server/internal/isRecord";

export type SelectAgentWitchProjectFolderWakeResult =
  | {
      readonly ok: true;
      readonly project: {
        readonly id: string;
        readonly folderPath: string;
      };
    }
  | { readonly ok: false; readonly cancelled: true }
  | { readonly ok: false; readonly errorMessage: string };

export const parseSelectProjectFolderWakeBody = (
  body: unknown,
): { readonly projectId: string } | null => {
  if (!isRecord(body)) {
    return null;
  }

  const projectId =
    typeof body.projectId === "string" ? body.projectId.trim() : "";

  if (projectId.length === 0) {
    return null;
  }

  return { projectId };
};

export const selectAgentWitchProjectFolderFromWakeServer = async (
  body: unknown,
): Promise<SelectAgentWitchProjectFolderWakeResult> => {
  const parsed = parseSelectProjectFolderWakeBody(body);
  if (parsed === null) {
    return { ok: false, errorMessage: "projectId is required." };
  }

  if (process.platform !== "darwin") {
    return {
      ok: false,
      errorMessage: "Folder picker is only available on macOS.",
    };
  }

  const chosen = pickMacOsFolderDialog(
    "Choose a folder for this Agent Witch project",
  );
  if (chosen === null) {
    return { ok: false, cancelled: true };
  }

  const runConfig = readAgentWitchRunConfig();
  if (runConfig === null) {
    return {
      ok: false,
      errorMessage: "Agent Witch is not configured on this Mac.",
    };
  }

  const cloudConfig = resolveAgentWitchCloudApiConfig({
    wsUrl: runConfig.wsUrl,
    pairingToken: runConfig.pairingToken,
  });

  if (cloudConfig === null) {
    return {
      ok: false,
      errorMessage: "Could not resolve Agent Witch cloud connection.",
    };
  }

  ensureAgentWitchProjectFolder({ projectFolderPath: chosen });

  const updated = await updateAgentWitchCloudProjectFolder(
    cloudConfig,
    parsed.projectId,
    chosen,
  );

  if (!updated) {
    return {
      ok: false,
      errorMessage: "Could not save the folder to Agent Witch Console.",
    };
  }

  return {
    ok: true,
    project: { id: parsed.projectId, folderPath: chosen },
  };
};
