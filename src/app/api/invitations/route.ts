import { requireAuth } from "@/lib/auth/requireAuth";
import { listMyPendingHumanInvites } from "@/lib/projects/acl/humanInvites/listMyPendingHumanInvites";

export const dynamic = "force-dynamic";

/** Project invitations waiting for the signed-in user (shown in the app, not just email). */
export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const invitations = await listMyPendingHumanInvites({
    userId: actor.id,
    email: actor.email,
  });
  return Response.json({ invitations });
}
