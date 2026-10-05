import type {
  ProjectPitfallCheckKind,
  ProjectPitfallHitRecord,
  ProjectPitfallRecord,
  ProjectPitfallSeverity,
  ProjectPitfallSource,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";

const toStringList = (value: unknown): readonly string[] =>
  Array.isArray(value) ? value.map((item) => String(item)) : [];

const toIso = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  return value instanceof Date ? value.toISOString() : String(value);
};

export const mapProjectPitfallRow = (
  row: Record<string, unknown>,
): ProjectPitfallRecord => ({
  id: String(row.pitfall_id),
  projectId:
    row.project_id === null || row.project_id === undefined
      ? null
      : String(row.project_id),
  symptom: String(row.symptom),
  cause: String(row.cause),
  avoidance: String(row.avoidance),
  check: {
    kind: String(row.check_kind) as ProjectPitfallCheckKind,
    value: String(row.check_value),
  },
  keywords: toStringList(row.keywords),
  tags: toStringList(row.tags),
  source: String(row.source) as ProjectPitfallSource,
  severity: String(row.severity) as ProjectPitfallSeverity,
  updatedAt: toIso(row.updated_at) ?? "",
});

export const mapProjectPitfallHitRow = (
  row: Record<string, unknown>,
): ProjectPitfallHitRecord => ({
  pitfallId: String(row.pitfall_id),
  hitCount: Number(row.hit_count ?? 0),
  lastSeenAt: toIso(row.last_seen_at),
});
