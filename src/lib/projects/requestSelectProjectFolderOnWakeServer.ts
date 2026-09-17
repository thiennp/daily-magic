import {
  canRequestLocalAgentWitchApi,
  resolveAgentWitchWakeBaseUrlForPage,
} from "@/lib/agentWitch/agentWitchWakePageClient";
import { resolveAgentWitchWakeBaseUrlForPort } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrlForPort";

const PROJECT_FOLDER_PICKER_TIMEOUT_MS = 5 * 60 * 1000;

export type SelectProjectFolderOnWakeResult =
  | { readonly ok: true; readonly folderPath: string }
  | { readonly ok: false; readonly cancelled: true }
  | { readonly ok: false; readonly errorMessage: string };

export const requestSelectProjectFolderOnWakeServer = async (input: {
  readonly projectId: string;
  readonly wakePort?: number | null;
}): Promise<SelectProjectFolderOnWakeResult> => {
  if (!canRequestLocalAgentWitchApi()) {
    return { ok: false, errorMessage: "Browser environment required." };
  }

  const wakeBaseUrl =
    input.wakePort !== undefined && input.wakePort !== null
      ? resolveAgentWitchWakeBaseUrlForPort(input.wakePort)
      : resolveAgentWitchWakeBaseUrlForPage();

  try {
    const response = await fetch(`${wakeBaseUrl}/projects/select-folder`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: input.projectId }),
      signal: AbortSignal.timeout(PROJECT_FOLDER_PICKER_TIMEOUT_MS),
    });

    const data: unknown = await response.json();

    if (
      typeof data === "object" &&
      data !== null &&
      "cancelled" in data &&
      (data as { cancelled: unknown }).cancelled === true
    ) {
      return { ok: false, cancelled: true };
    }

    if (
      response.ok &&
      typeof data === "object" &&
      data !== null &&
      "ok" in data &&
      (data as { ok: boolean }).ok === true &&
      "project" in data &&
      typeof (data as { project: unknown }).project === "object" &&
      (data as { project: { folderPath?: unknown } }).project !== null
    ) {
      const folderPath = (data as { project: { folderPath: string } }).project
        .folderPath;
      if (typeof folderPath === "string" && folderPath.trim().length > 0) {
        return { ok: true, folderPath: folderPath.trim() };
      }
    }

    const errorMessage =
      typeof data === "object" &&
      data !== null &&
      "errorMessage" in data &&
      typeof (data as { errorMessage: unknown }).errorMessage === "string"
        ? (data as { errorMessage: string }).errorMessage
        : "Could not choose a project folder on this Mac.";

    return { ok: false, errorMessage };
  } catch {
    return {
      ok: false,
      errorMessage:
        "Agent Witch Bridge on this Mac is not running. Run install or start the Mac client.",
    };
  }
};
