import { requireAuth } from "@/lib/auth/requireAuth";
import { userHasCreatedWorkflowInDatabase } from "@/lib/onboarding/onboardingWorkflowCreatedQueries";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const workflowCreated = await userHasCreatedWorkflowInDatabase(actor.id);

  return Response.json({ ok: true, workflowCreated });
}
