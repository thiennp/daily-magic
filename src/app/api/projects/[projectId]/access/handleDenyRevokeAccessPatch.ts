import { denyProjectAccessRequest } from "@/lib/projects/acl/denyProjectAccessRequest";
import { revokeProjectMembership } from "@/lib/projects/acl/revokeProjectMembership";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";

export const handleDenyAccessPatch = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly body: Record<string, unknown>;
}): Promise<Response> => {
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
    return projectAccessErrorJson(result.code, status);
  }
  return Response.json({ ok: true, request: result.request });
};

export const handleRevokeAccessPatch = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly body: Record<string, unknown>;
}): Promise<Response> => {
  // Locked field: membershipId. requestId temporary alias until Product switches.
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
    return projectAccessErrorJson(result.code, status);
  }
  return Response.json({ ok: true, membership: result.membership });
};
