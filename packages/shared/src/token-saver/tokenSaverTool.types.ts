import type { CheckContextStatus } from "./checkContextStatus.constant";

export type CheckContextInput = {
  readonly cwd?: string;
  readonly message?: string;
  readonly sessionId?: string;
  readonly projectId?: string;
};

export type CheckContextPitfallLine = {
  readonly id: string;
  readonly avoidance: string;
};

export type CheckContextResult = {
  readonly status: CheckContextStatus;
  readonly pitfalls?: readonly CheckContextPitfallLine[];
  readonly promptCreate?: boolean;
  readonly projectId?: string;
  /** Optional human tip string (≤~120 tokens) when status is hit. */
  readonly tip?: string;
};

export type GetContextInput = {
  readonly cwd?: string;
  readonly projectId?: string;
};

export type GetContextResult = {
  readonly projectId: string;
  readonly folderPath: string | null;
  readonly flags: import("@agent-witch/shared/projects").ProjectFeatureFlags;
};

export type GetPitfallsInput = {
  readonly projectId?: string;
  readonly q?: string;
  readonly limit?: number;
};

export type GetSkillInput = {
  readonly projectId: string;
  readonly skillId?: string;
  readonly q?: string;
};

export type RecordOutcomeKind = "pitfall" | "preflight" | "other";

export type RecordOutcomeInput = {
  readonly projectId: string;
  readonly kind: RecordOutcomeKind;
  readonly pitfallId?: string;
  readonly preflightId?: string;
  readonly ok: boolean;
  readonly notes?: string;
};

/** Cloud hit body derived from a pitfall record_outcome. */
export type PitfallHitFromOutcome = {
  readonly projectId: string;
  readonly pitfallId: string;
  readonly path: string;
};
