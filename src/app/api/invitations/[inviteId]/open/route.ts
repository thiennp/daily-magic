import { requireAuth } from "@/lib/auth/requireAuth";
import { openMyHumanInvite } from "@/lib/projects/acl/humanInvites/openMyHumanInvite";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: { params: Promise<{ readonly inviteId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { inviteId } = await context.params;
  const path = await openMyHumanInvite({
    inviteId,
    userId: actor.id,
    email: actor.email,
  });
  if (path === null) {
    return Response.json(
      { ok: false, code: "invite_unavailable" },
      { status: 404 },
    );
  }
  return Response.json({ ok: true, path });
}
