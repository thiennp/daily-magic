import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectSkillComparisonsSchema } from "@/lib/knowledge/skillUses/ensureProjectSkillComparisonsSchema";

/** One actor keeps the version it was served for this long, so a run never switches text. */
const STICKY_MINUTES = 20;

/**
 * While a comparison of this skill runs: the version this actor should read.
 * Same version within the sticky window, else the version served less so far
 * (a tie goes to the old one). Null when nothing is being compared or on any
 * failure, so the caller serves the published version. Never throws.
 */
export const chooseSkillVersionToServe = async (input: {
  readonly projectId: string;
  readonly skillId: string;
  readonly actorUserId: string;
}): Promise<number | null> => {
  try {
    await ensureProjectSkillComparisonsSchema();
    const sql = getSql();
    const [cmp] = asRowArray(
      await sql`
        SELECT id, old_version, new_version FROM project_skill_comparisons
        WHERE project_id = ${input.projectId} AND skill_id = ${input.skillId}
          AND status = 'running'`,
    );
    if (cmp === undefined) return null;
    const [recent] = asRowArray(
      await sql`
        SELECT version FROM project_skill_serves
        WHERE comparison_id = ${Number(cmp.id)} AND actor_user_id = ${input.actorUserId}
          AND served_at > NOW() - make_interval(mins => ${STICKY_MINUTES})
        ORDER BY served_at DESC LIMIT 1`,
    );
    if (recent !== undefined) return Number(recent.version);
    const [counts] = asRowArray(
      await sql`
        SELECT COUNT(*) FILTER (WHERE version = ${Number(cmp.old_version)})::int AS old_serves,
               COUNT(*) FILTER (WHERE version = ${Number(cmp.new_version)})::int AS new_serves
        FROM project_skill_serves WHERE comparison_id = ${Number(cmp.id)}`,
    );
    const version =
      Number(counts?.new_serves ?? 0) < Number(counts?.old_serves ?? 0)
        ? Number(cmp.new_version)
        : Number(cmp.old_version);
    await sql`
      INSERT INTO project_skill_serves (project_id, skill_id, actor_user_id, version, comparison_id)
      VALUES (${input.projectId}, ${input.skillId}, ${input.actorUserId}, ${version}, ${Number(cmp.id)})`;
    return version;
  } catch {
    return null;
  }
};
