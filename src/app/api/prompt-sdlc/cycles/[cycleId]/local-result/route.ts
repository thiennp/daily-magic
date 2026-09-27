import { requireAuth } from "@/lib/auth/requireAuth";
import { parsePromptSdlcLocalResultRequest } from "@/lib/promptSdlc/parsePromptSdlcHttpBodies";
import { submitPromptSdlcLocalResult } from "@/features/prompt-sdlc/public-api/infrastructure";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: { params: Promise<{ readonly cycleId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const parsed = parsePromptSdlcLocalResultRequest(
    await request.json().catch(() => null),
  );
  if (parsed === null) {
    return Response.json(
      { ok: false, errorMessage: "A local model reply is required." },
      { status: 400 },
    );
  }

  const { cycleId } = await context.params;
  const result = await submitPromptSdlcLocalResult({
    cycleId,
    ownerUserId: actor.id,
    requesterEmail: actor.email,
    role: parsed.role,
    text: parsed.text,
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.errorMessage },
      { status: result.status },
    );
  }

  return Response.json({ ok: true, cycle: result.cycle });
}
