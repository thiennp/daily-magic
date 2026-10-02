import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { denyProjectAccessRequest } from "@/lib/projects/acl/denyProjectAccessRequest";
import { revokeProjectMembership } from "@/lib/projects/acl/revokeProjectMembership";

export const handleProjectAccessPatch = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly body: Record<string, unknown>;
}): Promise<Response> => {
  const action = input.body.action;
  if (action === "approve") {
    if (typeof input.body.requestId !== "string") {
      return Response.json(
        { ok: false, errorMessage: "requestId required" },
        { status: 400 },
      );
    }
    const result = await approveProjectAccessRequest({
      projectId: input.projectId,
      requestId: input.body.requestId,
      ownerUserId: input.ownerUserId,
      teamLabel:
        typeof input.body.teamLabel === "string" ? input.body.teamLabel : null,
      projectDisplayName:
        typeof input.body.projectDisplayName === "string"
          ? input.body.projectDisplayName
          : undefined,
      scopes: Array.isArray(input.body.scopes)
        ? input.body.scopes.filter((s): s is string => typeof s === "string")
        : null,
    });
    if (!result.ok) {
      const status =
        result.code === "forbidden"
          ? 403
          : result.code === "not_found"
            ? 404
            : result.code === "display_name_taken"
              ? 409
              : result.code === "display_name_reserved"
                ? 422
                : result.code === "display_name_required" ||
                    result.code === "display_name_invalid"
                  ? 400
                  : 409;
      return Response.json(
        { ok: false, errorMessage: result.code },
        { status },
      );
    }
    return Response.json({
      ok: true,
      request: result.request,
      membership: result.membership,
    });
  }
  if (action === "deny") {
    if (typeof input.body.requestId !== "string") {
      return Response.json(
        { ok: false, errorMessage: "requestId required" },
        { status: 400 },
      );
    }
    const result = await denyProjectAccessRequest({
      projectId: input.projectId,
      requestId: input.body.requestId,
      ownerUserId: input.ownerUserId,
    });
    if (!result.ok) {
      const status =
        result.code === "forbidden"
          ? 403
          : result.code === "not_found"
            ? 404
            : 409;
      return Response.json(
        { ok: false, errorMessage: result.code },
        { status },
      );
    }
    return Response.json({ ok: true, request: result.request });
  }
  if (action === "revoke") {
    // Locked field: membershipId. requestId kept as temporary alias until Product switches.
    const membershipId =
      typeof input.body.membershipId === "string"
        ? input.body.membershipId
        : typeof input.body.requestId === "string"
          ? input.body.requestId
          : null;
    if (membershipId === null) {
      return Response.json(
        { ok: false, errorMessage: "membershipId required" },
        { status: 400 },
      );
    }
    const result = await revokeProjectMembership({
      projectId: input.projectId,
      membershipId,
      ownerUserId: input.ownerUserId,
    });
    if (!result.ok) {
      const status =
        result.code === "forbidden"
          ? 403
          : result.code === "not_found"
            ? 404
            : 409;
      return Response.json(
        { ok: false, errorMessage: result.code },
        { status },
      );
    }
    return Response.json({ ok: true, membership: result.membership });
  }
  return Response.json(
    { ok: false, errorMessage: "action must be approve|deny|revoke" },
    { status: 400 },
  );
};
