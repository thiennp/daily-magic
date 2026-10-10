import { answerSkillCheck } from "@/features/project-auto-skills/public-api/infrastructure";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string; readonly checkId: string }>;
};

/** Owner (or allowed member) POST `{answer: "old" | "new" | "both"}`. */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, checkId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as { answer?: unknown };
  const id = Number(checkId);
  if (
    !Number.isInteger(id) ||
    (body.answer !== "old" && body.answer !== "new" && body.answer !== "both")
  ) {
    return Response.json(
      { ok: false, errorMessage: "invalid_arguments" },
      { status: 400 },
    );
  }
  const result = await answerSkillCheck({
    projectId,
    checkId: id,
    actorUserId: actor.id,
    answer: body.answer,
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.message },
      { status: result.status },
    );
  }
  return Response.json({ ok: true, newVersion: result.newVersion });
}
