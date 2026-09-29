import { requireAuth } from "@/lib/auth/requireAuth";
import { parsePromptSdlcStartRequest } from "@/lib/promptOptimizer/parsePromptSdlcHttpBodies";
import {
  listPromptSdlcCycleSummaries,
  startPromptSdlcCycle,
} from "@/features/prompt-optimizer/public-api/infrastructure";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const cycles = await listPromptSdlcCycleSummaries(actor.id);
  return Response.json({ ok: true, cycles });
}

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const parsed = parsePromptSdlcStartRequest(
    await request.json().catch(() => null),
  );
  if (parsed === null) {
    return Response.json(
      { ok: false, errorMessage: "Choose a goal, a prompt, and two models." },
      { status: 400 },
    );
  }

  try {
    const result = await startPromptSdlcCycle({
      ownerUserId: actor.id,
      requesterEmail: actor.email,
      ...parsed,
    });
    if (!result.ok) {
      return Response.json(
        { ok: false, errorMessage: result.errorMessage },
        { status: 400 },
      );
    }

    return Response.json({ ok: true, cycle: result.cycle });
  } catch (startError: unknown) {
    const errorMessage =
      startError instanceof Error
        ? startError.message
        : "The prompt optimizer failed.";
    console.error(
      "[prompt-sdlc] POST /api/prompt-optimizer/cycles failed:",
      startError,
    );
    return Response.json({ ok: false, errorMessage }, { status: 500 });
  }
}
