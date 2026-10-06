import {
  AGENTWITCH_PROJECT_ID,
  AGENTWITCH_PROJECT_PITFALLS,
} from "@/features/project-pitfalls/internal/core/agentWitchProjectPitfalls.constant";
import { toProjectPitfallSqlRows } from "@/features/project-pitfalls/internal/core/toProjectPitfallSqlRows";
import { getSql } from "@/lib/db";

/**
 * Runtime twin of migration 099 (copy half). While a former daily-magic global
 * seed row still exists, copy it as a source='project' row onto the AgentWitch
 * project, so retiring the global never drops it there. Skipped when that
 * project is absent (local / test DBs). ON CONFLICT DO NOTHING keeps any row
 * the project already has (override or retired). Hit counters are per project
 * and keyed by pitfall id, so they carry over unchanged.
 */
export const moveAgentWitchProjectPitfalls = async (): Promise<void> => {
  const rows = toProjectPitfallSqlRows(AGENTWITCH_PROJECT_PITFALLS);
  const sql = getSql();
  await sql`
    INSERT INTO project_pitfalls (project_id, pitfall_id, symptom, cause,
      avoidance, check_kind, check_value, keywords, tags, source, severity)
    SELECT p.id, s.id, s.symptom, s.cause, s.avoidance, s.check_kind,
      s.check_value, s.keywords, s.tags, 'project', s.severity
    FROM jsonb_to_recordset(${JSON.stringify(rows)}::jsonb) AS s(
      id text, symptom text, cause text, avoidance text, check_kind text,
      check_value text, keywords text[], tags text[], severity text)
    INNER JOIN user_projects p ON p.id = ${AGENTWITCH_PROJECT_ID}
    WHERE EXISTS (
      SELECT 1 FROM project_pitfalls g
      WHERE g.project_id IS NULL AND g.pitfall_id = s.id
    )
    ON CONFLICT (project_id, pitfall_id) WHERE project_id IS NOT NULL
    DO NOTHING
  `;
};
