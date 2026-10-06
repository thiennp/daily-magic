import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly requestId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { projectId, requestId } = await context.params;
  const body: unknown = await request.json().catch(() => ({}));
  const teamLabel =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { teamLabel?: unknown }).teamLabel === "string"
      ? (body as { teamLabel: string }).teamLabel
      : null;

  const result = await approveProjectAccessRequest({
    projectId,
    requestId,
    ownerUserId: actor.id,
    teamLabel,
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

  return Response.json({
    ok: true,
    request: result.request,
    membership: result.membership,
  });
}
