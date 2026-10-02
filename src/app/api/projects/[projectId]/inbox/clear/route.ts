import { clearAllProjectMessages } from "@/lib/projects/acl/messaging/clearAllProjectMessages";
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
 * Owner-only destructive wipe of all project messages + deliveries.
 * Body: { confirm: true } (leave_project style).
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const confirm = await readConfirm(request);
  const result = await clearAllProjectMessages({
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
    deletedMessages: result.deletedMessages,
    deletedDeliveries: result.deletedDeliveries,
  });
}
