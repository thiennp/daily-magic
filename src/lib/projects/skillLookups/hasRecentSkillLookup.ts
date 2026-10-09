import { asRowArray, getSql } from "@/lib/db";

/**
 * Did this user look the project library up in the last `withinMinutes`?
 * Reads the metadata-only log written by the skill tools. Null when the log
 * cannot be read (no table yet, no database): callers must not warn on null.
 */
export const hasRecentSkillLookup = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly withinMinutes: number;
}): Promise<boolean | null> => {
  try {
    const rows = asRowArray(
      await getSql()`
        SELECT 1 FROM project_skill_lookup_log
        WHERE project_id = ${input.projectId}
          AND actor_user_id = ${input.actorUserId}
          AND tool = 'list'
          AND created_at > NOW() - make_interval(mins => ${input.withinMinutes})
        LIMIT 1
      `,
    );
    return rows.length > 0;
  } catch {
    return null;
  }
};
