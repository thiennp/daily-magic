import type {
  PROJECT_PITFALL_CHECK_KINDS,
  PROJECT_PITFALL_SEVERITIES,
  PROJECT_PITFALL_SOURCES,
} from "./projectPitfall.constant";

export type ProjectPitfallSeverity =
  (typeof PROJECT_PITFALL_SEVERITIES)[number];

export type ProjectPitfallSource = (typeof PROJECT_PITFALL_SOURCES)[number];

export type ProjectPitfallCheckKind =
  (typeof PROJECT_PITFALL_CHECK_KINDS)[number];

export type ProjectPitfallCheck = {
  readonly kind: ProjectPitfallCheckKind;
  readonly value: string;
};

/** Authored content shared by seeds and project rows (no counters). */
export type ProjectPitfallContent = {
  readonly id: string;
  readonly symptom: string;
  readonly cause: string;
  readonly avoidance: string;
  readonly check: ProjectPitfallCheck;
  readonly keywords: readonly string[];
  readonly tags: readonly string[];
  readonly severity: ProjectPitfallSeverity;
};

/** Merged API / UI wire view. Missing or invalid updatedAt → null. */
export type ProjectPitfallView = ProjectPitfallContent & {
  readonly projectId: string | null;
  readonly source: ProjectPitfallSource;
  readonly overridesSeed: boolean;
  readonly hitCount: number;
  readonly lastSeenAt: string | null;
  readonly updatedAt: string | null;
};

/** Upsert body (collection PUT/POST). Counters are never sent. */
export type ProjectPitfallUpsert = ProjectPitfallContent & {
  readonly source: "project" | "retired";
};

export type ProjectPitfallListResult = {
  readonly items: readonly ProjectPitfallView[];
  readonly syncedAt: string | null;
};
