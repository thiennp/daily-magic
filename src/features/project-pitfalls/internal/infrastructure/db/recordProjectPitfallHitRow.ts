import type {
  ProjectPitfallHitInput,
  ProjectPitfallHitRecord,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { ensureProjectPitfallsSchema } from "@/features/project-pitfalls/internal/infrastructure/db/ensureProjectPitfallsSchema";
import { mapProjectPitfallHitRow } from "@/features/project-pitfalls/internal/infrastructure/db/mapProjectPitfallRow";
import { asRowArray, getSql } from "@/lib/db";

/** Per-project counter (seed rows stay read-only); lastSeenAt only moves forward. */
export const recordProjectPitfallHitRow = async (input: {
  readonly projectId: string;
  readonly pitfallId: string;
  readonly hit: ProjectPitfallHitInput;
}): Promise<ProjectPitfallHitRecord> => {
  await ensureProjectPitfallsSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_pitfall_hits (project_id, pitfall_id, hit_count,
        last_seen_at)
      VALUES (${input.projectId}, ${input.pitfallId}, ${input.hit.count},
        ${input.hit.seenAt}::timestamptz)
      ON CONFLICT (project_id, pitfall_id) DO UPDATE SET
        hit_count = project_pitfall_hits.hit_count + EXCLUDED.hit_count,
        last_seen_at = GREATEST(project_pitfall_hits.last_seen_at,
          EXCLUDED.last_seen_at)
      RETURNING pitfall_id, hit_count, last_seen_at
    `,
  );
  if (rows.length === 0) {
    throw new Error("project-pitfalls record_hit: no row returned");
  }
  return mapProjectPitfallHitRow(rows[0]);
};
