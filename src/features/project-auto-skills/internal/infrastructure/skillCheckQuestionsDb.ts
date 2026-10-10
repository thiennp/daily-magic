import type { SkillCheckQuestion } from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectSkillChecksSchema } from "@/lib/knowledge/skillUses/ensureProjectSkillChecksSchema";

const mapRow = (row: Record<string, unknown>): SkillCheckQuestion => ({
  id: Number(row.id),
  skillId: String(row.skill_id),
  skillName: String(row.name),
  skillVersion: Number(row.skill_version),
  usesAtCheck: Number(row.uses_at_check),
  note: String(row.note),
  proposedBody: String(row.proposed_body),
  createdAt: new Date(String(row.created_at)).toISOString(),
});

/** Newest judged check per skill proposing a better version that nobody answered yet. Empty on any failure. */
export const listSkillCheckQuestions = async (
  projectId: string,
): Promise<readonly SkillCheckQuestion[]> => {
  try {
    await ensureProjectSkillChecksSchema();
    return asRowArray(
      await getSql()`
        SELECT DISTINCT ON (c.skill_id) c.id, c.skill_id, c.skill_version,
               c.uses_at_check, c.note, c.proposed_body, c.created_at, ps.name
        FROM project_skill_checks c
        JOIN project_skills ps ON ps.project_id = c.project_id AND ps.skill_id = c.skill_id
        WHERE c.project_id = ${projectId} AND c.status = 'judged'
          AND c.verdict = 'improve' AND c.decision IS NULL
        ORDER BY c.skill_id, c.created_at DESC
        LIMIT 20`,
    ).map(mapRow);
  } catch {
    return [];
  }
};

export const getSkillCheckQuestion = async (
  projectId: string,
  checkId: number,
): Promise<SkillCheckQuestion | null> =>
  (await listSkillCheckQuestions(projectId)).find((q) => q.id === checkId) ??
  null;

/** Store the owner's pick (it also closes older open questions of the same skill); false when it was already answered. */
export const markSkillCheckDecided = async (input: {
  readonly projectId: string;
  readonly checkId: number;
  readonly decision: "old" | "new" | "both";
  readonly actorUserId: string;
  readonly newVersion: number | null;
}): Promise<boolean> =>
  asRowArray(
    await getSql()`
      UPDATE project_skill_checks SET decision = ${input.decision},
        decided_at = NOW(), decided_by_user_id = ${input.actorUserId},
        new_version = ${input.newVersion}
      WHERE project_id = ${input.projectId} AND status = 'judged'
        AND verdict = 'improve' AND decision IS NULL
        AND skill_id = (
          SELECT skill_id FROM project_skill_checks
          WHERE id = ${input.checkId} AND project_id = ${input.projectId})
      RETURNING id`,
  ).some((row) => Number(row.id) === input.checkId);
