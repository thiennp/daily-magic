import { asRowArray, getSql } from "@/lib/db";
import { decideSkillCheck } from "@/lib/knowledge/skillUses/decideSkillCheck";

/** Queue a 'due' check when this skill version just reached a checkpoint (or failed early). True when one was queued. */
export const queueCheckForSkillVersion = async (input: {
  readonly projectId: string;
  readonly skillId: string;
  readonly version: number;
}): Promise<boolean> => {
  const sql = getSql();
  const { skillId, version } = input;
  const [stats] = asRowArray(
    await sql`
        SELECT
          COUNT(*) FILTER (WHERE u.outcome IS NOT NULL)::int AS used_count,
          COALESCE(MAX(u.id) FILTER (WHERE u.outcome IS NOT NULL), 0)::bigint AS last_use_id,
          COUNT(*) FILTER (
            WHERE u.outcome IN ('failed', 'blocked')
              AND u.id > COALESCE(c.last_use_id, 0))::int AS unjudged_failures,
          COALESCE(c.last_count, 0)::int AS last_checked_count,
          COALESCE(c.failure_checks, 0)::int AS failure_checks
        FROM project_skill_uses u
        LEFT JOIN (
          SELECT MAX(last_use_id) AS last_use_id, MAX(uses_at_check) AS last_count,
                 COUNT(*) FILTER (WHERE trigger = 'failure') AS failure_checks
          FROM project_skill_checks
          WHERE project_id = ${input.projectId} AND skill_id = ${skillId}
            AND skill_version = ${version}
        ) c ON TRUE
        WHERE u.project_id = ${input.projectId} AND u.skill_id = ${skillId}
          AND u.skill_version = ${version}
        GROUP BY c.last_use_id, c.last_count, c.failure_checks`,
  );
  if (stats === undefined) return false;
  const usedCount = Number(stats.used_count);
  const trigger = decideSkillCheck({
    usedCount,
    lastCheckedCount: Number(stats.last_checked_count),
    unjudgedFailures: Number(stats.unjudged_failures),
    failureChecks: Number(stats.failure_checks),
  });
  if (trigger === null) return false;
  const inserted = asRowArray(
    await sql`
      INSERT INTO project_skill_checks (project_id, skill_id, skill_version,
        uses_at_check, last_use_id, trigger)
      VALUES (${input.projectId}, ${skillId}, ${version}, ${usedCount},
        ${Number(stats.last_use_id)}, ${trigger})
      ON CONFLICT (project_id, skill_id, skill_version, uses_at_check) DO NOTHING
      RETURNING id`,
  );
  return inserted.length > 0;
};
