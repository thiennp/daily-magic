import type { Pitfall } from "../../public-api/types";
import type { PitfallDatabase } from "./openPitfallDb";
import {
  mapPitfallDbRow,
  projectIdToDb,
  type PitfallDbRow,
} from "./mapPitfallRow";

/** Pitfall columns + counters joined from `pitfall_hits` for `hitsProjectId`. */
const SELECT_PITFALLS_WITH_HITS = `
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`;

const asPitfallRows = (rows: unknown): readonly PitfallDbRow[] =>
  rows as readonly PitfallDbRow[];

const asPitfallRow = (row: unknown): PitfallDbRow | null => {
  if (row === undefined || row === null) {
    return null;
  }
  return row as PitfallDbRow;
};

export const selectPitfallsByProjectId = (
  db: PitfallDatabase,
  projectId: string | null,
  hitsProjectId: string | null = projectId,
): readonly Pitfall[] => {
  const rows = asPitfallRows(
    db
      .prepare(SELECT_PITFALLS_WITH_HITS)
      .all(projectIdToDb(hitsProjectId), projectIdToDb(projectId)),
  );
  return rows.map(mapPitfallDbRow);
};

export const selectPitfall = (
  db: PitfallDatabase,
  projectId: string | null,
  id: string,
  hitsProjectId: string | null = projectId,
): Pitfall | null => {
  const row = asPitfallRow(
    db
      .prepare(`${SELECT_PITFALLS_WITH_HITS} AND p.id = ?`)
      .get(projectIdToDb(hitsProjectId), projectIdToDb(projectId), id),
  );
  return row === null ? null : mapPitfallDbRow(row);
};

/** Content-only write: hit counters are never written here (see pitfall_hits). */
export const insertPitfallRow = (
  db: PitfallDatabase,
  pitfall: Pitfall,
): void => {
  db.prepare(
    `INSERT INTO pitfalls (
      project_id, id, symptom, cause, avoidance,
      check_kind, check_value, keywords_json, tags_json,
      source, severity
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(project_id, id) DO UPDATE SET
      symptom = excluded.symptom,
      cause = excluded.cause,
      avoidance = excluded.avoidance,
      check_kind = excluded.check_kind,
      check_value = excluded.check_value,
      keywords_json = excluded.keywords_json,
      tags_json = excluded.tags_json,
      source = excluded.source,
      severity = excluded.severity`,
  ).run(
    projectIdToDb(pitfall.projectId),
    pitfall.id,
    pitfall.symptom,
    pitfall.cause,
    pitfall.avoidance,
    pitfall.check.kind,
    pitfall.check.value,
    JSON.stringify(pitfall.keywords),
    JSON.stringify(pitfall.tags),
    pitfall.source,
    pitfall.severity,
  );
};
