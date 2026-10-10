import { pickSkillDescription } from "@/features/project-auto-skills/internal/core/pickSkillDescription";
import type { AutoSkillAnswer } from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import {
  getAutoSkillSuggestion,
  markAutoSkillSuggestionAnswered,
} from "@/features/project-auto-skills/internal/infrastructure/autoSkillsSuggestionsDb";
import { pickAutoSkillId } from "@/features/project-auto-skills/internal/infrastructure/pickAutoSkillId";
import { canManageAutoSkills } from "@/features/project-auto-skills/internal/infrastructure/canManageAutoSkills";
import { publishProjectSkill } from "@/features/project-skill-share/public-api/infrastructure";

export type AnswerAutoSkillResult =
  | { readonly ok: true; readonly skillId: string | null }
  | {
      readonly ok: false;
      readonly status: 403 | 404 | 422;
      readonly message: string;
    };

/**
 * The owner (or a member the owner allows) answers a question. "save" goes through the existing publish path
 * and the skill is published right away; "not_now" keeps
 * asking at the next repeat; "never" remembers the cluster.
 */
export const answerAutoSkillSuggestion = async (input: {
  readonly projectId: string;
  readonly suggestionId: string;
  readonly actorUserId: string;
  readonly answer: AutoSkillAnswer;
}): Promise<AnswerAutoSkillResult> => {
  if (!(await canManageAutoSkills(input))) {
    return {
      ok: false,
      status: 403,
      message: "You can't answer auto skill questions in this project.",
    };
  }
  const suggestion = await getAutoSkillSuggestion(
    input.projectId,
    input.suggestionId,
  );
  if (suggestion === null) {
    return { ok: false, status: 404, message: "Question not found." };
  }
  const base = {
    projectId: input.projectId,
    id: input.suggestionId,
    actorUserId: input.actorUserId,
  };
  if (input.answer !== "save" || suggestion.kind === "script_approval") {
    // A script approval never publishes a skill: save = approved.
    const status =
      input.answer === "never"
        ? "never"
        : input.answer === "save"
          ? "saved"
          : "not_now";
    await markAutoSkillSuggestionAnswered({ ...base, status, skillId: null });
    return { ok: true, skillId: null };
  }
  const skillId = await pickAutoSkillId({
    actorUserId: input.actorUserId,
    projectId: input.projectId,
    name: suggestion.draftName,
    suggestionId: suggestion.id,
    draftBody: suggestion.draftBody,
  });
  const published = await publishProjectSkill({
    actorUserId: input.actorUserId,
    args: {
      projectId: input.projectId,
      skillId,
      name: suggestion.draftName,
      description: pickSkillDescription(suggestion.draftBody, suggestion.title),
      body: suggestion.draftBody,
      kind: suggestion.libraryKind === "playbook" ? "playbook" : "skill",
      // Auto-created skills are live at once; only hand-made ones start as drafts.
      asDraft: false,
    },
  });
  if (!published.ok) {
    return {
      ok: false,
      status: 422,
      message: published.message ?? published.code,
    };
  }
  await markAutoSkillSuggestionAnswered({ ...base, status: "saved", skillId });
  return { ok: true, skillId };
};
