import { deleteProjectFolderRef } from "@/lib/projects/acl/deleteProjectFolderRef";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly refId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { projectId, refId } = await context.params;
  const result = await deleteProjectFolderRef({
    projectId,
    refId,
    ownerUserId: actor.id,
  });

  if (!result.ok) {
    const status = result.code === "forbidden" ? 403 : 404;
    return Response.json({ ok: false, errorMessage: result.code }, { status });
  }

  return Response.json({ ok: true });
}
