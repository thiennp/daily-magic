import { getAutoSkillsOverview } from "@/features/project-auto-skills/public-api/infrastructure";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

/**
 * Owner POST: ask the owner's online computers to run past tasks of this
 * project through auto skills now. The computers hold the task history, so
 * the scan runs there; answers show up as questions on the strip.
 */
export async function POST(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const overview = await getAutoSkillsOverview({
    projectId,
    actorUserId: actor.id,
  });
  if (overview === null) {
    return Response.json(
      { ok: false, errorMessage: "Not found." },
      { status: 404 },
    );
  }
  if (!overview.enabled) {
    return Response.json(
      { ok: false, errorMessage: "Turn on auto skills first." },
      { status: 409 },
    );
  }
  const agents = getAgentWitchHub()
    .listAgentClients()
    .filter((client) => client.userId === actor.id);
  if (agents.length === 0) {
    return Response.json(
      { ok: false, errorMessage: MAC_OFFLINE_FOR_ACCOUNT_ERROR },
      { status: 409 },
    );
  }
  for (const agent of agents) {
    agent.send({
      type: AGENT_WITCH_MESSAGE_TYPES.AUTOSKILL_SCAN_REQUEST,
      payload: { projectId },
    });
  }
  return Response.json({ ok: true, computers: agents.length }, { status: 202 });
}
