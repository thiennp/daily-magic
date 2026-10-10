import { getAutoSkillsOverview } from "@/features/project-auto-skills/public-api/infrastructure";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { requireAuth } from "@/lib/auth/requireAuth";
import { findDeviceProjectFolderPath } from "@/lib/projects/acl/findDeviceProjectFolderPath";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

/**
 * Owner POST: ask the owner's online computers to run past tasks of this
 * project through auto skills now. The computers hold the task history, so
 * the scan runs there; answers show up as questions on the strip. A body of
 * `{ "docs": true }` scans the project folder's docs instead of past tasks.
 * `{ "commits": n }` sets how many main-branch commits a git folder feeds in
 * (the computer defaults to 100 and caps it). Each request carries the
 * folder this computer registered on Resources, as a fallback for a missing
 * local link.
 */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const body: unknown = await request.json().catch(() => null);
  const docs =
    typeof body === "object" &&
    body !== null &&
    (body as { docs?: unknown }).docs === true;
  const commitsRaw =
    typeof body === "object" && body !== null
      ? (body as { commits?: unknown }).commits
      : undefined;
  const commits =
    typeof commitsRaw === "number" &&
    Number.isInteger(commitsRaw) &&
    commitsRaw >= 1
      ? commitsRaw
      : undefined;
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
    // The folder added on Resources lives in the cloud; the computer's own link file may not have it.
    const folderPath = await findDeviceProjectFolderPath(
      projectId,
      agent.deviceId,
    );
    agent.send({
      type: AGENT_WITCH_MESSAGE_TYPES.AUTOSKILL_SCAN_REQUEST,
      payload: {
        projectId,
        ...(docs ? { docs: true } : {}),
        ...(commits !== undefined ? { commits } : {}),
        ...(folderPath !== null ? { folderPath } : {}),
      },
    });
  }
  return Response.json({ ok: true, computers: agents.length }, { status: 202 });
}
