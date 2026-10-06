import { createUserProjectFromComposer } from "@/features/agent/utils/createUserProjectFromComposer";
import {
  buildRepoUrlsPayload,
  type AwcProjectRepoUrlsFieldsValue,
} from "@/features/projects/repoUrls/AwcProjectRepoUrlsFields";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import {
  validateDefaultBranch,
  validateProjectRepoUrls,
} from "@/lib/projects/validateProjectRepoUrls";

export const CREATE_PROJECT_FOLDER_HINT =
  "Leave this empty for the default folder. Change folders later in Agent Witch Live on your computer. RAG and memory are stored under";

interface CreateComposerProjectFromFormFieldsInput {
  readonly name: string;
  readonly folderPath: string;
  readonly deviceId: string;
  readonly repoFields: AwcProjectRepoUrlsFieldsValue;
}

export type CreateComposerProjectFromFormFieldsResult =
  | { readonly ok: true; readonly project: UserProjectRecord }
  | { readonly ok: false; readonly errorMessage: string };

export const createComposerProjectFromFormFields = async (
  input: CreateComposerProjectFromFormFieldsInput,
): Promise<CreateComposerProjectFromFormFieldsResult> => {
  if (input.name.trim().length === 0) {
    return { ok: false, errorMessage: "Enter a project name." };
  }

  const payload = buildRepoUrlsPayload(input.repoFields);
  const urlsCheck = validateProjectRepoUrls(payload.repoUrls);
  if (!urlsCheck.ok) {
    return { ok: false, errorMessage: urlsCheck.error };
  }
  const branchCheck = validateDefaultBranch(payload.defaultBranch);
  if (!branchCheck.ok) {
    return { ok: false, errorMessage: branchCheck.error };
  }

  const result = await createUserProjectFromComposer({
    name: input.name,
    folderPath: input.folderPath,
    deviceId: input.deviceId,
    repoUrls: urlsCheck.repoUrls,
    defaultBranch: branchCheck.defaultBranch,
  });

  if (!result.ok) {
    return { ok: false, errorMessage: result.errorMessage };
  }

  return { ok: true, project: result.project };
};
