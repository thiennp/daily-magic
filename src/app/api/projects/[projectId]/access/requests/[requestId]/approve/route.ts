import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly requestId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { projectId, requestId } = await context.params;
  const body: unknown = await request.json().catch(() => ({}));
  const payload =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  const teamLabel =
    typeof payload.teamLabel === "string" ? payload.teamLabel : null;
  const projectDisplayName =
    typeof payload.projectDisplayName === "string"
      ? payload.projectDisplayName
      : payload.projectDisplayName === null
        ? null
        : undefined;
  const scopes = Array.isArray(payload.scopes)
    ? payload.scopes.filter((s): s is string => typeof s === "string")
    : null;

  const result = await approveProjectAccessRequest({
    projectId,
    requestId,
    ownerUserId: actor.id,
    teamLabel,
    projectDisplayName,
    scopes,
  });

  if (!result.ok) {
    const status =
      result.code === "forbidden"
        ? 403
        : result.code === "not_found"
          ? 404
          : result.code === "display_name_taken"
            ? 409
            : result.code === "display_name_reserved"
              ? 422
              : result.code === "display_name_required" ||
                  result.code === "display_name_invalid"
                ? 400
                : 409;
    return projectAccessErrorJson(result.code, status);
  }

  // Do not return projectApiKey plaintext to owner session (A2 / A6).
  return Response.json({
    ok: true,
    request: result.request,
    membership: result.membership,
  });
}
