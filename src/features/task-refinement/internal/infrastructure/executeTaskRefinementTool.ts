import type { AgentAccessFeatureToolExecutor } from "@/lib/agentAccess/agentAccessFeatureToolExecutor.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { claimProjectTask } from "@/features/task-refinement/internal/infrastructure/claimProjectTask";
import { listProjectTaskBlockers } from "@/features/task-refinement/internal/infrastructure/listProjectTaskBlockers";
import { releaseProjectTask } from "@/features/task-refinement/internal/infrastructure/releaseProjectTask";
import { splitProjectTask } from "@/features/task-refinement/internal/infrastructure/splitProjectTask";
import { readProjectTaskClientDbError } from "@/lib/projects/tasks/readProjectTaskClientDbError";
import { toBotFacingProjectTask } from "@/lib/projects/tasks/toBotFacingProjectTask";

const RUNNERS = {
  split_project_task: splitProjectTask,
  claim_project_task: claimProjectTask,
  release_project_task: releaseProjectTask,
  list_project_task_blockers: listProjectTaskBlockers,
} as const;

/** Agent-access executor for the four task-refinement tools (null = not ours). */
export const executeTaskRefinementTool: AgentAccessFeatureToolExecutor = async (
  input,
) => {
  if (!Object.hasOwn(RUNNERS, input.name)) return null;
  const run = RUNNERS[input.name as keyof typeof RUNNERS];
  try {
    const result = await run({ actorUserId: input.actor.id, args: input.args });
    if (!result.ok) {
      return agentAccessTextResult({ ...result, error: result.code }, true);
    }
    return agentAccessTextResult(
      "task" in result
        ? { ...result, task: toBotFacingProjectTask(result.task) }
        : result,
    );
  } catch (error: unknown) {
    const code = readProjectTaskClientDbError(error);
    if (code === null) throw error;
    return agentAccessTextResult({ ok: false, code, error: code }, true);
  }
};
