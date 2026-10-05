import { requireAuth } from "@/lib/auth/requireAuth";
import { unclaimBotOwnership } from "@/lib/agentAccess/claimBot/unclaimBotOwnership";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly tokenId: string }>;
};

/** POST: owner-only unclaim (sets owner_user_id NULL). */
export async function POST(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { tokenId } = await context.params;
  const result = await unclaimBotOwnership({
    tokenId,
    ownerUserId: actor.id,
  });
  if (!result.ok) {
    const status = result.code === "not_found" ? 404 : 403;
    return Response.json(
      { ok: false, code: result.code, errorMessage: result.code },
      { status },
    );
  }
  return Response.json({ ok: true, tokenId: result.tokenId });
}
