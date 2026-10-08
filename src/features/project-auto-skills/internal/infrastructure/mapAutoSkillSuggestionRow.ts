import type {
  AutoSkillScriptInfo,
  AutoSkillSuggestion,
  AutoSkillSuggestionMatch,
  AutoSkillSuggestionStatus,
} from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";

export const mapAutoSkillSuggestionRow = (
  row: Record<string, unknown>,
): AutoSkillSuggestion => ({
  id: String(row.id),
  clusterId: String(row.cluster_id),
  status: String(row.status) as AutoSkillSuggestionStatus,
  title: String(row.title),
  prompt: String(row.prompt),
  occurrences: Number(row.occurrences),
  moduleLabel: row.module_label == null ? null : String(row.module_label),
  distinctPrompts:
    row.distinct_prompts == null ? null : Number(row.distinct_prompts),
  matches: Array.isArray(row.matches)
    ? (row.matches as AutoSkillSuggestionMatch[])
    : [],
  draftName: String(row.draft_name),
  draftBody: String(row.draft_body),
  judgeLabel: row.judge_label === null ? null : String(row.judge_label),
  skillId: row.skill_id === null ? null : String(row.skill_id),
  kind: row.kind === "script_approval" ? "script_approval" : "skill",
  scriptInfo:
    row.script_info == null ? null : (row.script_info as AutoSkillScriptInfo),
  createdAt: String(row.created_at),
});
