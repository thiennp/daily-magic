import type { Pitfall } from "../../public-api/types";
import type { PitfallDatabase } from "./openPitfallDb";
import {
  mapPitfallDbRow,
  projectIdToDb,
  type PitfallDbRow,
} from "./mapPitfallRow";

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
): readonly Pitfall[] => {
  const rows = asPitfallRows(
    db
      .prepare("SELECT * FROM pitfalls WHERE project_id = ?")
      .all(projectIdToDb(projectId)),
  );
  return rows.map(mapPitfallDbRow);
};

export const selectPitfall = (
  db: PitfallDatabase,
  projectId: string | null,
  id: string,
): Pitfall | null => {
  const row = asPitfallRow(
    db
      .prepare("SELECT * FROM pitfalls WHERE project_id = ? AND id = ?")
      .get(projectIdToDb(projectId), id),
  );
  return row === null ? null : mapPitfallDbRow(row);
};

export const insertPitfallRow = (
  db: PitfallDatabase,
  pitfall: Pitfall,
): void => {
  db.prepare(
    `INSERT INTO pitfalls (
      project_id, id, symptom, cause, avoidance,
      check_kind, check_value, keywords_json, tags_json,
      source, hit_count, last_seen_at, severity
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(project_id, id) DO UPDATE SET
      symptom = excluded.symptom,
      cause = excluded.cause,
      avoidance = excluded.avoidance,
      check_kind = excluded.check_kind,
      check_value = excluded.check_value,
      keywords_json = excluded.keywords_json,
      tags_json = excluded.tags_json,
      source = excluded.source,
      hit_count = excluded.hit_count,
      last_seen_at = excluded.last_seen_at,
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
    pitfall.hitCount,
    pitfall.lastSeenAt,
    pitfall.severity,
  );
};

export const updatePitfallHit = (
  db: PitfallDatabase,
  projectId: string | null,
  id: string,
  hitCount: number,
  lastSeenAt: string,
): void => {
  db.prepare(
    `UPDATE pitfalls SET hit_count = ?, last_seen_at = ?
     WHERE project_id = ? AND id = ?`,
  ).run(hitCount, lastSeenAt, projectIdToDb(projectId), id);
};
