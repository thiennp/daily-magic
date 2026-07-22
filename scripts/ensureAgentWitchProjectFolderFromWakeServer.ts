import { ensureAgentWitchProjectFolder } from "./ensureAgentWitchProjectFolder";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

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
