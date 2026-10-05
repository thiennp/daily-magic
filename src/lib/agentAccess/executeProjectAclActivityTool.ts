import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { parseListProjectActivityArgs } from "@/lib/agentAccess/parseAgentAccessProjectAclArgs";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { listProjectActivity } from "@/lib/projects/acl/listProjectActivity";

export const executeProjectAclActivityTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name !== "list_project_activity") {
    return null;
  }
  const parsed = parseListProjectActivityArgs(input.args);
  if (parsed === null) {
    return agentAccessTextResult(
      { ok: false, error: "projectId required.", code: "invalid_arguments" },
      true,
    );
  }
  const listed = await listProjectActivity({
    projectId: parsed.projectId,
    actorUserId: input.actor.id,
    since: parsed.since,
    cursor: parsed.cursor,
    limit: parsed.limit,
  });
  if (!listed.ok) {
    return agentAccessTextResult(
      { ok: false, error: listed.code, code: listed.code },
      true,
    );
  }
  return agentAccessTextResult({
    ok: true,
    projectId: parsed.projectId,
    events: listed.events,
    nextCursor: listed.nextCursor,
  });
};
