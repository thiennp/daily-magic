import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { setBotIsolation } from "@/lib/projects/acl/setBotIsolation";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

/** PATCH { isolated?: boolean, closed?: boolean } — owner or the inviting member. */
export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      readonly projectId: string;
      readonly membershipId: string;
    }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { projectId, membershipId } = await context.params;
  const body: unknown = await request.json().catch(() => ({}));
  const flags =
    body !== null && typeof body === "object"
      ? (body as { isolated?: unknown; closed?: unknown })
      : {};
  const isolated =
    typeof flags.isolated === "boolean" ? flags.isolated : undefined;
  const closed = typeof flags.closed === "boolean" ? flags.closed : undefined;
  if (isolated === undefined && closed === undefined) {
    return Response.json(
      { ok: false, errorMessage: "isolated or closed (boolean) required" },
      { status: 400 },
    );
  }
  const result = await setBotIsolation({
    projectId,
    membershipId,
    actorUserId: actor.id,
    isolated,
    closed,
  });
  if (!result.ok) {
    return projectAccessErrorJson(
      result.code,
      result.code === "forbidden" ? 403 : 404,
    );
  }
  return Response.json({ ok: true });
}
