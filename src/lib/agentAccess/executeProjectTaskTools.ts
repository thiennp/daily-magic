import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { createProjectTask } from "@/lib/projects/tasks/createProjectTask";
import { listProjectTasks } from "@/lib/projects/tasks/listProjectTasks";
import { readProjectTaskClientDbError } from "@/lib/projects/tasks/readProjectTaskClientDbError";
import { toBotFacingProjectTask } from "@/lib/projects/tasks/toBotFacingProjectTask";
import { updateProjectTask } from "@/lib/projects/tasks/updateProjectTask";

const TASK_MUTATION_RUNNERS = {
  create_project_task: createProjectTask,
  update_project_task: (input: { actorUserId: string; args: unknown }) =>
    updateProjectTask({
      ...input,
      requireResultSummaryOnDone: true,
      announceBlockedInChat: true,
    }),
} as const;

const isTaskMutationTool = (
  name: string,
): name is keyof typeof TASK_MUTATION_RUNNERS =>
  Object.hasOwn(TASK_MUTATION_RUNNERS, name);

/**
 * create / update / list_project_tasks (DF-024). Null = not ours.
 * Bot-facing task has no createdByUserId (S6). A client-caused DB error
 * (stale FK, CHECK) → tool error code (HTTP 4xx), not a 500 (S7).
 */
export const executeProjectTaskTools = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name === "list_project_tasks") {
    const result = await listProjectTasks({
      actorUserId: input.actor.id,
      args: input.args,
    });
    return result.ok
      ? agentAccessTextResult(result)
      : agentAccessTextResult({ ...result, error: result.code }, true);
  }
  if (!isTaskMutationTool(input.name)) return null;
  try {
    const result = await TASK_MUTATION_RUNNERS[input.name]({
      actorUserId: input.actor.id,
      args: input.args,
    });
    return result.ok
      ? agentAccessTextResult({
          ok: true,
          task: toBotFacingProjectTask(result.task),
        })
      : agentAccessTextResult({ ...result, error: result.code }, true);
  } catch (error: unknown) {
    const code = readProjectTaskClientDbError(error);
    if (code === null) throw error;
    return agentAccessTextResult({ ok: false, code, error: code }, true);
  }
};
