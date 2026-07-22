import {
  readCreatedProject,
  readProjectErrorMessage,
} from "@/features/agent/utils/readProjectApiResponse";
import buildDefaultProjectFolderPath from "@/lib/projects/buildDefaultProjectFolderPath";
import { requestEnsureAgentWitchProjectFolder } from "@/lib/projects/requestEnsureAgentWitchProjectFolder";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export const createUserProjectFromComposer = async (input: {
  readonly name: string;
  readonly folderPath: string;
  readonly deviceId: string;
}): Promise<
  | { readonly ok: true; readonly project: UserProjectRecord }
  | { readonly ok: false; readonly errorMessage: string }
> => {
  const trimmedName = input.name.trim();
  const resolvedFolderPath =
    input.folderPath.trim().length > 0
      ? input.folderPath.trim()
      : buildDefaultProjectFolderPath(trimmedName);

  const response = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: trimmedName,
      folderPath: resolvedFolderPath,
      deviceId: input.deviceId.length > 0 ? input.deviceId : null,
    }),
  });
  const data: unknown = await response.json();

  if (!response.ok) {
    return { ok: false, errorMessage: readProjectErrorMessage(data) };
  }

  const project = readCreatedProject(data);

  if (project === null) {
    return { ok: false, errorMessage: "Could not save project." };
  }

  void requestEnsureAgentWitchProjectFolder({
    projectFolderPath: project.folderPath,
    projectId: project.id,
    projectName: project.name,
  });

  return { ok: true, project };
};
