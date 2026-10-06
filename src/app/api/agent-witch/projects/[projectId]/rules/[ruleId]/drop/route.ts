import {
  projectPitfallFailureResponse,
  setProjectRuleActive,
} from "@/features/project-pitfalls/public-api/infrastructure";
import { resolveAgentWitchRequestActorUserId } from "@/lib/agentWitch/resolveAgentWitchRequestActorUserId";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string; readonly ruleId: string }>;
};

/**
 * POST: owner drops (retires) one Safety rule. Soft and reversible via /restore.
 * Idempotent: an already-dropped rule returns ok with changed=false.
 */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const actorUserId = await resolveAgentWitchRequestActorUserId(request);
  if (actorUserId instanceof Response) return actorUserId;
  const { projectId, ruleId } = await context.params;
  const result = await setProjectRuleActive({
    actorUserId,
    projectId,
    ruleId,
    active: false,
  });
  if (!result.ok) return projectPitfallFailureResponse(result);
  return Response.json(result);
}
