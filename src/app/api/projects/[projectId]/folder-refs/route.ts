import { listProjectFolderRefs } from "@/lib/projects/acl/listProjectFolderRefs";
import { upsertProjectFolderRef } from "@/lib/projects/acl/upsertProjectFolderRef";
import { resolveFolderRefActor } from "@/lib/projects/acl/resolveFolderRefActor";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { projectId } = await context.params;
  const folderActor = await resolveFolderRefActor({
    projectId,
    actorUserId: actor.id,
  });
  // Viewers cannot manage folders but may read the ones members shared.
  const viewer = folderActor.ok
    ? null
    : await authorizeProjectPageActor({ projectId, actorUserId: actor.id });
  if (!folderActor.ok && !viewer?.ok) {
    const missing = folderActor.code === "not_found";
    return Response.json(
      { ok: false, errorMessage: missing ? "Project not found." : "forbidden" },
      { status: missing ? 404 : 403 },
    );
  }
  const isOwner = folderActor.ok && folderActor.isOwner;

  const folderRefs = await listProjectFolderRefs(
    projectId,
    isOwner ? null : actor.id,
  );
  return Response.json({
    ok: true,
    folderRefs: folderRefs.map((ref) => ({
      ...ref,
      isMine: isOwner || ref.deviceOwnerUserId === actor.id,
    })),
  });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { projectId } = await context.params;
  const body: unknown = await request.json().catch(() => null);
  const machineOrDeviceRef =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { machineOrDeviceRef?: unknown }).machineOrDeviceRef ===
      "string"
      ? (body as { machineOrDeviceRef: string }).machineOrDeviceRef
      : "";
  const folderPath =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { folderPath?: unknown }).folderPath === "string"
      ? (body as { folderPath: string }).folderPath
      : "";

  const deviceId =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { deviceId?: unknown }).deviceId === "string"
      ? (body as { deviceId: string }).deviceId
      : null;

  const shared =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { shared?: unknown }).shared === "boolean"
      ? (body as { shared: boolean }).shared
      : true;

  const result = await upsertProjectFolderRef({
    projectId,
    ownerUserId: actor.id,
    machineOrDeviceRef,
    folderPath,
    deviceId,
    shared,
  });

  if (!result.ok) {
    const status =
      result.code === "forbidden" ||
      result.code === "folder_ref_device_not_member"
        ? 403
        : result.code === "not_found"
          ? 404
          : 400;
    return projectAccessErrorJson(result.code, status);
  }

  return Response.json({ ok: true, folderRef: result.folderRef });
}
