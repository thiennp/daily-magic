import {
  readCreatedProject,
  readProjectErrorMessage,
} from "@/features/agent/utils/readProjectApiResponse";
import { requestEnsureAgentWitchProjectFolder } from "@/lib/projects/requestEnsureAgentWitchProjectFolder";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import {
  validateDefaultBranch,
  validateProjectRepoUrls,
} from "@/lib/projects/validateProjectRepoUrls";

export const createUserProjectFromComposer = async (input: {
  readonly name: string;
  readonly folderPath: string;
  readonly deviceId: string;
  readonly repoUrls?: readonly string[];
  readonly defaultBranch?: string | null;
}): Promise<
  | { readonly ok: true; readonly project: UserProjectRecord }
  | { readonly ok: false; readonly errorMessage: string }
> => {
  const trimmedName = input.name.trim();
  const trimmedFolderPath = input.folderPath.trim();

  let repoUrlsPayload: readonly string[] | undefined;
  let defaultBranchPayload: string | null | undefined;

  if (input.repoUrls !== undefined) {
    const validated = validateProjectRepoUrls(input.repoUrls);
    if (!validated.ok) {
      return { ok: false, errorMessage: validated.error };
    }
    repoUrlsPayload = validated.repoUrls;
  }

  if (input.defaultBranch !== undefined) {
    const validated = validateDefaultBranch(input.defaultBranch);
    if (!validated.ok) {
      return { ok: false, errorMessage: validated.error };
    }
    defaultBranchPayload = validated.defaultBranch;
  }

  const response = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: trimmedName,
      ...(trimmedFolderPath.length > 0
        ? { folderPath: trimmedFolderPath }
        : {}),
      deviceId: input.deviceId.length > 0 ? input.deviceId : null,
      ...(repoUrlsPayload !== undefined ? { repoUrls: repoUrlsPayload } : {}),
      ...(defaultBranchPayload !== undefined
        ? { defaultBranch: defaultBranchPayload }
        : {}),
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
