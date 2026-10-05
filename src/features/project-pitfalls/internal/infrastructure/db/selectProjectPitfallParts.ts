import type {
  ProjectPitfallHitRecord,
  ProjectPitfallRecord,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { ensureProjectPitfallsSchema } from "@/features/project-pitfalls/internal/infrastructure/db/ensureProjectPitfallsSchema";
import {
  mapProjectPitfallHitRow,
  mapProjectPitfallRow,
} from "@/features/project-pitfalls/internal/infrastructure/db/mapProjectPitfallRow";
import { asRowArray, getSql } from "@/lib/db";

export interface ProjectPitfallParts {
  readonly seeds: readonly ProjectPitfallRecord[];
  readonly projectRows: readonly ProjectPitfallRecord[];
  readonly hits: readonly ProjectPitfallHitRecord[];
}

/** Global seed rows + this project's rows (incl. retired) + its hit counters. */
export const selectProjectPitfallParts = async (
  projectId: string,
): Promise<ProjectPitfallParts> => {
  await ensureProjectPitfallsSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT * FROM project_pitfalls
      WHERE project_id IS NULL OR project_id = ${projectId}
    `,
  ).map(mapProjectPitfallRow);
  const hits = asRowArray(
    await sql`
      SELECT pitfall_id, hit_count, last_seen_at FROM project_pitfall_hits
      WHERE project_id = ${projectId}
    `,
  ).map(mapProjectPitfallHitRow);
  return {
    seeds: rows.filter((row) => row.projectId === null),
    projectRows: rows.filter((row) => row.projectId === projectId),
    hits,
  };
};
