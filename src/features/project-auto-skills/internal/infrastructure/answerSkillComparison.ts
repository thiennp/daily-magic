import type { SkillComparisonAnswer } from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import { canManageAutoSkills } from "@/features/project-auto-skills/internal/infrastructure/canManageAutoSkills";
import { publishProjectSkill } from "@/features/project-skill-share/public-api/infrastructure";
import {
  decideSkillComparison,
  listSkillComparisons,
} from "@/lib/knowledge/skillUses/listSkillComparisons";

export type AnswerSkillComparisonResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly status: 403 | 404 | 409 | 422;
      readonly message: string;
    };

/**
 * The owner (or an allowed member) picks a version after the two ran side by
 * side: "new" promotes the draft to the live version, "old" keeps the live one.
 * Either way the comparison ends and every assistant reads the live version again.
 */
export const answerSkillComparison = async (input: {
  readonly projectId: string;
  readonly comparisonId: number;
  readonly actorUserId: string;
  readonly answer: SkillComparisonAnswer;
}): Promise<AnswerSkillComparisonResult> => {
  if (!(await canManageAutoSkills(input))) {
    return {
      ok: false,
      status: 403,
      message: "You can't answer skill questions in this project.",
    };
  }
  const comparison = (await listSkillComparisons(input.projectId)).find(
    (c) => c.id === input.comparisonId,
  );
  if (comparison === undefined) {
    return { ok: false, status: 404, message: "Comparison not found." };
  }
  if (input.answer === "new") {
    // No body: promote the latest draft version, the one being compared.
    const promoted = await publishProjectSkill({
      actorUserId: input.actorUserId,
      args: {
        projectId: input.projectId,
        skillId: comparison.skillId,
        name: comparison.skillName,
        kind: "skill",
        asDraft: false,
      },
    });
    if (!promoted.ok) {
      return {
        ok: false,
        status: 422,
        message: promoted.message ?? promoted.code,
      };
    }
  }
  const decided = await decideSkillComparison({
    projectId: input.projectId,
    comparisonId: input.comparisonId,
    winner: input.answer,
    actorUserId: input.actorUserId,
  });
  return decided
    ? { ok: true }
    : { ok: false, status: 409, message: "Already answered." };
};
