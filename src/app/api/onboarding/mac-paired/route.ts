import { requireAuth } from "@/lib/auth/requireAuth";
import { userHasPairedMacInDatabase } from "@/lib/onboarding/onboardingMacPairedQueries";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const macPaired = await userHasPairedMacInDatabase(actor.id);

  return Response.json({ ok: true, macPaired });
}
