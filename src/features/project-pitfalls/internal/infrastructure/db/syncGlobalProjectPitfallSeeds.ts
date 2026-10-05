import { PROJECT_PITFALL_SEEDS } from "@/features/project-pitfalls/internal/core/projectPitfallSeeds.constant";
import { getSql } from "@/lib/db";

/**
 * Upserts the platform seed templates (project_id NULL) from code. Only seed
 * rows are touched; project overrides live in their own rows. updated_at only
 * moves when content changes, so sync clients see no churn.
 */
export const syncGlobalProjectPitfallSeeds = async (): Promise<void> => {
  const rows = PROJECT_PITFALL_SEEDS.map((seed) => ({
    id: seed.id,
    symptom: seed.symptom,
    cause: seed.cause,
    avoidance: seed.avoidance,
    check_kind: seed.check.kind,
    check_value: seed.check.value,
    keywords: seed.keywords,
    tags: seed.tags,
    severity: seed.severity,
  }));
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
};
