import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import {
  isProjectConnectionsFeatureEnabled,
  resolveProjectConnectionsAuthSecret,
} from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { parseProjectConnectionProvider } from "@/lib/projects/connections/parseProjectConnectionProvider";
import { startProjectConnectionOAuth } from "@/lib/projects/connections/startProjectConnectionOAuth";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string; readonly provider: string }>;
};

/**
 * POST /api/projects/:projectId/connections/:provider/start
 * Owner only. Success: { url }. Missing env / phase-2 → 501 unavailable.
 */
export async function POST(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  if (
    !isProjectConnectionsFeatureEnabled() ||
    resolveProjectConnectionsAuthSecret() === null
  ) {
    return Response.json(
      { ok: false, code: "unavailable", errorMessage: "Connections are not available on this deploy yet." },
      { status: 501 },
    );
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

  const started = startProjectConnectionOAuth({
    projectId,
    provider,
    actorUserId: actor.id,
  });
  if (!started.ok) {
    return Response.json(
      {
        ok: false,
        code: "unavailable",
        errorMessage: "Connections are not available on this deploy yet.",
      },
      { status: 501 },
    );
  }

  // UI stub contract: { url }
  return Response.json({ url: started.url });
}
