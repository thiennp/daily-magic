import type { PreflightActionId } from "./preflightAction.constant";
import type { PreflightResultStatus } from "./preflightStatus.constant";

export type PreflightEvidenceKind =
  | "health"
  | "path"
  | "command"
  | "git"
  | "secret"
  | "other";

export type PreflightEvidence = {
  readonly kind: PreflightEvidenceKind;
  readonly summary: string;
  readonly fingerprint?: string;
};

/** One check outcome. Never put secret values in reason/fix/evidence. */
export type PreflightCheckResult = {
  readonly status: PreflightResultStatus;
  readonly checkId: string;
  readonly name: string;
  readonly reason: string;
  readonly fix: string;
  readonly rerunHint: string;
  readonly evidence: readonly PreflightEvidence[];
  readonly actionId: PreflightActionId;
};

export type PreflightRunResult = {
  readonly status: PreflightResultStatus;
  readonly results: readonly PreflightCheckResult[];
};

/** Resolved check to run (catalog or pitfall-fed). */
export type ResolvedPreflightCheck = {
  readonly checkId: string;
  readonly name: string;
  readonly defaultClass: "block" | "warn";
  readonly intent: string;
  readonly fix: string;
  readonly rerunHint: string;
  readonly pitfallId: string | null;
};
