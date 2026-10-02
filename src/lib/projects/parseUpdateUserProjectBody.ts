import {
  parseOptionalDeviceId,
  parseProjectName,
} from "@/lib/projects/parseUserProjectBodyParsers";
import type { ParseUpdateUserProjectBodyResult } from "@/lib/projects/parseUpdateUserProjectBodyResult.type";
import type { UpdateUserProjectInput } from "@/lib/projects/parseUserProjectBody";
import { parseOptionalProjectRepoFields } from "@/lib/projects/parseOptionalProjectRepoFields";

const buildUpdateInput = (input: {
  readonly name?: string;
  readonly deviceId?: string | null;
  readonly repoUrls?: readonly string[];
  readonly defaultBranch?: string | null;
}): UpdateUserProjectInput => ({
  ...(input.name !== undefined ? { name: input.name } : {}),
  ...(input.deviceId !== undefined ? { deviceId: input.deviceId } : {}),
  ...(input.repoUrls !== undefined ? { repoUrls: input.repoUrls } : {}),
  ...(input.defaultBranch !== undefined
    ? { defaultBranch: input.defaultBranch }
    : {}),
});

export const parseUpdateUserProjectBody = (
  body: unknown,
): ParseUpdateUserProjectBodyResult => {
  if (typeof body !== "object" || body === null) {
    return { kind: "invalid" };
  }

  const record = body as Record<string, unknown>;

  if (record.folderPath !== undefined) {
    return { kind: "folder_immutable" };
  }

  const name =
    record.name === undefined ? undefined : parseProjectName(record.name);
  const deviceId = parseOptionalDeviceId(record.deviceId);

  if (name === null) {
    return { kind: "invalid" };
  }

  const repoFields = parseOptionalProjectRepoFields(record);
  if (!repoFields.ok) {
    return { kind: "validation_error", errorMessage: repoFields.error };
  }

  if (
    name === undefined &&
    deviceId === undefined &&
    repoFields.repoUrls === undefined &&
    repoFields.defaultBranch === undefined
  ) {
    return { kind: "invalid" };
  }

  return {
    kind: "ok",
    input: buildUpdateInput({
      name,
      deviceId,
      repoUrls: repoFields.repoUrls,
      defaultBranch: repoFields.defaultBranch,
    }),
  };
};
