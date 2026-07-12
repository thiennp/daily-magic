import { FeedbackStatus } from "@/lib/feedback/FeedbackStatus.constant";
import { updateCapabilityFeedbackStatus } from "@/lib/feedback/capabilityFeedbackMutations";
import { parseFeedbackStatusBody } from "@/lib/feedback/parseFeedbackBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{ readonly feedbackId: string }>;
}

export async function PATCH(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json();
  const status = parseFeedbackStatusBody(body);

  if (!status) {
    return Response.json(
      { error: "status must be acknowledged or dismissed." },
      { status: 400 },
    );
  }

  const { feedbackId } = await context.params;
  const feedback = await updateCapabilityFeedbackStatus(
    feedbackId,
    actor.id,
    status === "acknowledged"
      ? FeedbackStatus.ACKNOWLEDGED
      : FeedbackStatus.DISMISSED,
  );

  if (feedback === null) {
    return Response.json({ error: "Feedback not found." }, { status: 404 });
  }

  return Response.json({ ok: true, feedback });
}
