import os from "node:os";
import path from "node:path";

import { ensureAgentWitchProjectFolder } from "../../../../../adapters/projectFolder";
import { isRecord } from "../../../../server/internal/isRecord";

export const ensureAgentWitchProjectFolderFromWakeServer = (
  body: unknown,
):
  | { readonly ok: true; readonly projectFolderPath: string }
  | { readonly ok: false; readonly errorMessage: string } => {
  if (!isRecord(body)) {
    return { ok: false, errorMessage: "Invalid JSON body." };
  }

  const projectFolderPath =
    typeof body.projectFolderPath === "string"
      ? body.projectFolderPath.trim()
      : "";

  if (projectFolderPath.length === 0) {
    return { ok: false, errorMessage: "projectFolderPath is required." };
  }

  // Creates folders and .agent-witch files: only a plain project id, only under the home folder.
  const home = path.resolve(os.homedir());
  const expanded = projectFolderPath.startsWith("~")
    ? path.join(home, projectFolderPath.slice(1))
    : projectFolderPath;
  const resolved = path.resolve(expanded);
  if (resolved !== home && !resolved.startsWith(home + path.sep)) {
    return {
      ok: false,
      errorMessage: "projectFolderPath must be inside your home folder.",
    };
  }
  if (
    typeof body.projectId === "string" &&
    !/^[A-Za-z0-9_-]{1,100}$/.test(body.projectId)
  ) {
    return { ok: false, errorMessage: "Invalid projectId." };
  }

  const result = ensureAgentWitchProjectFolder({
    projectFolderPath,
    ...(typeof body.projectId === "string"
      ? { projectId: body.projectId }
      : {}),
    ...(typeof body.projectName === "string"
      ? { projectName: body.projectName }
      : {}),
  });

  return { ok: true, projectFolderPath: result.layout.projectFolderPath };
};
