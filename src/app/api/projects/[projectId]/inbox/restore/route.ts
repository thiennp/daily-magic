import { parseProjectMessageRestoreTarget } from "@/lib/projects/acl/messaging/parseProjectMessageRestoreTarget";
import { restoreProjectMessages } from "@/lib/projects/acl/messaging/restoreProjectMessages";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const readBody = async (request: Request): Promise<unknown> => {
  try {
    return await request.json();
  } catch {
    return null;
  }
};

/**
 * Owner-only Restore from Archived.
 * Body: { messageId } | { archiveBatch } (toast Undo) | { all: true }.
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const target = parseProjectMessageRestoreTarget(await readBody(request));
  if (target === null) {
    return Response.json(
      { ok: false, errorMessage: "invalid_target" },
      { status: 400 },
    );
  }
  const result = await restoreProjectMessages({
    projectId,
    actorUserId: actor.id,
    target,
  });
  if (!result.ok) {
    const status = result.code === "not_found" ? 404 : 403;
    return Response.json({ ok: false, errorMessage: result.code }, { status });
  }
  return Response.json({ ok: true, restoredMessages: result.restoredMessages });
}
