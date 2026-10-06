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
  // Best-effort: a seed failure must not block onboarding flags (Home shell).
  try {
    await ensureSampleWorkflowCapability(actor.id);
  } catch (seedError: unknown) {
    const name = seedError instanceof Error ? seedError.name : "Error";
    const message = seedError instanceof Error ? seedError.message : "unknown";
    console.error("onboarding.bootstrap.sample_seed_failed", { name, message });
  }

  const flags = await loadOnboardingBootstrapFlags(actor.id);

  return Response.json({ ok: true, ...flags });
}
