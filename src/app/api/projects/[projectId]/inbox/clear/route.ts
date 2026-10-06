import { archiveAllProjectMessages } from "@/lib/projects/acl/messaging/archiveAllProjectMessages";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const readConfirm = async (request: Request): Promise<boolean> => {
  try {
    const body: unknown = await request.json();
    return (
      body !== null &&
      typeof body === "object" &&
      (body as { confirm?: unknown }).confirm === true
    );
  } catch {
    return false;
  }
};

/**
 * Owner-only Inbox Clear all → archive. Never deletes messages or deliveries.
 * Body: { confirm: true }. Returns the batch token the toast Undo restores.
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const confirm = await readConfirm(request);
  const result = await archiveAllProjectMessages({
    projectId,
    actorUserId: actor.id,
    confirm,
  });
  if (!result.ok) {
    const status =
      result.code === "not_found"
        ? 404
        : result.code === "forbidden"
          ? 403
          : 400;
    return Response.json({ ok: false, errorMessage: result.code }, { status });
  }
  return Response.json({
    ok: true,
    archivedMessages: result.archivedMessages,
    archiveBatch: result.archiveBatch,
  });
}
