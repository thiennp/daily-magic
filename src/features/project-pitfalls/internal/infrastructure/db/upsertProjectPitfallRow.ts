import type {
  ProjectPitfallRecord,
  ProjectPitfallUpsertInput,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { ensureProjectPitfallsSchema } from "@/features/project-pitfalls/internal/infrastructure/db/ensureProjectPitfallsSchema";
import { mapProjectPitfallRow } from "@/features/project-pitfalls/internal/infrastructure/db/mapProjectPitfallRow";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Writes the project row only (project_id NOT NULL). Upserting a seed id
 * creates or updates the project's override row; global seeds are never touched.
 */
export const upsertProjectPitfallRow = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly pitfall: ProjectPitfallUpsertInput;
}): Promise<ProjectPitfallRecord> => {
  if (input.projectId.trim().length === 0) {
    throw new Error("project-pitfalls upsert: projectId is required");
  }
  await ensureProjectPitfallsSchema();
  const p = input.pitfall;
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_pitfalls (project_id, pitfall_id, symptom, cause,
        avoidance, check_kind, check_value, keywords, tags, source, severity,
        updated_by_user_id)
      VALUES (${input.projectId}, ${p.id}, ${p.symptom}, ${p.cause},
        ${p.avoidance}, ${p.check.kind}, ${p.check.value},
        ${[...p.keywords]}::text[], ${[...p.tags]}::text[], ${p.source},
        ${p.severity}, ${input.actorUserId})
      ON CONFLICT (project_id, pitfall_id) WHERE project_id IS NOT NULL
      DO UPDATE SET symptom = EXCLUDED.symptom, cause = EXCLUDED.cause,
        avoidance = EXCLUDED.avoidance, check_kind = EXCLUDED.check_kind,
        check_value = EXCLUDED.check_value, keywords = EXCLUDED.keywords,
        tags = EXCLUDED.tags, source = EXCLUDED.source,
        severity = EXCLUDED.severity,
        updated_by_user_id = EXCLUDED.updated_by_user_id, updated_at = NOW()
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    throw new Error("project-pitfalls upsert: no row returned");
  }
  return mapProjectPitfallRow(rows[0]);
};
