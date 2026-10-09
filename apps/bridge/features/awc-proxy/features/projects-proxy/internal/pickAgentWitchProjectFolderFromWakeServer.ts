import { pickMacOsFolderDialog } from "@agent-witch/live-projects";

export type PickAgentWitchProjectFolderWakeResult =
  | { readonly ok: true; readonly folderPath: string }
  | { readonly ok: false; readonly cancelled: true }
  | { readonly ok: false; readonly errorMessage: string };

/** Native folder dialog only: returns the chosen path, never links it to a project. */
export const pickAgentWitchProjectFolderFromWakeServer =
  (): PickAgentWitchProjectFolderWakeResult => {
    if (process.platform !== "darwin") {
      return {
        ok: false,
        errorMessage: "Folder picker is only available on macOS.",
      };
    }
    const chosen = pickMacOsFolderDialog("Choose a folder for this project");
    return chosen === null
      ? { ok: false, cancelled: true }
      : { ok: true, folderPath: chosen.replace(/\/+$/, "") || "/" };
  };
