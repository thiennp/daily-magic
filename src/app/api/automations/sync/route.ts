import { pushAutomationsSyncToUserMac } from "@/lib/automations/pushAutomationsToUserMac";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const result = await pushAutomationsSyncToUserMac(actor.id);

  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.errorMessage },
      { status: 503 },
    );
  }

  return Response.json({
    ok: true,
    writtenCount: result.writtenCount,
  });
}
