import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { getCapabilityFeedbackForOwner } from "@/lib/feedback/capabilityFeedbackMutations";
import { createCapabilityImprovement } from "@/lib/improvements/createCapabilityImprovement";
import { parseImprovementBody } from "@/lib/improvements/parseImprovementBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{ readonly feedbackId: string }>;
}

export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { feedbackId } = await context.params;
  const feedback = await getCapabilityFeedbackForOwner(feedbackId, actor.id);

  if (feedback === null) {
    return Response.json({ error: "Feedback not found." }, { status: 404 });
  }

  const body: unknown = await request.json();
  const parsed = parseImprovementBody(body);

  if (!parsed) {
    return Response.json(
      { error: "suggestion is required for an improvement plan." },
      { status: 400 },
    );
  }

  const capabilityId = feedback.capabilityId;
  if (capabilityId === null) {
    return Response.json(
      { error: "Link this job to an assistant before planning updates." },
      { status: 400 },
    );
  }

  const capability = await getPublishedCapabilityById(capabilityId);
  if (capability === null || capability.ownerUserId !== actor.id) {
    return Response.json({ error: "Assistant not found." }, { status: 404 });
  }

  const improvement = await createCapabilityImprovement({
    feedbackId,
    capabilityId,
    ownerUserId: actor.id,
    suggestion: parsed.suggestion,
  });

  return Response.json({ ok: true, improvement });
}
