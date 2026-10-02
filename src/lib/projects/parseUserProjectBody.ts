import {
  parseFolderPath,
  parseOptionalDeviceId,
  parseProjectName,
} from "@/lib/projects/parseUserProjectBodyParsers";
import { parseOptionalProjectRepoFields } from "@/lib/projects/validateProjectRepoUrls";

export type { ParseUpdateUserProjectBodyResult } from "@/lib/projects/parseUpdateUserProjectBodyResult.type";
export { parseUpdateUserProjectBody } from "@/lib/projects/parseUpdateUserProjectBody";

export interface CreateUserProjectInput {
  readonly name: string;
  readonly folderPath: string;
  readonly deviceId?: string | null;
  readonly repoUrls?: readonly string[];
  readonly defaultBranch?: string | null;
}

export interface UpdateUserProjectInput {
  readonly name?: string;
  readonly deviceId?: string | null;
  readonly repoUrls?: readonly string[];
  readonly defaultBranch?: string | null;
}

export const parseCreateUserProjectBody = (
  body: unknown,
  profileEmail: string,
): CreateUserProjectInput | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const name = parseProjectName(record.name);

  if (name === null) {
    return null;
  }

  const folderPath = parseFolderPath(record.folderPath, name, profileEmail);

  if (folderPath === null) {
    return null;
  }

  const repoFields = parseOptionalProjectRepoFields(record);
  if (!repoFields.ok) {
    return null;
  }

  return {
    name,
    folderPath,
    deviceId: parseOptionalDeviceId(record.deviceId),
    ...(repoFields.repoUrls !== undefined
      ? { repoUrls: repoFields.repoUrls }
      : {}),
    ...(repoFields.defaultBranch !== undefined
      ? { defaultBranch: repoFields.defaultBranch }
      : {}),
  };
};
