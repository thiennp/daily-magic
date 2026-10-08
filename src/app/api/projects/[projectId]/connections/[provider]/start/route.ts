import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import {
  isProjectConnectionsFeatureEnabled,
  resolveProjectConnectionsAuthSecret,
} from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { isProviderConnectEnabled } from "@/lib/projects/connections/isProviderConnectEnabled";
import { parseProjectConnectionProvider } from "@/lib/projects/connections/parseProjectConnectionProvider";
import { projectConnectionsUnavailableJson } from "@/lib/projects/connections/projectConnectionsUnavailableJson";
import { startProjectConnectionOAuth } from "@/lib/projects/connections/startProjectConnectionOAuth";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string; readonly provider: string }>;
};

/**
 * POST /api/projects/:projectId/connections/:provider/start
 * Owner only. Success: { url }. Missing env → 501 unavailable.
 * Live: GitHub, Slack, Linear, Gmail.
 */
export async function POST(
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

  if (!isProviderConnectEnabled(provider)) {
    return Response.json({ error: "coming_soon" }, { status: 403 });
  }

  const owner = await authorizeProjectOwner({
    projectId,
    actorUserId: actor.id,
  });
  if (!owner.allow) {
    const status = owner.reason === "not_found" ? 404 : 403;
    return projectAccessErrorJson(owner.reason, status);
  }

  const started = startProjectConnectionOAuth({
    projectId,
    provider,
    actorUserId: actor.id,
  });
  if (!started.ok) {
    return projectConnectionsUnavailableJson();
  }

  // UI stub contract: { url }
  return Response.json({ url: started.url });
}
