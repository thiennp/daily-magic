/**
 * AWL slice `token-saver` — pitfall registry + check_context types.
 * Enums/limits align with `@agent-witch/shared/pitfalls` (step 2 / d65e2888).
 * check_context status/types and tip budget come from
 * `@agent-witch/shared/token-saver` (hit|miss|none; ≤~120-token tip).
 */
import type {
  PitfallBotLineInput,
  ProjectPitfallCheck,
  ProjectPitfallCheckKind,
  ProjectPitfallSeverity,
  ProjectPitfallSource,
} from "@agent-witch/shared/pitfalls";
import {
  PROJECT_PITFALL_LIMITS,
  PROJECT_PITFALL_MAX_ACTIVE,
} from "@agent-witch/shared/pitfalls";

export type PitfallSource = ProjectPitfallSource;
export type PitfallSeverity = ProjectPitfallSeverity;
export type PitfallCheckKind = ProjectPitfallCheckKind;
export type PitfallCheck = ProjectPitfallCheck;

export interface Pitfall {
  readonly id: string;
  /** null = global seed row. */
  readonly projectId: string | null;
  readonly symptom: string;
  readonly cause: string;
  readonly avoidance: string;
  readonly check: PitfallCheck;
  readonly keywords: readonly string[];
  readonly tags: readonly string[];
  readonly source: PitfallSource;
  readonly hitCount: number;
  readonly lastSeenAt: string | null;
  readonly severity: PitfallSeverity;
}

export type PitfallListFormat = "full" | "bot";

export interface ListPitfallsInput {
  readonly projectId?: string | null;
  readonly includeRetired?: boolean;
  readonly format?: PitfallListFormat;
}

export interface GetPitfallInput {
  readonly projectId?: string | null;
  readonly id: string;
}

export interface UpsertPitfallInput {
  readonly id: string;
  readonly projectId: string;
  readonly symptom: string;
  readonly cause: string;
  readonly avoidance: string;
  readonly check: PitfallCheck;
  readonly keywords: readonly string[];
  readonly tags?: readonly string[];
  readonly source?: Exclude<PitfallSource, "seed">;
  readonly severity?: PitfallSeverity;
}

export interface RecordPitfallHitInput {
  readonly projectId: string;
  readonly id: string;
  readonly evidence?: string;
  readonly nowIso?: string;
}

export interface MatchPitfallsInput {
  readonly projectId: string;
  readonly text: string;
}

/** Bot row shape owned by `@agent-witch/shared/pitfalls` (`id|avoidance`). */
export type PitfallBotLine = PitfallBotLineInput;

export const PITFALL_SYMPTOM_MAX_CHARS = PROJECT_PITFALL_LIMITS.symptom;
export const PITFALL_CAUSE_MAX_CHARS = PROJECT_PITFALL_LIMITS.cause;
export const PITFALL_AVOIDANCE_MAX_CHARS = PROJECT_PITFALL_LIMITS.avoidance;
export const PITFALL_MAX_ACTIVE_PER_PROJECT = PROJECT_PITFALL_MAX_ACTIVE;
export const TOKEN_SAVER_DB_FILE_NAME = "token-saver.db";
export const PITFALL_SCHEMA_VERSION = 1;

export type {
  CheckContextInput,
  CheckContextPitfallLine,
  CheckContextResult,
  CheckContextStatus,
} from "./checkContext.types";
