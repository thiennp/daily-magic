import { requireAuth } from "@/lib/auth/requireAuth";
import { deleteProjectComposerRecipientSticky } from "@/lib/projects/acl/composer/deleteProjectComposerRecipientSticky";
import { getProjectComposerRecipientSticky } from "@/lib/projects/acl/composer/getProjectComposerRecipientSticky";
import { putProjectComposerRecipientSticky } from "@/lib/projects/acl/composer/putProjectComposerRecipientSticky";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string }>;
};

const statusForCode = (code: string): number => {
  if (code === "not_found") return 404;
  if (code === "forbidden" || code === "viewer_read_only") return 403;
  if (code === "membership_inactive" || code === "single_assistant") return 409;
  if (code === "invalid_body") return 400;
  return 400;
};

/**
 * Composer recipient sticky (server half of chip + routing FSA).
 * GET — current sticky + singleAssistant hint (hide ALL routing UI when set).
 * PUT — persist while chip checked `{ mode: "all"|"membership", membershipId? }`.
 * DELETE — clear when unchecked / one-shot.
 */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const result = await getProjectComposerRecipientSticky({
    projectId,
    actorUserId: actor.id,
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.code, code: result.code },
      { status: statusForCode(result.code) },
    );
  }
  return Response.json({
    ok: true,
    projectId,
    sticky: result.sticky,
    cleared: result.cleared,
    clearedReason: result.clearedReason,
    singleAssistant: result.singleAssistant,
  });
}

export async function PUT(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const body: unknown = await request.json().catch(() => null);
  const result = await putProjectComposerRecipientSticky({
    projectId,
    actorUserId: actor.id,
    body,
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.code, code: result.code },
      { status: statusForCode(result.code) },
    );
  }
  return Response.json({ ok: true, projectId, sticky: result.sticky });
}

export async function DELETE(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const result = await deleteProjectComposerRecipientSticky({
    projectId,
    actorUserId: actor.id,
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.code, code: result.code },
      { status: statusForCode(result.code) },
    );
  }
  return Response.json({ ok: true, projectId, cleared: result.cleared });
}
