import { handleAgentWitchInstallConnectionGet } from "@/lib/agentWitch/handleAgentWitchInstallConnectionGet";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  return handleAgentWitchInstallConnectionGet(actor);
}
