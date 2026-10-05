import type {
  Pitfall,
  PitfallCheckKind,
  PitfallSeverity,
  PitfallSource,
} from "../../public-api/types";

export interface PitfallDbRow {
  readonly project_id: string;
  readonly id: string;
  readonly symptom: string;
  readonly cause: string;
  readonly avoidance: string;
  readonly check_kind: string;
  readonly check_value: string;
  readonly keywords_json: string;
  readonly tags_json: string;
  readonly source: string;
  readonly hit_count: number;
  readonly last_seen_at: string | null;
  readonly severity: string;
}

const parseStringArray = (json: string): readonly string[] => {
  const parsed: unknown = JSON.parse(json);
  if (!Array.isArray(parsed)) {
    return [];
  }
  return parsed.filter((item): item is string => typeof item === "string");
};

export const projectIdFromDb = (projectId: string): string | null =>
  projectId === "" ? null : projectId;

export const projectIdToDb = (projectId: string | null | undefined): string =>
  projectId === null || projectId === undefined ? "" : projectId;

export const mapPitfallDbRow = (row: PitfallDbRow): Pitfall => ({
  id: row.id,
  projectId: projectIdFromDb(row.project_id),
  symptom: row.symptom,
  cause: row.cause,
  avoidance: row.avoidance,
  check: {
    kind: row.check_kind as PitfallCheckKind,
    value: row.check_value,
  },
  keywords: parseStringArray(row.keywords_json),
  tags: parseStringArray(row.tags_json),
  source: row.source as PitfallSource,
  hitCount: row.hit_count,
  lastSeenAt: row.last_seen_at,
  severity: row.severity as PitfallSeverity,
});
