import ensureSampleWorkflowCapability from "@/lib/capabilities/ensureSampleWorkflowCapability";
import { loadOnboardingBootstrapFlags } from "@/lib/onboarding/loadOnboardingBootstrapFlags";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  // Seed the Sample: Weekly status update playbook for empty libraries.
  await ensureSampleWorkflowCapability(actor.id);

  const flags = await loadOnboardingBootstrapFlags(actor.id);

  return Response.json({ ok: true, ...flags });
}
