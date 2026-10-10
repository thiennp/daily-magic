import { ensureProjectSkillUsesSchema } from "@/lib/knowledge/skillUses/ensureProjectSkillUsesSchema";
import { ensureProjectSkillComparisonsSchema } from "@/lib/knowledge/skillUses/ensureProjectSkillComparisonsSchema";
import { queueSkillChecksForRun } from "@/lib/knowledge/skillUses/queueSkillChecks";
import { getSql } from "@/lib/db";

/** A skill fetched this recently before a claim counts as used by that run. */
const LOOKUP_WINDOW_MINUTES = 20;

/**
 * An assistant claimed a task: note the published version of the skill the
 * task carries and of every skill the assistant fetched just before. Never throws.
 */
export const recordSkillUsesOnClaim = async (input: {
  readonly projectId: string;
  readonly taskId: string;
  readonly fence: number;
  readonly actorUserId: string;
  readonly assignedSkillId: string | null;
}): Promise<void> => {
  try {
    await ensureProjectSkillUsesSchema();
    await ensureProjectSkillComparisonsSchema();
    await getSql()`
      INSERT INTO project_skill_uses (project_id, skill_id, skill_version, task_id, fence, source)
      SELECT ${input.projectId}, ps.skill_id,
             COALESCE((
               SELECT s.version FROM project_skill_serves s
               WHERE s.project_id = ${input.projectId} AND s.skill_id = ps.skill_id
                 AND s.actor_user_id = ${input.actorUserId}
                 AND s.served_at > NOW() - make_interval(mins => ${LOOKUP_WINDOW_MINUTES})
               ORDER BY s.served_at DESC LIMIT 1), ps.published_version),
             ${input.taskId},
             ${input.fence}, MIN(found.source)
      FROM (
        SELECT ${input.assignedSkillId}::text AS skill_id, 'assigned' AS source
        UNION ALL
        SELECT l.skill_id, 'lookup'
        FROM project_skill_lookup_log l
        WHERE l.project_id = ${input.projectId}
          AND l.actor_user_id = ${input.actorUserId}
          AND l.tool = 'get' AND l.skill_id IS NOT NULL
          AND l.created_at > NOW() - make_interval(mins => ${LOOKUP_WINDOW_MINUTES})
      ) found
      JOIN project_skills ps
        ON ps.project_id = ${input.projectId} AND ps.skill_id = found.skill_id
       AND ps.state = 'published' AND ps.published_version IS NOT NULL
      GROUP BY ps.skill_id, ps.published_version
      ON CONFLICT (task_id, fence, skill_id) DO NOTHING`;
  } catch (error: unknown) {
    console.error("skill use claim record failed", {
      error: error instanceof Error ? error.message : "record_failed",
    });
  }
};

/** The run ended: store its outcome on every skill it used. Never throws. */
export const recordSkillUsesOnRelease = async (input: {
  readonly projectId: string;
  readonly taskId: string;
  readonly fence: number;
  readonly outcome: "done" | "failed" | "blocked" | "released";
  readonly fingerprint: string | null;
}): Promise<void> => {
  try {
    await ensureProjectSkillUsesSchema();
    await getSql()`
      UPDATE project_skill_uses SET outcome = ${input.outcome},
        reason_fingerprint = ${input.fingerprint}, released_at = NOW()
      WHERE project_id = ${input.projectId} AND task_id = ${input.taskId}
        AND fence = ${input.fence}`;
    await queueSkillChecksForRun(input);
  } catch (error: unknown) {
    console.error("skill use release record failed", {
      error: error instanceof Error ? error.message : "record_failed",
    });
  }
};
