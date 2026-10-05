/**
 * AWL slice `token-saver` — pitfall registry types (local SQLite cache).
 */
export type PitfallSource = "seed" | "project" | "retired";

export type PitfallSeverity = "block" | "warn" | "info";

export type PitfallCheckKind = "command" | "id";

export interface PitfallCheck {
  readonly kind: PitfallCheckKind;
  readonly value: string;
}

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

export interface PitfallBotLine {
  readonly id: string;
  readonly avoidance: string;
}

export const PITFALL_SYMPTOM_MAX_CHARS = 120;
export const PITFALL_CAUSE_MAX_CHARS = 200;
export const PITFALL_AVOIDANCE_MAX_CHARS = 280;
export const PITFALL_MAX_ACTIVE_PER_PROJECT = 64;
export const PITFALL_MATCH_MAX_LINES = 4;
export const PITFALL_MATCH_MAX_TOKENS = 200;
export const TOKEN_SAVER_DB_FILE_NAME = "token-saver.db";
export const PITFALL_SCHEMA_VERSION = 1;

export type CheckContextStatus = "hit" | "miss" | "none";

export interface CheckContextInput {
  readonly cwd?: string;
  readonly message?: string;
  readonly sessionId?: string;
  readonly projectId?: string;
}

export interface CheckContextResult {
  readonly status: CheckContextStatus;
  readonly pitfalls?: readonly PitfallBotLine[];
  readonly promptCreate?: boolean;
  readonly projectId?: string;
}
