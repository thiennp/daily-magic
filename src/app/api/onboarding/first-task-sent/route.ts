import { requireAuth } from "@/lib/auth/requireAuth";
import {
  getUserOnboardingFirstTaskSent,
  markUserOnboardingFirstTaskSent,
} from "@/lib/onboarding/onboardingFirstTaskSentQueries";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const firstTaskSent = await getUserOnboardingFirstTaskSent(actor.id);

  return Response.json({ ok: true, firstTaskSent });
}

export async function POST(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  await markUserOnboardingFirstTaskSent(actor.id);

  return Response.json({ ok: true, firstTaskSent: true });
}
