import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { disconnectProjectConnection } from "@/lib/projects/connections/disconnectProjectConnection";
import {
  isProjectConnectionsFeatureEnabled,
  resolveProjectConnectionsAuthSecret,
} from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { parseProjectConnectionProvider } from "@/lib/projects/connections/parseProjectConnectionProvider";
import { projectConnectionsUnavailableJson } from "@/lib/projects/connections/projectConnectionsUnavailableJson";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string; readonly provider: string }>;
};

/**
 * DELETE /api/projects/:projectId/connections/:provider
 * Owner only. Removes the bind; best-effort provider revoke.
 */
export async function DELETE(
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

  const { projectId, provider: providerRaw } = await context.params;
  const provider = parseProjectConnectionProvider(providerRaw);
  if (provider === null) {
    return projectAccessErrorJson("invalid_request", 400);
  }

  const owner = await authorizeProjectOwner({
    projectId,
    actorUserId: actor.id,
  });
  if (!owner.allow) {
    const status = owner.reason === "not_found" ? 404 : 403;
    return projectAccessErrorJson(owner.reason, status);
  }

  const result = await disconnectProjectConnection({ projectId, provider });
  if (!result.ok) {
    return projectConnectionsUnavailableJson();
  }

  return Response.json({ ok: true, removed: result.removed });
}
