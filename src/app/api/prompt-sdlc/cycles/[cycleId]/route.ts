import { requireAuth } from "@/lib/auth/requireAuth";
import { loadPromptSdlcCycleView } from "@/features/prompt-sdlc/public-api/infrastructure";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ readonly cycleId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { cycleId } = await context.params;
  const cycle = await loadPromptSdlcCycleView(cycleId, actor.id);
  if (cycle === null) {
    return Response.json(
      { ok: false, errorMessage: "Prompt cycle not found." },
      { status: 404 },
    );
  }

  return Response.json({ ok: true, cycle });
}
