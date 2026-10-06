import { denyProjectAccessRequest } from "@/lib/projects/acl/denyProjectAccessRequest";
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
    return Response.json({ ok: false, errorMessage: result.code }, { status });
  }

  return Response.json({ ok: true, request: result.request });
}
