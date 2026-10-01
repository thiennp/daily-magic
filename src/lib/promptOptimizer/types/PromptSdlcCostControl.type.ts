/**
 * Prompt Optimizer cost ceilings (cycle-persisted).
 * Product UI binds proposal to targetTokenBudget + estimatedSpendUsd.
 * Snapshot also mirrors proposedTokenBudget as an alias for older UI stubs.
 */

/** Judge → UI proposal shown before Step 4. */
export type PromptSdlcCostProposal = {
  /** Product bind name for the judge-proposed token ceiling. */
  readonly targetTokenBudget: number;
  readonly estimatedSpendUsd: number;
  /** Optional; UI recomputes estimatedSpendUsd when the user edits tokens. */
  readonly rateUsdPer1kTokens?: number | null;
  /** True when values came from a heuristic, not a live judge reply. */
  readonly stub?: boolean;
};

/** UI → API confirm body; becomes Step 4 hard ceiling. */
export type PromptSdlcCostConfirm = {
  readonly confirmedTokenBudget: number;
  readonly confirmedMaxSpendUsd: number;
};

/** Compose / cycle runtime knobs. */
export type PromptSdlcCostControlKnobs = {
  /** Max trials per module (Step 4) and/or classic cycle. */
  readonly maxTrials: number;
  /** Optional $ ceiling hint before confirm. */
  readonly maxSpendUsd: number | null;
  /** Early-stop when scores are flat. */
  readonly earlyStop: boolean;
  /** Flat rounds before early-stop (default stall rounds). */
  readonly earlyStopFlatRounds: number;
};

/** Persisted on the local cycle (`costControls`). */
export type PromptSdlcCostControls = PromptSdlcCostControlKnobs & {
  /** Product bind — judge-proposed token target. */
  readonly targetTokenBudget: number | null;
  readonly estimatedSpendUsd: number | null;
  readonly rateUsdPer1kTokens: number | null;
  readonly proposalStub: boolean;
  readonly confirmedTokenBudget: number | null;
  readonly confirmedMaxSpendUsd: number | null;
  /** User approved/edited the pre-Step4 ceiling. */
  readonly budgetConfirmed: boolean;
  readonly softWarnFired: boolean;
  readonly softWarnMessage: string | null;
  /** Set when hard stop fires (status failed + errorKind budget_exceeded). */
  readonly budgetExceeded: boolean;
};

/** @deprecated Prefer PromptSdlcCostControls — kept for import clarity. */
export type PromptSdlcCostControl = PromptSdlcCostControls;
export default PromptSdlcCostControls;
