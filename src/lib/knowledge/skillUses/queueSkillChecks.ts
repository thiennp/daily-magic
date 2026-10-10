import { asRowArray, getSql } from "@/lib/db";
import { decideSkillCheck } from "@/lib/knowledge/skillUses/decideSkillCheck";
import { ensureProjectSkillChecksSchema } from "@/lib/knowledge/skillUses/ensureProjectSkillChecksSchema";

/**
 * A run ended: for every skill version it used, queue a 'due' check when that
 * version just reached a checkpoint (or failed early). Never throws.
 */
export const queueSkillChecksForRun = async (input: {
  readonly projectId: string;
  readonly taskId: string;
  readonly fence: number;
}): Promise<void> => {
  try {
    await ensureProjectSkillChecksSchema();
    const sql = getSql();
    const used = asRowArray(
      await sql`
        SELECT skill_id, skill_version FROM project_skill_uses
        WHERE project_id = ${input.projectId} AND task_id = ${input.taskId}
          AND fence = ${input.fence}`,
    );
    for (const row of used) {
      const skillId = String(row.skill_id);
      const version = Number(row.skill_version);
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
      if (stats === undefined) continue;
      const usedCount = Number(stats.used_count);
      const trigger = decideSkillCheck({
        usedCount,
        lastCheckedCount: Number(stats.last_checked_count),
        unjudgedFailures: Number(stats.unjudged_failures),
        failureChecks: Number(stats.failure_checks),
      });
      if (trigger === null) continue;
      await sql`
        INSERT INTO project_skill_checks (project_id, skill_id, skill_version,
          uses_at_check, last_use_id, trigger)
        VALUES (${input.projectId}, ${skillId}, ${version}, ${usedCount},
          ${Number(stats.last_use_id)}, ${trigger})
        ON CONFLICT (project_id, skill_id, skill_version, uses_at_check) DO NOTHING`;
    }
  } catch (error: unknown) {
    console.error("skill check queue failed", {
      error: error instanceof Error ? error.message : "queue_failed",
    });
  }
};
