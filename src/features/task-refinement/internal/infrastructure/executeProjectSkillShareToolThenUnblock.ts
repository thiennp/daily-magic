import { executeProjectSkillShareTool } from "@/features/project-skill-share/public-api/infrastructure";
import { retryBlockedSkillTasks } from "@/features/task-refinement/internal/infrastructure/retryBlockedSkillTasks";
import type { AgentAccessFeatureToolExecutor } from "@/lib/agentAccess/agentAccessFeatureToolExecutor.type";

/**
 * The skill tools, plus: a successful publish unblocks the tasks that were
 * waiting for a skill (best effort; never changes the publish result).
 */
export const executeProjectSkillShareToolThenUnblock: AgentAccessFeatureToolExecutor =
  async (input) => {
    const result = await executeProjectSkillShareTool(input);
    if (
      result === null ||
      result.isError ||
      input.name !== "publish_project_skill"
    ) {
      return result;
    }
    const projectId = (input.args as { projectId?: unknown } | null)?.projectId;
    if (typeof projectId === "string") {
      try {
        await retryBlockedSkillTasks({
          actorUserId: input.actor.id,
          projectId,
        });
      } catch (error: unknown) {
        console.error("unblock after publish failed", {
          error: error instanceof Error ? error.message : "unblock_failed",
        });
      }
    }
    return result;
  };
