import { requireAuth } from "@/lib/auth/requireAuth";
import {
  getUserOnboardingAutomationCreated,
  markUserOnboardingAutomationCreated,
} from "@/lib/onboarding/onboardingAutomationCreatedQueries";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const automationCreated = await getUserOnboardingAutomationCreated(actor.id);

  return Response.json({ ok: true, automationCreated });
}

export async function POST(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  await markUserOnboardingAutomationCreated(actor.id);

  return Response.json({ ok: true, automationCreated: true });
}
