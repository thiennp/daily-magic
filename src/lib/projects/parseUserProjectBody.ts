import buildDefaultProjectFolderPath from "@/lib/projects/buildDefaultProjectFolderPath";
import { normalizeValidatedProjectFolderPath } from "@/lib/projects/validateProjectFolderPath";

export interface CreateUserProjectInput {
  readonly name: string;
  readonly folderPath: string;
  readonly deviceId?: string | null;
}

export interface UpdateUserProjectInput {
  readonly name?: string;
  readonly folderPath?: string;
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
): string | null => {
  if (value === undefined || value === null) {
    return normalizeValidatedProjectFolderPath(
      buildDefaultProjectFolderPath(projectName),
    );
  }

  if (typeof value !== "string") {
    return null;
  }

  return normalizeValidatedProjectFolderPath(value);
};

export const parseCreateUserProjectBody = (
  body: unknown,
): CreateUserProjectInput | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const name = parseProjectName(record.name);

  if (name === null) {
    return null;
  }

  const folderPath = parseFolderPath(record.folderPath, name);

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
): UpdateUserProjectInput | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const name =
    record.name === undefined ? undefined : parseProjectName(record.name);
  const folderPath =
    record.folderPath === undefined
      ? undefined
      : typeof record.folderPath === "string"
        ? normalizeValidatedProjectFolderPath(record.folderPath)
        : null;

  if (name === null || folderPath === null) {
    return null;
  }

  if (name === undefined && folderPath === undefined) {
    const deviceId = parseOptionalDeviceId(record.deviceId);

    return deviceId === undefined ? null : { deviceId };
  }

  return {
    ...(name !== undefined ? { name } : {}),
    ...(folderPath !== undefined ? { folderPath } : {}),
    ...(parseOptionalDeviceId(record.deviceId) !== undefined
      ? { deviceId: parseOptionalDeviceId(record.deviceId) }
      : {}),
  };
};
