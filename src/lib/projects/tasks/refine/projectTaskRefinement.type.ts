import type {
  BlockedOn,
  EffortTier,
  VerifySignal,
} from "@agent-witch/shared/taskRefinement";

/** Refinement state of one task (meta only). */
export type ProjectTaskRefinement = {
  readonly taskId: string;
  readonly projectId: string;
  readonly parentTaskId: string | null;
  readonly skillId: string | null;
  readonly skillParams: Readonly<Record<string, unknown>>;
  readonly effortTier: EffortTier;
  readonly attempts: number;
  readonly claimedByUserId: string | null;
  readonly claimFence: number;
  readonly leaseExpiresAt: string | null;
  readonly blockedOn: BlockedOn | null;
  readonly blockCount: number;
  readonly verifySignal: VerifySignal | null;
};
