import { answerAutoSkillSuggestion } from "@/features/project-auto-skills/public-api/infrastructure";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    readonly projectId: string;
    readonly suggestionId: string;
  }>;
};

/** Owner POST `{answer: "save" | "not_now" | "never"}`. */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, suggestionId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as { answer?: unknown };
  if (
    body.answer !== "save" &&
    body.answer !== "not_now" &&
    body.answer !== "never"
  ) {
    return Response.json(
      { ok: false, errorMessage: "invalid_arguments" },
      { status: 400 },
    );
  }
  const result = await answerAutoSkillSuggestion({
    projectId,
    suggestionId,
    actorUserId: actor.id,
    answer: body.answer,
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.message },
      { status: result.status },
    );
  }
  return Response.json({ ok: true, skillId: result.skillId });
}
