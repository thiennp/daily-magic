import { PROJECT_PITFALL_AGENTWITCH_PROJECT_ID } from "@agent-witch/shared/pitfalls";

import type { PitfallDatabase } from "./openPitfallDb";

const PITFALL_COLUMNS =
  "id, symptom, cause, avoidance, check_kind, check_value, keywords_json, tags_json";

/**
 * Local twin of cloud migration 099. Seed rows no longer bundled are copied,
 * same id, onto the AgentWitch project (only when this DB already knows that
 * project, and never over an existing row), then the stale seed rows are
 * deleted. Only `project_id = '' AND source = 'seed'` rows are deleted; user
 * rows and `pitfall_hits` are never touched, so hit counts survive. Idempotent.
 */
export const retireStaleLocalSeedPitfalls = (
  db: PitfallDatabase,
  bundledIds: readonly string[],
): number => {
  const keep = bundledIds.map(() => "?").join(", ");
  const stale = `project_id = '' AND source = 'seed'${
    bundledIds.length > 0 ? ` AND id NOT IN (${keep})` : ""
  }`;
  const project = PROJECT_PITFALL_AGENTWITCH_PROJECT_ID;
  db.prepare(
    `INSERT INTO pitfalls (project_id, ${PITFALL_COLUMNS}, source, severity)
     SELECT ?, ${PITFALL_COLUMNS}, 'project', severity
     FROM pitfalls
     WHERE ${stale}
       AND (EXISTS (SELECT 1 FROM pitfalls WHERE project_id = ?)
         OR EXISTS (SELECT 1 FROM pitfall_hits WHERE project_id = ?))
     ON CONFLICT(project_id, id) DO NOTHING`,
  ).run(project, ...bundledIds, project, project);
  const removed = db
    .prepare(`DELETE FROM pitfalls WHERE ${stale}`)
    .run(...bundledIds);
  return Number(removed.changes);
};
