import { isString } from "guardz";

import { normalizeValidatedProjectFolderPath } from "@/lib/projects/validateProjectFolderPath";
import { parseOptionalProjectRepoFields } from "@/lib/projects/parseOptionalProjectRepoFields";

export type ParsedAgentWitchDeviceProjectPatchBody =
  | {
      readonly ok: true;
      readonly folderPath: string | null;
      readonly hasRepoUpdate: boolean;
      readonly repoUrls?: readonly string[];
      readonly defaultBranch?: string | null;
    }
  | {
      readonly ok: false;
      readonly status: 400;
      readonly errorMessage: string;
    };

export const parseAgentWitchDeviceProjectPatchBody = (
  body: Record<string, unknown>,
): ParsedAgentWitchDeviceProjectPatchBody => {
  if (
    "folderPath" in body &&
    body.folderPath !== undefined &&
    !isString(body.folderPath)
  ) {
    return {
      ok: false,
      status: 400,
      errorMessage: "folderPath must be a string.",
    };
  }

  const folderPathRaw =
    "folderPath" in body && isString(body.folderPath) ? body.folderPath : null;
  const folderPath =
    folderPathRaw !== null
      ? normalizeValidatedProjectFolderPath(folderPathRaw)
      : null;

  if (folderPathRaw !== null && folderPath === null) {
    return {
      ok: false,
      status: 400,
      errorMessage: "Choose a valid project folder.",
    };
  }

  const repoFields = parseOptionalProjectRepoFields(body);
  if (!repoFields.ok) {
    return {
      ok: false,
      status: 400,
      errorMessage: repoFields.error,
    };
  }

  const hasRepoUpdate =
    repoFields.repoUrls !== undefined || repoFields.defaultBranch !== undefined;

  if (folderPath === null && !hasRepoUpdate) {
    return {
      ok: false,
      status: 400,
      errorMessage:
        "Provide folderPath and/or repoUrls/defaultBranch to update.",
    };
  }

  return {
    ok: true,
    folderPath,
    hasRepoUpdate,
    ...(repoFields.repoUrls !== undefined
      ? { repoUrls: repoFields.repoUrls }
      : {}),
    ...(repoFields.defaultBranch !== undefined
      ? { defaultBranch: repoFields.defaultBranch }
      : {}),
  };
};
