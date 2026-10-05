import type {
  ProjectPitfallHitRecord,
  ProjectPitfallRecord,
  ProjectPitfallSeverity,
  ProjectPitfallView,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";

const SEVERITY_RANK: Readonly<Record<ProjectPitfallSeverity, number>> = {
  block: 0,
  warn: 1,
  info: 2,
};

const compareViews = (a: ProjectPitfallView, b: ProjectPitfallView): number =>
  SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] ||
  a.id.localeCompare(b.id);

/**
 * Seeds (projectId null) first, then project rows replace a seed with the same
 * id (override). Retired rows are hidden unless includeRetired. Pure.
 */
export const mergeProjectPitfalls = (input: {
  readonly seeds: readonly ProjectPitfallRecord[];
  readonly projectRows: readonly ProjectPitfallRecord[];
  readonly hits: readonly ProjectPitfallHitRecord[];
  readonly includeRetired?: boolean;
}): readonly ProjectPitfallView[] => {
  const seedIds = new Set(input.seeds.map((seed) => seed.id));
  const byId = new Map<string, ProjectPitfallRecord>();
  input.seeds.forEach((seed) => byId.set(seed.id, seed));
  input.projectRows.forEach((row) => byId.set(row.id, row));
  const hitsById = new Map(input.hits.map((hit) => [hit.pitfallId, hit]));
  return [...byId.values()]
    .filter(
      (record) => input.includeRetired === true || record.source !== "retired",
    )
    .map((record) => ({
      ...record,
      overridesSeed: record.projectId !== null && seedIds.has(record.id),
      hitCount: hitsById.get(record.id)?.hitCount ?? 0,
      lastSeenAt: hitsById.get(record.id)?.lastSeenAt ?? null,
    }))
    .sort(compareViews);
};
