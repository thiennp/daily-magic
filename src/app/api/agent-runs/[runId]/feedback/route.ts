import { getAgentRunForParticipant } from "@/lib/dispatch/getAgentRunForParticipant";
import {
  createCapabilityFeedback,
  getFeedbackForRunByReviewer,
} from "@/lib/feedback/capabilityFeedbackQueries";
import { canSubmitFeedbackForRunStatus } from "@/lib/feedback/canSubmitFeedbackForRunStatus";
import { parseFeedbackBody } from "@/lib/feedback/parseFeedbackBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{ readonly runId: string }>;
}

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { runId } = await context.params;
  const feedback = await getFeedbackForRunByReviewer(runId, actor.id);

  return Response.json({ ok: true, feedback });
}

export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { runId } = await context.params;
  const run = await getAgentRunForParticipant(runId, actor.id);

  if (run === null) {
    return Response.json({ error: "Run not found." }, { status: 404 });
  }

  if (run.requesterUserId !== actor.id) {
    return Response.json(
      { error: "Only the requester can leave feedback." },
      { status: 403 },
    );
  }

  if (!canSubmitFeedbackForRunStatus(run.status)) {
    return Response.json(
      { error: "Feedback is available after the job finishes." },
      { status: 400 },
    );
  }

  const existing = await getFeedbackForRunByReviewer(runId, actor.id);
  if (existing !== null) {
    return Response.json(
      { error: "Feedback already submitted for this job." },
      { status: 409 },
    );
  }

  const body: unknown = await request.json();
  const parsed = parseFeedbackBody(body);

  if (!parsed) {
    return Response.json(
      { error: "comment is required for feedback." },
      { status: 400 },
    );
  }

  const feedback = await createCapabilityFeedback({
    agentRunId: runId,
    capabilityId: run.capabilityId,
    reviewerUserId: actor.id,
    rating: parsed.rating,
    comment: parsed.comment,
  });

  return Response.json({ ok: true, feedback });
}
