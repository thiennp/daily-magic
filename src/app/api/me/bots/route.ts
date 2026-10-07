import { requireAuth } from "@/lib/auth/requireAuth";
import { listOwnedBots } from "@/lib/agentAccess/claimBot/listOwnedBots";
import { redeemClaimBotCode } from "@/lib/agentAccess/claimBot/redeemClaimBotCode";

export const dynamic = "force-dynamic";

const redeemStatus = (code: string): number => {
  if (code === "locked") return 429;
  if (code === "already_claimed" || code === "already_redeemed") return 409;
  if (code === "expired") return 410;
  if (code === "assistant_connect_limit") return 403;
  return 400;
};

/** GET: bots this signed-in person owns (+ memberships for webhook forms). */
export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const bots = await listOwnedBots({ ownerUserId: actor.id });
  return Response.json({ ok: true, bots });
}

/** POST { code }: redeem a claim code for this signed-in person. */
export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const body: unknown = await request.json().catch(() => null);
  const code =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { code?: unknown }).code === "string"
      ? (body as { code: string }).code.trim()
      : "";
  if (code.length === 0) {
    return Response.json(
      { ok: false, code: "invalid_code", errorMessage: "Enter a claim code." },
      { status: 400 },
    );
  }
  const result = await redeemClaimBotCode({
    code,
    claimantUserId: actor.id,
  });
  if (!result.ok) {
    return Response.json(
      {
        ok: false,
        code: result.code,
        retryAt: result.retryAt,
        errorMessage:
          result.code === "locked"
            ? `Too many failed attempts. Try again after ${result.retryAt}.`
            : result.code === "assistant_connect_limit"
              ? "This plan's assistant connect limit is full. Upgrade to connect more."
              : result.code,
      },
      { status: redeemStatus(result.code) },
    );
  }
  return Response.json({
    ok: true,
    tokenId: result.tokenId,
    botUserId: result.botUserId,
  });
}
