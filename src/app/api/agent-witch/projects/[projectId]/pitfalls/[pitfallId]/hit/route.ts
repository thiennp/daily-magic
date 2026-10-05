import {
  projectPitfallFailureResponse,
  recordProjectPitfallHit,
} from "@/features/project-pitfalls/public-api/infrastructure";
import { resolveAgentWitchRequestActorUserId } from "@/lib/agentWitch/resolveAgentWitchRequestActorUserId";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string; readonly pitfallId: string }>;
};

/** POST: record_hit. Optional body `{ count?, seenAt? }` for batched local hits. */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const actorUserId = await resolveAgentWitchRequestActorUserId(request);
  if (actorUserId instanceof Response) return actorUserId;
  const { projectId, pitfallId } = await context.params;
  const body: unknown = await request.json().catch(() => ({}));
  const result = await recordProjectPitfallHit({
    actorUserId,
    projectId,
    pitfallId,
    body,
  });
  if (!result.ok) return projectPitfallFailureResponse(result);
  return Response.json({ ok: true, hit: result.hit });
}
