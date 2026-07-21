import { createAgentWitchInstallTokenForUser } from "@/lib/agentWitch/createAgentWitchInstallTokenForUser";
import { buildAppOriginFromHeaders } from "@/lib/agentWitch/resolveAgentWitchAppOrigin";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const email = actor.email.trim().toLowerCase();
  if (email.length === 0) {
    return Response.json(
      { error: "Signed-in account email is required." },
      { status: 400 },
    );
  }

  const appOrigin = buildAppOriginFromHeaders(request.headers);
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
}
