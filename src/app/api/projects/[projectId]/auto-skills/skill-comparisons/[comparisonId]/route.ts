import { answerSkillComparison } from "@/features/project-auto-skills/public-api/infrastructure";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    readonly projectId: string;
    readonly comparisonId: string;
  }>;
};

/** Owner (or allowed member) POST `{answer: "old" | "new"}` after two skill versions ran side by side. */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, comparisonId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as { answer?: unknown };
  const id = Number(comparisonId);
  if (
    !Number.isInteger(id) ||
    (body.answer !== "old" && body.answer !== "new")
  ) {
    return Response.json(
      { ok: false, errorMessage: "invalid_arguments" },
      { status: 400 },
    );
  }
  const result = await answerSkillComparison({
    projectId,
    comparisonId: id,
    actorUserId: actor.id,
    answer: body.answer,
  });
  return result.ok
    ? Response.json({ ok: true })
    : Response.json(
        { ok: false, errorMessage: result.message },
        { status: result.status },
      );
}
