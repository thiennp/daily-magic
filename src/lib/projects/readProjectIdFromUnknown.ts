const readTrimmed = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

/** Accepts design `project_id` and existing camelCase `projectId`. */
export const readProjectIdFromUnknown = (value: unknown): string | null => {
  if (value === null || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;

  return readTrimmed(record.project_id) ?? readTrimmed(record.projectId);
};
