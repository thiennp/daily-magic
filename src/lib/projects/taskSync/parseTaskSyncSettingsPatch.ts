import type { TaskSyncSettingsPatch } from "@/lib/projects/taskSync/updateTaskSyncSettings";

const isOptional = (v: unknown, type: "boolean" | "string"): boolean =>
  v === undefined || typeof v === type;

/** PUT body: { enabled?, externalTeamId? (string | null), importNew? }. */
export const parseTaskSyncSettingsPatch = (
  body: unknown,
): TaskSyncSettingsPatch | null => {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return null;
  }
  const b = body as Record<string, unknown>;
  const team = b.externalTeamId;
  const teamOk =
    team === undefined ||
    team === null ||
    (typeof team === "string" && team.length > 0 && team.length <= 100);
  if (
    !isOptional(b.enabled, "boolean") ||
    !isOptional(b.importNew, "boolean") ||
    !teamOk
  ) {
    return null;
  }
  return {
    ...(b.enabled !== undefined ? { enabled: b.enabled as boolean } : {}),
    ...(b.importNew !== undefined ? { importNew: b.importNew as boolean } : {}),
    ...(team !== undefined ? { externalTeamId: team as string | null } : {}),
  };
};
