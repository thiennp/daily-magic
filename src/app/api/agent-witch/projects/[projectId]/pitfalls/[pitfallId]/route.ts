import {
  getProjectPitfall,
  projectPitfallFailureResponse,
} from "@/features/project-pitfalls/public-api/infrastructure";
import { resolveAgentWitchRequestActorUserId } from "@/lib/agentWitch/resolveAgentWitchRequestActorUserId";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string; readonly pitfallId: string }>;
};

/** GET: one merged pitfall (seed, override, or project-authored). */
export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const actorUserId = await resolveAgentWitchRequestActorUserId(request);
  if (actorUserId instanceof Response) return actorUserId;
  const { projectId, pitfallId } = await context.params;
  const result = await getProjectPitfall({ actorUserId, projectId, pitfallId });
  if (!result.ok) return projectPitfallFailureResponse(result);
  return Response.json({ ok: true, pitfall: result.pitfall });
}
