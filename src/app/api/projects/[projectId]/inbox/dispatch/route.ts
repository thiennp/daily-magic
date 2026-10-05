import { dispatchProjectMessageFromHumanMember } from "@/lib/projects/acl/messaging/dispatchProjectMessageFromHumanMember";
import { dispatchProjectMessageFromOwner } from "@/lib/projects/acl/messaging/dispatchProjectMessageFromOwner";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { requireAuth } from "@/lib/auth/requireAuth";

type DispatchFailure = Extract<
  Awaited<ReturnType<typeof dispatchProjectMessageFromOwner>>,
  { readonly ok: false }
>;

const RATE_LIMITED_CODES = new Set([
  "rate_limited",
  "rate_limited_hourly",
  "unread_cap",
  "rate_limited_daily",
]);

const FORBIDDEN_CODES = new Set(["forbidden", "viewer_read_only"]);

const failureStatus = (result: DispatchFailure): number => {
  if (
    RATE_LIMITED_CODES.has(result.code) ||
    result.detail === "rate_limited_hourly" ||
    result.detail === "unread_cap"
  ) {
    return 429;
  }
  return FORBIDDEN_CODES.has(result.code) ? 403 : 400;
};

const readJsonBody = async (
  request: Request,
): Promise<{ readonly ok: true; readonly args: unknown } | { readonly ok: false }> => {
  try {
    return { ok: true, args: await request.json() };
  } catch {
    return { ok: false };
  }
};

/** Owner → bot, or human member (memberKind human, role member) → peer. Viewers 403. */
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
  const isOwner = project.ownerUserId === actor.id;
  const body = await readJsonBody(request);
  if (isOwner && !body.ok) {
    return Response.json(
      { ok: false, errorMessage: "invalid_arguments" },
      { status: 400 },
    );
  }
  const args = body.ok ? body.args : null;
  const result = isOwner
    ? await dispatchProjectMessageFromOwner({ projectId, ownerUserId: actor.id, args })
    : await dispatchProjectMessageFromHumanMember({
        projectId,
        actorUserId: actor.id,
        args,
      });
  if (!result.ok) {
    return Response.json(
      {
        ok: false,
        errorMessage: result.message ?? result.code,
        code: result.code,
        cause: "cause" in result ? result.cause : undefined,
        reason: result.reason,
        detail: result.detail,
        retryAfterSeconds: result.retryAfterSeconds,
        retryAfterAt: result.retryAfterAt,
        message: result.message,
      },
      { status: failureStatus(result) },
    );
  }
  return Response.json({
    ok: true,
    messageId: result.messageId,
    recipientCount: result.recipientCount,
  });
}
