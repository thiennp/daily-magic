import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { decideProjectMessagePostAccess } from "@/lib/projects/acl/messaging/decideProjectMessagePostAccess";
import {
  dispatchProjectMessage,
  type DispatchProjectMessageResult,
} from "@/lib/projects/acl/messaging/dispatchProjectMessage";

const DEFAULT_HUMAN_DISPATCH_KIND = "task.assign";

const withDefaultKind = (args: Record<string, unknown>): Record<string, unknown> => ({
  ...args,
  kind:
    typeof args.kind === "string" && args.kind.trim().length > 0
      ? args.kind
      : DEFAULT_HUMAN_DISPATCH_KIND,
});

/**
 * Session (web) dispatch for a non-owner human seat (memberKind human).
 * member → same rules as project_dispatch (nickname, caps, recipients);
 * viewer → viewer_read_only; bots and non-members stay forbidden here
 * (bots post via MCP project_dispatch only).
 */
export const dispatchProjectMessageFromHumanMember = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<DispatchProjectMessageResult> => {
  const seat = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (seat === null || seat.memberKind !== "human") {
    return { ok: false, code: "forbidden" };
  }
  const access = decideProjectMessagePostAccess(seat);
  if (!access.ok) {
    return { ok: false, code: access.code };
  }
  if (input.args === null || typeof input.args !== "object") {
    return { ok: false, code: "invalid_arguments" };
  }
  return dispatchProjectMessage({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    args: withDefaultKind(input.args as Record<string, unknown>),
  });
};
