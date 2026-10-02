import { renameProjectMembershipDisplayName } from "@/lib/projects/acl/displayNames/renameProjectMembershipDisplayName";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

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
  const projectDisplayName =
    body !== null &&
    typeof body === "object" &&
    "projectDisplayName" in body
      ? (body as { projectDisplayName: unknown }).projectDisplayName
      : undefined;

  const result = await renameProjectMembershipDisplayName({
    projectId,
    membershipId,
    ownerUserId: actor.id,
    projectDisplayName,
  });
  if (!result.ok) {
    const status =
      result.code === "forbidden"
        ? 403
        : result.code === "not_found" || result.code === "not_active"
          ? 404
          : result.code === "display_name_taken"
            ? 409
            : result.code === "display_name_reserved"
              ? 422
              : 400;
    return projectAccessErrorJson(result.code, status);
  }
  return Response.json({ ok: true, membership: result.membership });
}
