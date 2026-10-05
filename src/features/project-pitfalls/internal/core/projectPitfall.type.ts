export type {
  ProjectPitfallCheck,
  ProjectPitfallCheckKind,
  ProjectPitfallContent,
  ProjectPitfallSeverity,
  ProjectPitfallSource,
  ProjectPitfallUpsert,
  ProjectPitfallView,
} from "@agent-witch/shared/pitfalls";

import type {
  ProjectPitfallContent,
  ProjectPitfallSource,
  ProjectPitfallUpsert,
} from "@agent-witch/shared/pitfalls";

/** Stored row. projectId null = platform seed template (read-only). */
export interface ProjectPitfallRecord extends ProjectPitfallContent {
  readonly projectId: string | null;
  readonly source: ProjectPitfallSource;
  readonly updatedAt: string | null;
}

export interface ProjectPitfallHitRecord {
  readonly pitfallId: string;
  readonly hitCount: number;
  readonly lastSeenAt: string | null;
}

export interface ProjectPitfallHitInput {
  readonly count: number;
  readonly seenAt: string;
}

/** Local alias for upsert validation result (same as shared wire upsert). */
export type ProjectPitfallUpsertInput = ProjectPitfallUpsert;

export type ProjectPitfallErrorCode =
  | "forbidden"
  | "not_found"
  | "invalid_arguments"
  | "limit_exceeded";

export interface ProjectPitfallFailure {
  readonly ok: false;
  readonly code: ProjectPitfallErrorCode;
  readonly field?: string;
}
