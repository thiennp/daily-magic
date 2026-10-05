import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { parseProjectIdArgs } from "@/lib/agentAccess/parseAgentAccessProjectAclArgs";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { getProjectBriefing } from "@/lib/projects/acl/getProjectBriefing";

export const executeProjectAclBriefingTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name !== "get_project_briefing") {
    return null;
  }
  const parsed = parseProjectIdArgs(input.args);
  if (parsed === null) {
    return agentAccessTextResult(
      { ok: false, error: "projectId required.", code: "invalid_arguments" },
      true,
    );
  }
  const result = await getProjectBriefing({
    projectId: parsed.projectId,
    actorUserId: input.actor.id,
  });
  if (!result.ok) {
    return agentAccessTextResult(
      { ok: false, error: result.code, code: result.code },
      true,
    );
  }
  return agentAccessTextResult({ ok: true, ...result.briefing });
};
