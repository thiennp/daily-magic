import type {
  AutoSkillSuggestion,
  AutoSkillSuggestionMatch,
  AutoSkillSuggestionStatus,
} from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import { ensureProjectAutoSkillsSchema } from "@/features/project-auto-skills/internal/infrastructure/ensureProjectAutoSkillsSchema";
import { asRowArray, getSql } from "@/lib/db";

export type NewAutoSkillSuggestion = {
  readonly clusterId: string;
  readonly title: string;
  readonly prompt: string;
  readonly occurrences: number;
  readonly moduleLabel?: string | null;
  readonly distinctPrompts?: number | null;
  readonly matches: readonly AutoSkillSuggestionMatch[];
  readonly draftName: string;
  readonly draftBody: string;
  readonly judgeLabel: string | null;
};

const mapRow = (row: Record<string, unknown>): AutoSkillSuggestion => ({
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
  createdAt: String(row.created_at),
});

/**
 * Raise (or re-raise after "Not now") a question. A cluster the owner marked
 * never/saved is left untouched; returns false in that case.
 */
export const upsertAutoSkillSuggestion = async (
  projectId: string,
  s: NewAutoSkillSuggestion,
): Promise<boolean> => {
  await ensureProjectAutoSkillsSchema();
  const rows = asRowArray(
    await getSql()`
      INSERT INTO project_skill_suggestions (project_id, cluster_id, title, prompt,
        occurrences, module_label, distinct_prompts, matches, draft_name, draft_body, judge_label)
      VALUES (${projectId}, ${s.clusterId}, ${s.title}, ${s.prompt}, ${s.occurrences},
        ${s.moduleLabel ?? null}, ${s.distinctPrompts ?? null},
        ${JSON.stringify(s.matches)}::jsonb, ${s.draftName}, ${s.draftBody}, ${s.judgeLabel})
      ON CONFLICT (project_id, cluster_id) DO UPDATE SET status = 'pending',
        title = EXCLUDED.title, prompt = EXCLUDED.prompt,
        occurrences = EXCLUDED.occurrences,
        module_label = EXCLUDED.module_label,
        distinct_prompts = EXCLUDED.distinct_prompts, matches = EXCLUDED.matches,
        draft_name = EXCLUDED.draft_name, draft_body = EXCLUDED.draft_body,
        judge_label = EXCLUDED.judge_label, updated_at = NOW()
      WHERE project_skill_suggestions.status IN ('pending', 'not_now')
      RETURNING id`,
  );
  return rows.length > 0;
};

export const listAutoSkillSuggestions = async (
  projectId: string,
  statuses: readonly AutoSkillSuggestionStatus[],
): Promise<readonly AutoSkillSuggestion[]> => {
  await ensureProjectAutoSkillsSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT * FROM project_skill_suggestions
      WHERE project_id = ${projectId} AND status = ANY(${[...statuses]})
      ORDER BY created_at DESC LIMIT 50`,
  );
  return rows.map(mapRow);
};

export const getAutoSkillSuggestion = async (
  projectId: string,
  id: string,
): Promise<AutoSkillSuggestion | null> => {
  await ensureProjectAutoSkillsSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT * FROM project_skill_suggestions
      WHERE project_id = ${projectId} AND id = ${id}`,
  );
  return rows[0] === undefined ? null : mapRow(rows[0]);
};

export const markAutoSkillSuggestionAnswered = async (input: {
  readonly projectId: string;
  readonly id: string;
  readonly status: Exclude<AutoSkillSuggestionStatus, "pending">;
  readonly skillId: string | null;
  readonly actorUserId: string;
}): Promise<void> => {
  await getSql()`
    UPDATE project_skill_suggestions SET status = ${input.status},
      skill_id = ${input.skillId}, answered_by_user_id = ${input.actorUserId},
      answered_at = NOW(), updated_at = NOW()
    WHERE project_id = ${input.projectId} AND id = ${input.id}`;
};
