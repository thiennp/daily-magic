import { requireAuth } from "@/lib/auth/requireAuth";
import { humanInviteEmailErrorJson } from "@/lib/projects/acl/humanInvites/humanInviteEmailErrorJson";
import { sendHumanProjectEmailInvite } from "@/lib/projects/acl/humanInvites/sendHumanProjectEmailInvite";
import { toHumanInviteListItem } from "@/lib/projects/acl/humanInvites/toHumanInviteListItem";

export const dynamic = "force-dynamic";

/** DF-025 owner-only: email one person a join link. Response never has the token/link. */
export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { projectId } = await context.params;
  const body: unknown = await request.json().catch(() => ({}));
  const payload =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  const result = await sendHumanProjectEmailInvite({
    projectId,
    ownerUserId: actor.id,
    email: payload.email,
    role: payload.role,
    requireEmailMatch: payload.requireEmailMatch,
    requiresApproval: payload.requiresApproval,
  });
  if (!result.ok) {
    return humanInviteEmailErrorJson(result.code);
  }
  return Response.json(
    { ok: true, invite: toHumanInviteListItem(result.invite) },
    { status: 201 },
  );
}
