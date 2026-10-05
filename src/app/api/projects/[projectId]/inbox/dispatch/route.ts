import { dispatchProjectMessageFromOwner } from "@/lib/projects/acl/messaging/dispatchProjectMessageFromOwner";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { requireAuth } from "@/lib/auth/requireAuth";

const readJsonBody = async (
  request: Request,
): Promise<{ readonly ok: true; readonly args: unknown } | { readonly ok: false }> => {
  try {
    return { ok: true, args: await request.json() };
  } catch {
    return { ok: false };
  }
};

export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const project = await getUserProjectById(projectId);
  if (project === null) {
    return Response.json({ ok: false, errorMessage: "not_found" }, { status: 404 });
  }
  if (project.ownerUserId !== actor.id) {
    return Response.json({ ok: false, errorMessage: "forbidden" }, { status: 403 });
  }
  const body = await readJsonBody(request);
  if (!body.ok) {
    return Response.json(
      { ok: false, errorMessage: "invalid_arguments" },
      { status: 400 },
    );
  }
  const result = await dispatchProjectMessageFromOwner({
    projectId,
    ownerUserId: actor.id,
    args: body.args,
  });
  if (!result.ok) {
    const status =
      result.code === "rate_limited" ||
      result.detail === "rate_limited_hourly" ||
      result.detail === "unread_cap" ||
      result.code === "rate_limited_hourly" ||
      result.code === "unread_cap" ||
      result.code === "rate_limited_daily"
        ? 429
        : 400;
    return Response.json(
      {
        ok: false,
        errorMessage: result.message ?? result.code,
        code: result.code,
        reason: result.reason,
        detail: result.detail,
        retryAfterSeconds: result.retryAfterSeconds,
        retryAfterAt: result.retryAfterAt,
      },
      { status },
    );
  }
  return Response.json({
    ok: true,
    messageId: result.messageId,
    recipientCount: result.recipientCount,
  });
}
