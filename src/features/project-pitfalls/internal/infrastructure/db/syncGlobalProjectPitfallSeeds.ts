import { PROJECT_PITFALL_SEEDS } from "@/features/project-pitfalls/internal/core/projectPitfallSeeds.constant";
import { toProjectPitfallSqlRows } from "@/features/project-pitfalls/internal/core/toProjectPitfallSqlRows";
import { getSql } from "@/lib/db";

/**
 * Upserts the platform seed templates (project_id NULL) from code, then
 * retires (deletes) any other global seed row, so removed seeds never come
 * back. Only platform-owned rows (project_id NULL, source 'seed') are touched;
 * project rows and overrides live in their own rows. updated_at only moves
 * when content changes, so sync clients see no churn. Idempotent.
 */
export const syncGlobalProjectPitfallSeeds = async (): Promise<void> => {
  const rows = toProjectPitfallSqlRows(PROJECT_PITFALL_SEEDS);
  const seedIds = PROJECT_PITFALL_SEEDS.map((seed) => seed.id);
  const sql = getSql();
  await sql`
    INSERT INTO project_pitfalls (project_id, pitfall_id, symptom, cause,
      avoidance, check_kind, check_value, keywords, tags, source, severity)
    SELECT NULL, s.id, s.symptom, s.cause, s.avoidance, s.check_kind,
      s.check_value, s.keywords, s.tags, 'seed', s.severity
    FROM jsonb_to_recordset(${JSON.stringify(rows)}::jsonb) AS s(
      id text, symptom text, cause text, avoidance text, check_kind text,
      check_value text, keywords text[], tags text[], severity text)
    ON CONFLICT (pitfall_id) WHERE project_id IS NULL DO UPDATE SET
      symptom = EXCLUDED.symptom, cause = EXCLUDED.cause,
      avoidance = EXCLUDED.avoidance, check_kind = EXCLUDED.check_kind,
      check_value = EXCLUDED.check_value, keywords = EXCLUDED.keywords,
      tags = EXCLUDED.tags, severity = EXCLUDED.severity, updated_at = NOW()
    WHERE (project_pitfalls.symptom, project_pitfalls.cause,
      project_pitfalls.avoidance, project_pitfalls.check_kind,
      project_pitfalls.check_value, project_pitfalls.keywords,
      project_pitfalls.tags, project_pitfalls.severity)
      IS DISTINCT FROM (EXCLUDED.symptom, EXCLUDED.cause, EXCLUDED.avoidance,
      EXCLUDED.check_kind, EXCLUDED.check_value, EXCLUDED.keywords,
      EXCLUDED.tags, EXCLUDED.severity)
  `;
  await sql`
    DELETE FROM project_pitfalls
    WHERE project_id IS NULL AND source = 'seed'
      AND NOT (pitfall_id = ANY(${seedIds}::text[]))
  `;
};
