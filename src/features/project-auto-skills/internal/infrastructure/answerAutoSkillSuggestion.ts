import type { AutoSkillAnswer } from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import {
  getAutoSkillSuggestion,
  markAutoSkillSuggestionAnswered,
} from "@/features/project-auto-skills/internal/infrastructure/autoSkillsSuggestionsDb";
import { getAutoSkillsSettingsRow } from "@/features/project-auto-skills/internal/infrastructure/autoSkillsSettingsDb";
import {
  deriveProjectSkillIdFromName,
  listProjectSkills,
  publishProjectSkill,
  resolveProjectSkillMemberRole,
} from "@/features/project-skill-share/public-api/infrastructure";

export type AnswerAutoSkillResult =
  | { readonly ok: true; readonly skillId: string | null }
  | {
      readonly ok: false;
      readonly status: 403 | 404 | 422;
      readonly message: string;
    };

const pickSkillId = async (
  actorUserId: string,
  projectId: string,
  name: string,
  suggestionId: string,
): Promise<string> => {
  const base =
    deriveProjectSkillIdFromName(name) ?? `auto-${suggestionId.slice(0, 8)}`;
  const listed = await listProjectSkills({
    actorUserId,
    args: { projectId },
  });
  const taken = listed.ok && listed.skills.some((s) => s.skillId === base);
  return taken ? `${base}-${suggestionId.slice(0, 4)}` : base;
};

/**
 * Owner answers a question. "save" goes through the existing publish path
 * (Draft by default, or published per the owner setting); "not_now" keeps
 * asking at the next repeat; "never" remembers the cluster.
 */
export const answerAutoSkillSuggestion = async (input: {
  readonly projectId: string;
  readonly suggestionId: string;
  readonly actorUserId: string;
  readonly answer: AutoSkillAnswer;
}): Promise<AnswerAutoSkillResult> => {
  const role = await resolveProjectSkillMemberRole(input);
  if (!role.ok || role.role !== "owner") {
    return {
      ok: false,
      status: 403,
      message: "Only the project owner can answer.",
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
  const settings = await getAutoSkillsSettingsRow(input.projectId);
  const skillId = await pickSkillId(
    input.actorUserId,
    input.projectId,
    suggestion.draftName,
    suggestion.id,
  );
  const published = await publishProjectSkill({
    actorUserId: input.actorUserId,
    args: {
      projectId: input.projectId,
      skillId,
      name: suggestion.draftName,
      description: suggestion.title,
      body: suggestion.draftBody,
      kind: "skill",
      asDraft: settings.publishMode === "draft",
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
