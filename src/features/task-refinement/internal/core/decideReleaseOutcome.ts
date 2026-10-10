import {
  escalateEffortTier,
  TASK_BLOCK_CAP,
  TASK_MAX_ATTEMPTS,
  type BlockedOn,
  type EffortTier,
  type VerifySignal,
} from "@agent-witch/shared/taskRefinement";

import type { ProjectTaskClaimOutcome } from "@/lib/projects/tasks/refine/projectTaskClaimQueries";

export type ReleaseDecision = {
  readonly status: "done" | "queued" | "blocked";
  readonly blockedReason: string | null;
  readonly claim: ProjectTaskClaimOutcome;
  /** Done without a verification signal. */
  readonly unverified: boolean;
  /** The caps ran out: a person has to decide. */
  readonly handedToUser: boolean;
};

const claimOutcome = (
  patch: Partial<ProjectTaskClaimOutcome>,
): ProjectTaskClaimOutcome => ({
  attemptsDelta: 0,
  blockCountDelta: 0,
  effortTier: null,
  blockedOn: null,
  verifySignal: null,
  ...patch,
});

/**
 * What giving a claim back means: done needs a verify signal (else flagged
 * unverified); a failure climbs one tier and stops at the attempt cap; a block
 * is counted and stops at the block cap. Past a cap the task goes to a person.
 */
export const decideReleaseOutcome = (input: {
  readonly outcome: "done" | "failed" | "blocked" | "released";
  readonly tier: EffortTier;
  readonly attempts: number;
  readonly blockCount: number;
  readonly blockedOn: BlockedOn | null;
  readonly blockedReason: string | null;
  readonly verifySignal: VerifySignal | null;
}): ReleaseDecision => {
  const base = { blockedReason: null, unverified: false, handedToUser: false };
  if (input.outcome === "done") {
    const verify = input.verifySignal ?? "none";
    return {
      ...base,
      status: "done",
      unverified: verify === "none",
      claim: claimOutcome({ verifySignal: verify }),
    };
  }
  if (input.outcome === "released") {
    return { ...base, status: "queued", claim: claimOutcome({}) };
  }
  if (input.outcome === "failed") {
    const attempts = input.attempts + 1;
    if (attempts >= TASK_MAX_ATTEMPTS) {
      return {
        ...base,
        status: "blocked",
        blockedReason: `Failed ${attempts} times; needs a person`,
        handedToUser: true,
        claim: claimOutcome({ attemptsDelta: 1, blockedOn: "user" }),
      };
    }
    return {
      ...base,
      status: "queued",
      claim: claimOutcome({
        attemptsDelta: 1,
        effortTier: escalateEffortTier(input.tier),
      }),
    };
  }
  const blocks = input.blockCount + 1;
  const handedToUser = blocks > TASK_BLOCK_CAP;
  return {
    ...base,
    status: "blocked",
    handedToUser,
    blockedReason: handedToUser
      ? `${input.blockedReason ?? "Blocked"}; blocked ${blocks} times, needs a person`
      : input.blockedReason,
    claim: claimOutcome({
      blockCountDelta: 1,
      blockedOn: handedToUser ? "user" : (input.blockedOn ?? "user"),
    }),
  };
};
