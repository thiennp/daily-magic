import { decideGroupInvite } from "@/lib/auth/groupInvites/decideGroupInvite";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: { params: Promise<{ readonly inviteId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { inviteId } = await context.params;
  const result = await decideGroupInvite({
    inviteId,
    userId: actor.id,
    accept: false,
  });
  if (!result.ok) {
    const status = result.code === "not_found" ? 404 : 409;
    return Response.json({ error: result.code }, { status });
  }
  return Response.json({ ok: true, groupId: result.groupId });
}
