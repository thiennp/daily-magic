import { fingerprintFailureReason } from "@/lib/knowledge/bots/fingerprintFailureReason";
import {
  recordSkillUsesOnClaim,
  recordSkillUsesOnRelease,
} from "@/lib/knowledge/skillUses/recordSkillUses";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";
import { loadProjectTaskRefinement } from "@/lib/projects/tasks/refine/projectTaskRefinementQueries";

/** Runs that change a task's status directly (no claim) use this fence. */
const DIRECT_RUN_FENCE = 0;

type DirectOutcome = "done" | "blocked" | "released";

const outcomeOf = (status: ProjectTaskStatus): DirectOutcome | null =>
  status === "done"
    ? "done"
    : status === "blocked"
      ? "blocked"
      : status === "cancelled"
        ? "released"
        : null;

/**
 * A task's status changed outside the claim/release flow (a person, or an
 * agent updating the task directly): start = the skills it was given or
 * fetched just before; finish = the outcome, which also queues skill checks.
 * Claimed tasks are recorded by the claim flow, so they are skipped. Never throws.
 */
export const recordSkillUsesOnTaskStatus = async (input: {
  readonly projectId: string;
  readonly taskId: string;
  readonly actorUserId: string;
  readonly before: ProjectTaskStatus;
  readonly after: ProjectTaskStatus;
  readonly blockedReason: string | null;
}): Promise<void> => {
  try {
    if (input.before === input.after) return;
    const refinement = await loadProjectTaskRefinement(input.taskId);
    if ((refinement?.claimFence ?? 0) > 0) return;
    const finished = outcomeOf(input.after);
    if (input.after !== "in_progress" && finished === null) return;
    // A task finished without ever starting still gets its skills noted now.
    await recordSkillUsesOnClaim({
      projectId: input.projectId,
      taskId: input.taskId,
      fence: DIRECT_RUN_FENCE,
      actorUserId: input.actorUserId,
      assignedSkillId: refinement?.skillId ?? null,
    });
    if (finished === null) return;
    await recordSkillUsesOnRelease({
      projectId: input.projectId,
      taskId: input.taskId,
      fence: DIRECT_RUN_FENCE,
      outcome: finished,
      fingerprint:
        finished === "blocked" && input.blockedReason !== null
          ? fingerprintFailureReason(input.blockedReason)
          : null,
    });
  } catch (error: unknown) {
    console.error("skill use task status record failed", {
      error: error instanceof Error ? error.message : "record_failed",
    });
  }
};
