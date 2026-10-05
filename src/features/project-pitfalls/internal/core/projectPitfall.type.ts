import type {
  PROJECT_PITFALL_CHECK_KINDS,
  PROJECT_PITFALL_SEVERITIES,
  PROJECT_PITFALL_SOURCES,
} from "@/features/project-pitfalls/internal/core/projectPitfall.constant";

export type ProjectPitfallSeverity =
  (typeof PROJECT_PITFALL_SEVERITIES)[number];

export type ProjectPitfallSource = (typeof PROJECT_PITFALL_SOURCES)[number];

export type ProjectPitfallCheckKind =
  (typeof PROJECT_PITFALL_CHECK_KINDS)[number];

export interface ProjectPitfallCheck {
  readonly kind: ProjectPitfallCheckKind;
  readonly value: string;
}

/** Authored content shared by seed templates and project rows (no counters). */
export interface ProjectPitfallContent {
  readonly id: string;
  readonly symptom: string;
  readonly cause: string;
  readonly avoidance: string;
  readonly check: ProjectPitfallCheck;
  readonly keywords: readonly string[];
  readonly tags: readonly string[];
  readonly severity: ProjectPitfallSeverity;
}

/** Stored row. projectId null = platform seed template (read-only). */
export interface ProjectPitfallRecord extends ProjectPitfallContent {
  readonly projectId: string | null;
  readonly source: ProjectPitfallSource;
  readonly updatedAt: string;
}

export interface ProjectPitfallHitRecord {
  readonly pitfallId: string;
  readonly hitCount: number;
  readonly lastSeenAt: string | null;
}

/** Merged API view: seed or project row plus per-project hit counters. */
export interface ProjectPitfallView extends ProjectPitfallContent {
  readonly projectId: string | null;
  readonly source: ProjectPitfallSource;
  readonly overridesSeed: boolean;
  readonly hitCount: number;
  readonly lastSeenAt: string | null;
  readonly updatedAt: string;
}

/** Upsert payload: full content; source limited to project | retired. */
export interface ProjectPitfallUpsertInput extends ProjectPitfallContent {
  readonly source: "project" | "retired";
}

export interface ProjectPitfallHitInput {
  readonly count: number;
  readonly seenAt: string;
}

export type ProjectPitfallErrorCode =
  "forbidden" | "not_found" | "invalid_arguments" | "limit_exceeded";

export interface ProjectPitfallFailure {
  readonly ok: false;
  readonly code: ProjectPitfallErrorCode;
  readonly field?: string;
}
