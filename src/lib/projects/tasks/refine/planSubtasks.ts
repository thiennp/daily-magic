import {
  decideEffortTier,
  type EffortTier,
} from "@agent-witch/shared/taskRefinement";

import type { SubtaskInput } from "@/lib/projects/tasks/refine/parseRefineArgs";

export type PlannedSubtask = {
  readonly title: string;
  readonly skillId: string | null;
  readonly skillParams: Readonly<Record<string, unknown>>;
  readonly effortTier: EffortTier;
  /** A bot owns it and the skill it needs does not exist yet. */
  readonly blockedOnSkill: boolean;
};

/**
 * Attach the closest existing skill (when the caller named none) and the
 * cheapest plausible tier. A task that must run as a skill but has none is
 * `script` without a skillId: a bot owner blocks on it, a CLI owner makes it.
 */
export const planSubtasks = async (input: {
  readonly subtasks: readonly SubtaskInput[];
  readonly ownerIsBot: boolean;
  readonly matchSkill: (title: string) => Promise<string | null>;
}): Promise<readonly PlannedSubtask[]> =>
  Promise.all(
    input.subtasks.map(async (subtask) => {
      const skillId =
        subtask.skillId ??
        (subtask.needsSkill ? null : await input.matchSkill(subtask.title));
      const effortTier =
        subtask.effortTier ??
        (subtask.needsSkill && skillId === null
          ? "script"
          : decideEffortTier({
              title: subtask.title,
              hasSkillScript: skillId !== null,
            }));
      return {
        title: subtask.title,
        skillId,
        skillParams: subtask.skillParams ?? {},
        effortTier,
        blockedOnSkill:
          input.ownerIsBot && effortTier === "script" && skillId === null,
      };
    }),
  );
