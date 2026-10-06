import {
  getProjectRuleUsage,
  projectPitfallFailureResponse,
} from "@/features/project-pitfalls/public-api/infrastructure";
import { resolveAgentWitchRequestActorUserId } from "@/lib/agentWitch/resolveAgentWitchRequestActorUserId";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

/**
 * GET: per-rule hit counts (all-time) + duplicate/overlap pairs for rule-compare.
 * Query: ?days=N (default 30, clamp 1..90; reserved — windowDays is null today).
 */
export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const actorUserId = await resolveAgentWitchRequestActorUserId(request);
  if (actorUserId instanceof Response) return actorUserId;
  const { projectId } = await context.params;
  const daysRaw = new URL(request.url).searchParams.get("days");
  const result = await getProjectRuleUsage({
    actorUserId,
    projectId,
    daysRaw,
  });
  if (!result.ok) return projectPitfallFailureResponse(result);
  return Response.json(result);
}
