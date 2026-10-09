import { buildProjectSkillLookupLogEntry } from "@/features/project-skill-share/internal/core/buildProjectSkillLookupLogEntry";
import { recordProjectSkillLookup } from "@/features/project-skill-share/internal/infrastructure/db/recordProjectSkillLookup";
import { PROJECT_SKILL_SHARE_TOOL_HANDLERS } from "@/features/project-skill-share/internal/infrastructure/mcp/projectSkillShareToolHandlers.constant";
import type { AgentAccessFeatureToolExecutor } from "@/lib/agentAccess/agentAccessFeatureToolExecutor.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";

/**
 * Agent-access executor for the four project skill tools. Auth (agent-access
 * Bearer or awc_proj_ + projectId match) already ran in executeAgentAccessTool.
 */
export const executeProjectSkillShareTool: AgentAccessFeatureToolExecutor =
  async (input) => {
    const handler = PROJECT_SKILL_SHARE_TOOL_HANDLERS.get(input.name);
    if (handler === undefined) {
      return null;
    }
    const result = await handler({
      actorUserId: input.actor.id,
      args: input.args,
    });
    if (!result.ok) {
      return agentAccessTextResult(
        {
          ok: false,
          error: result.code,
          code: result.code,
          ...(result.message === undefined ? {} : { message: result.message }),
        },
        true,
      );
    }
    const entry = buildProjectSkillLookupLogEntry({
      tool: input.name,
      args: input.args,
      result,
    });
    if (entry !== null) {
      await recordProjectSkillLookup({ actorUserId: input.actor.id, entry });
    }
    return agentAccessTextResult(result);
  };
