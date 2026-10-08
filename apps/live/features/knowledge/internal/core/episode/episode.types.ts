export type EpisodeKind = "mistake" | "fix" | "decision" | "lesson";

export type EpisodeOutcome =
  "verified" | "unverified" | "failed" | "superseded";

export type KnowledgeTaskClass = "chat" | "code";

export type EpisodeCard = {
  readonly id: string;
  readonly projectKey: string;
  readonly kind: EpisodeKind;
  readonly request: string;
  readonly takeaway: string;
  readonly files: readonly string[];
  readonly commitShas: readonly string[];
  readonly branch: string | null;
  readonly outcome: EpisodeOutcome;
  readonly supersedes: string | null;
  readonly fingerprint: string | null;
  readonly occurrences: number;
  readonly hits: number;
  readonly usefulCount: number;
  readonly ineffectiveCount: number;
  readonly costTokens: number;
  readonly sourceRunId: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly embedModel: string | null;
};

export type EpisodeCardWithVector = EpisodeCard & {
  readonly vector: Float32Array | null;
};

export type EpisodeCardInput = {
  readonly projectKey: string;
  readonly kind: EpisodeKind;
  readonly request: string;
  readonly takeaway: string;
  readonly files?: readonly string[];
  readonly commitShas?: readonly string[];
  readonly branch?: string | null;
  readonly outcome: EpisodeOutcome;
  readonly supersedes?: string | null;
  readonly fingerprint?: string | null;
  readonly costTokens?: number;
  readonly sourceRunId?: string | null;
};

export const EPISODE_TAKEAWAY_MAX_CHARS = 280;
export const EPISODE_REQUEST_MAX_CHARS = 200;
export const EPISODE_MAX_FILES = 12;
export const EPISODE_PROJECT_CARD_CAP = 2_000;
