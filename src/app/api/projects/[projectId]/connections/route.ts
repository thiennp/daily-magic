import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import {
  isProjectConnectionsFeatureEnabled,
  resolveProjectConnectionsAuthSecret,
} from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { isProviderConnectEnabled } from "@/lib/projects/connections/isProviderConnectEnabled";
import { listProjectConnections } from "@/lib/projects/connections/listProjectConnections";
import { projectConnectionsUnavailableJson } from "@/lib/projects/connections/projectConnectionsUnavailableJson";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string }>;
};

/**
 * GET /api/projects/:projectId/connections
 * UI LOCK (c99b9344): { ok:true, connections:[{provider,status,accountLabel,connectedAt}] }
 * 501 when feature off or AUTH_SECRET missing → UI unavailable.
 * Never returns tokens.
 */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  if (
    !isProjectConnectionsFeatureEnabled() ||
    resolveProjectConnectionsAuthSecret() === null
  ) {
    return projectConnectionsUnavailableJson();
  }

  const { actor, error } = await requireAuth();
  if (error || !actor) return error;

  const { projectId } = await context.params;
  const page = await authorizeProjectPageActor({
    projectId,
    actorUserId: actor.id,
  });
  if (!page.ok) {
    const status = page.reason === "not_found" ? 404 : 403;
    return projectAccessErrorJson(page.reason, status);
  }

  const connections = await listProjectConnections(projectId);
  return Response.json({
    ok: true,
    connections: connections.map((c) => ({
      ...c,
      connectEnabled: isProviderConnectEnabled(c.provider),
    })),
  });
}
