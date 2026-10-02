import buildDefaultProjectFolderPath from "@/lib/projects/buildDefaultProjectFolderPath";
import { normalizeValidatedProjectFolderPath } from "@/lib/projects/validateProjectFolderPath";

export const parseOptionalDeviceId = (
  value: unknown,
): string | null | undefined => {
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

export const parseProjectName = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
};

export const parseFolderPath = (
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
