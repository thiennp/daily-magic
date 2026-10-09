import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { denyProjectAccessRequest } from "@/lib/projects/acl/denyProjectAccessRequest";
import { listInviterRequestIds } from "@/lib/projects/acl/listInviterRequestIds";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { resolveOwnerOrActiveHumanSeat } from "@/lib/projects/acl/resolveOwnerOrActiveHumanSeat";

/**
 * A member (not a viewer) approves or denies the join request of an assistant
 * they invited themselves. Scopes and revoke stay with the owner.
 */
export const handleInviterAccessPatch = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly body: Record<string, unknown>;
}): Promise<Response> => {
  const { action, requestId } = input.body;
  const seat = await resolveOwnerOrActiveHumanSeat({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
  });
  const allowed =
    seat.ok &&
    seat.kind === "human" &&
    seat.membership.role === "member" &&
    (action === "approve" || action === "deny") &&
    typeof requestId === "string" &&
    (
      await listInviterRequestIds({
        projectId: input.projectId,
        userId: input.actorUserId,
      })
    ).has(requestId);
  if (!seat.ok || !allowed || typeof requestId !== "string") {
    return projectAccessErrorJson("forbidden", 403);
  }
  const ownerUserId = seat.project.ownerUserId;
  const result =
    action === "approve"
      ? await approveProjectAccessRequest({
          projectId: input.projectId,
          requestId,
          ownerUserId,
          projectDisplayName:
            typeof input.body.projectDisplayName === "string"
              ? input.body.projectDisplayName
              : undefined,
          approvalSource: "owner",
        })
      : await denyProjectAccessRequest({
          projectId: input.projectId,
          requestId,
          ownerUserId,
        });
  if (!result.ok) {
    return projectAccessErrorJson(
      result.code,
      result.code === "not_found" ? 404 : 409,
    );
  }
  return Response.json({ ok: true, request: result.request });
};
