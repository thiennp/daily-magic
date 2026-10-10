import { announceProjectTaskBlocked } from "@/lib/projects/tasks/announceProjectTaskBlocked";

/**
 * One chat line per block with a counter, so block → unblock → block again
 * reads as "blocked 3×" instead of three unrelated bubbles.
 */
export const announceRefinedTaskBlocked = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly title: string;
  readonly reason: string;
  readonly blockCount: number;
}): Promise<void> =>
  announceProjectTaskBlocked({
    actorUserId: input.actorUserId,
    projectId: input.projectId,
    title: input.title,
    reason:
      input.blockCount > 1
        ? `${input.reason} (blocked ${input.blockCount}×)`
        : input.reason,
  });
