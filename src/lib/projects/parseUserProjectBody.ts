import buildDefaultProjectFolderPath from "@/lib/projects/buildDefaultProjectFolderPath";
import type { ParseUpdateUserProjectBodyResult } from "@/lib/projects/parseUpdateUserProjectBodyResult.type";
import { normalizeValidatedProjectFolderPath } from "@/lib/projects/validateProjectFolderPath";

export interface CreateUserProjectInput {
  readonly name: string;
  readonly folderPath: string;
  readonly deviceId?: string | null;
}

export interface UpdateUserProjectInput {
  readonly name?: string;
  readonly deviceId?: string | null;
}

const parseOptionalDeviceId = (value: unknown): string | null | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
};

const parseProjectName = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
};

const parseFolderPath = (
  value: unknown,
  projectName: string,
  profileEmail: string,
): string | null => {
  if (value === undefined || value === null) {
    return normalizeValidatedProjectFolderPath(
      buildDefaultProjectFolderPath(projectName, profileEmail),
    );
  }

  if (typeof value !== "string") {
    return null;
  }

  return normalizeValidatedProjectFolderPath(value);
};

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

  return {
    name,
    folderPath,
    deviceId: parseOptionalDeviceId(record.deviceId),
  };
};

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

  if (name === undefined && deviceId === undefined) {
    return { kind: "invalid" };
  }

  return {
    kind: "ok",
    input: {
      ...(name !== undefined ? { name } : {}),
      ...(deviceId !== undefined ? { deviceId } : {}),
    },
  };
};
