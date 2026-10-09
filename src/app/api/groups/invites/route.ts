import { listPendingGroupInvitesForUser } from "@/lib/auth/groupInvites/listPendingGroupInvitesForUser";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

/** The company invitations waiting for the signed-in user. */
export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  return Response.json({
    invites: await listPendingGroupInvitesForUser(actor.id),
  });
}
