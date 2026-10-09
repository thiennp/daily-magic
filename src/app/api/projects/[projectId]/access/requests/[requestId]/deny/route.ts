import { handleInviterAccessPatch } from "@/app/api/projects/[projectId]/access/handleInviterAccessPatch";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { denyProjectAccessRequest } from "@/lib/projects/acl/denyProjectAccessRequest";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly requestId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { projectId, requestId } = await context.params;
  const decision = await authorizeProjectOwner({
    projectId,
    actorUserId: actor.id,
  });
  if (!decision.allow && decision.reason !== "not_found") {
    return handleInviterAccessPatch({
      projectId,
      actorUserId: actor.id,
      body: { action: "deny", requestId },
    });
  }

  const result = await denyProjectAccessRequest({
    projectId,
    requestId,
    ownerUserId: actor.id,
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
}
