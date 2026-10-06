import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { parseListProjectActivityArgs } from "@/lib/agentAccess/parseAgentAccessProjectAclArgs";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { listProjectActivityEvents } from "@/lib/projects/acl/activity/listProjectActivityEvents";

const readCategory = (args: unknown): string | null => {
  const value =
    args !== null && typeof args === "object"
      ? (args as { category?: unknown }).category
      : undefined;
  return typeof value === "string" ? value : null;
};

/** Owner-only Access log. A member bot (project key) gets owner_only. */
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
  const listed = await listProjectActivityEvents({
    projectId: parsed.projectId,
    actorUserId: input.actor.id,
    since: parsed.since,
    cursor: parsed.cursor,
    limit: parsed.limit,
    category: readCategory(input.args),
  });
  if (!listed.ok) {
    return agentAccessTextResult(
      { ok: false, error: listed.code, code: listed.code },
      true,
    );
  }
  return agentAccessTextResult(listed);
};
