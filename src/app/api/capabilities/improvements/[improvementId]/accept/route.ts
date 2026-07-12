import { acceptCapabilityImprovement } from "@/lib/improvements/capabilityImprovementActions";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{ readonly improvementId: string }>;
}

export async function POST(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { improvementId } = await context.params;
  const improvement = await acceptCapabilityImprovement(
    improvementId,
    actor.id,
  );

  if (improvement === null) {
    return Response.json({ error: "Improvement not found." }, { status: 404 });
  }

  return Response.json({ ok: true, improvement });
}
