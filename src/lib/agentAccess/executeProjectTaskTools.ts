import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { createProjectTask } from "@/lib/projects/tasks/createProjectTask";
import { listProjectTasks } from "@/lib/projects/tasks/listProjectTasks";
import { updateProjectTask } from "@/lib/projects/tasks/updateProjectTask";

/** create / update / list_project_tasks (DF-024). Null = not ours. */
export const executeProjectTaskTools = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name === "create_project_task") {
    const result = await createProjectTask({
      actorUserId: input.actor.id,
      args: input.args,
    });
    return result.ok
      ? agentAccessTextResult({ ok: true, task: result.task })
      : agentAccessTextResult({ ...result, error: result.code }, true);
  }
  if (input.name === "update_project_task") {
    const result = await updateProjectTask({
      actorUserId: input.actor.id,
      args: input.args,
    });
    return result.ok
      ? agentAccessTextResult({ ok: true, task: result.task })
      : agentAccessTextResult({ ...result, error: result.code }, true);
  }
  if (input.name === "list_project_tasks") {
    const result = await listProjectTasks({
      actorUserId: input.actor.id,
      args: input.args,
    });
    return result.ok
      ? agentAccessTextResult(result)
      : agentAccessTextResult({ ...result, error: result.code }, true);
  }
  return null;
};
