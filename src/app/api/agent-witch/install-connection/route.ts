import { handleAgentWitchInstallConnectionGet } from "@/lib/agentWitch/handleAgentWitchInstallConnectionGet";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const expectedTokenHash = new URL(request.url).searchParams
    .get("tokenHash")
    ?.trim();

  return handleAgentWitchInstallConnectionGet(actor, {
    expectedTokenHash:
      expectedTokenHash !== undefined && expectedTokenHash.length > 0
        ? expectedTokenHash
        : null,
  });
}
