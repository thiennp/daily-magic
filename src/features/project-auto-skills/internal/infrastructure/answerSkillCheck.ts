import type { SkillCheckAnswer } from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import { canManageAutoSkills } from "@/features/project-auto-skills/internal/infrastructure/canManageAutoSkills";
import {
  getSkillCheckQuestion,
  markSkillCheckDecided,
} from "@/features/project-auto-skills/internal/infrastructure/skillCheckQuestionsDb";
import { publishProjectSkill } from "@/features/project-skill-share/public-api/infrastructure";

export type AnswerSkillCheckResult =
  | { readonly ok: true; readonly newVersion: number | null }
  | {
      readonly ok: false;
      readonly status: 403 | 404 | 409 | 422;
      readonly message: string;
    };

/**
 * The owner (or an allowed member) picks for a skill the judge would improve:
 * "old" keeps it, "new" publishes the better text as the live version, and
 * "both" stores it as a draft version so the next runs can compare the two.
 */
export const answerSkillCheck = async (input: {
  readonly projectId: string;
  readonly checkId: number;
  readonly actorUserId: string;
  readonly answer: SkillCheckAnswer;
}): Promise<AnswerSkillCheckResult> => {
  if (!(await canManageAutoSkills(input))) {
    return {
      ok: false,
      status: 403,
      message: "You can't answer skill questions in this project.",
    };
  }
  const question = await getSkillCheckQuestion(input.projectId, input.checkId);
  if (question === null) {
    return { ok: false, status: 404, message: "Question not found." };
  }
  const published =
    input.answer === "old"
      ? null
      : await publishProjectSkill({
          actorUserId: input.actorUserId,
          args: {
            projectId: input.projectId,
            skillId: question.skillId,
            name: question.skillName,
            body: question.proposedBody,
            kind: "skill",
            asDraft: input.answer === "both",
          },
        });
  if (published !== null && !published.ok) {
    return {
      ok: false,
      status: 422,
      message: published.message ?? published.code,
    };
  }
  const recorded = await markSkillCheckDecided({
    projectId: input.projectId,
    checkId: input.checkId,
    decision: input.answer,
    actorUserId: input.actorUserId,
    newVersion: published?.version ?? null,
  });
  return recorded
    ? { ok: true, newVersion: published?.version ?? null }
    : { ok: false, status: 409, message: "Already answered." };
};
