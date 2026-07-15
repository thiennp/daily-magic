import { requireAuth } from "@/lib/auth/requireAuth";
import {
  getUserOnboardingSetupAcknowledged,
  markUserOnboardingSetupAcknowledged,
} from "@/lib/onboarding/onboardingSetupAcknowledgedQueries";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const setupAcknowledged = await getUserOnboardingSetupAcknowledged(actor.id);

  return Response.json({ ok: true, setupAcknowledged });
}

export async function POST(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  await markUserOnboardingSetupAcknowledged(actor.id);

  return Response.json({ ok: true, setupAcknowledged: true });
}
