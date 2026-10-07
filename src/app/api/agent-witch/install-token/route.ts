import { createAgentWitchInstallTokenForUser } from "@/lib/agentWitch/createAgentWitchInstallTokenForUser";
import { buildAppOriginFromHeaders } from "@/lib/agentWitch/resolveAgentWitchAppOrigin";
import { requireAuth } from "@/lib/auth/requireAuth";
import { isBillingGateError } from "@/lib/billing/billingGateError";
import { toBillingGateResponse } from "@/lib/billing/toBillingGateResponse";
import isMobileRequest from "@/lib/mobile/isMobileRequest";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  if (isMobileRequest(request.headers)) {
    return Response.json(
      { error: "Mac install links are not created on mobile devices." },
      { status: 403 },
    );
  }

  const email = actor.email.trim().toLowerCase();
  if (email.length === 0) {
    return Response.json(
      { error: "Signed-in account email is required." },
      { status: 400 },
    );
  }

  const appOrigin = buildAppOriginFromHeaders(request.headers);
  try {
    const installToken = await createAgentWitchInstallTokenForUser({
      userId: actor.id,
      email,
      origin: appOrigin,
    });
    return Response.json({
      ok: true,
      pairingToken: installToken.pairingToken,
      tokenHash: installToken.tokenHash,
      installCommand: installToken.installCommand,
      email,
    });
  } catch (error) {
    if (isBillingGateError(error)) {
      return toBillingGateResponse({
        ok: false,
        code: error.code,
        errorMessage: error.message,
      });
    }
    throw error;
  }
}
