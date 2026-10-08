import type { PitfallDatabase } from "./openPitfallDb";
import { projectIdToDb } from "./mapPitfallRow";

export interface PitfallHitCounters {
  readonly hitCount: number;
  readonly lastSeenAt: string | null;
}

interface PitfallHitDbRow {
  readonly hit_count: number;
  readonly last_seen_at: string | null;
}

/**
 * Atomic bump in `pitfall_hits` (single INSERT ... ON CONFLICT statement).
 * Never touches `pitfalls`, so it cannot create or seed a pitfall row.
 */
export const bumpPitfallHit = (
  db: PitfallDatabase,
  projectId: string | null,
  pitfallId: string,
  nowIso: string,
): PitfallHitCounters => {
  const row = db
    .prepare(
      `INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`,
    )
    .get(
      projectIdToDb(projectId),
      pitfallId,
      nowIso,
    ) as unknown as PitfallHitDbRow;
  return { hitCount: row.hit_count, lastSeenAt: row.last_seen_at };
};

export const selectPitfallHit = (
  db: PitfallDatabase,
  projectId: string | null,
  pitfallId: string,
): PitfallHitCounters => {
  const row = db
    .prepare(
      `SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`,
    )
    .get(projectIdToDb(projectId), pitfallId) as unknown as
    PitfallHitDbRow | undefined;
  return row === undefined
    ? { hitCount: 0, lastSeenAt: null }
    : { hitCount: row.hit_count, lastSeenAt: row.last_seen_at };
};
