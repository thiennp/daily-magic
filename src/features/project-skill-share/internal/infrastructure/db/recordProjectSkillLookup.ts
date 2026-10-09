import type { ProjectSkillLookupLogEntry } from "@/features/project-skill-share/internal/core/buildProjectSkillLookupLogEntry";
import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { getSql } from "@/lib/db";

/** Append one lookup row. Measurement only: a failure here is swallowed. */
export const recordProjectSkillLookup = async (input: {
  readonly actorUserId: string;
  readonly entry: ProjectSkillLookupLogEntry;
}): Promise<void> => {
  try {
    await ensureProjectSkillShareSchema();
    const { entry } = input;
    await getSql()`
      INSERT INTO project_skill_lookup_log (project_id, actor_user_id, tool,
        had_query, query_chars, returned, total, response_tokens, top_ids, skill_id)
      VALUES (${entry.projectId}, ${input.actorUserId}, ${entry.tool},
        ${entry.hadQuery}, ${entry.queryChars}, ${entry.returned}, ${entry.total},
        ${entry.responseTokens}, ${[...entry.topIds]}::text[], ${entry.skillId})
    `;
  } catch {
    // never break a skill tool because the log failed
  }
};
