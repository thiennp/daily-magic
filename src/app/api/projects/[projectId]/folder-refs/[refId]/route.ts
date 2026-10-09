import { setProjectFolderRefShared } from "@/lib/projects/acl/setProjectFolderRefShared";
import { deleteProjectFolderRef } from "@/lib/projects/acl/deleteProjectFolderRef";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
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
    return projectAccessErrorJson(result.code, status);
  }

  return Response.json({ ok: true });
}

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly refId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { projectId, refId } = await context.params;
  const body: unknown = await request.json().catch(() => null);
  const shared =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { shared?: unknown }).shared === "boolean"
      ? (body as { shared: boolean }).shared
      : null;
  if (shared === null) {
    return Response.json(
      { ok: false, errorMessage: "shared must be a boolean." },
      { status: 400 },
    );
  }

  const result = await setProjectFolderRefShared({
    projectId,
    refId,
    actorUserId: actor.id,
    shared,
  });
  if (!result.ok) {
    const status = result.code === "forbidden" ? 403 : 404;
    return projectAccessErrorJson(result.code, status);
  }
  return Response.json({ ok: true, shared: result.shared });
}
