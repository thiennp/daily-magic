import { listProjectFolderRefs } from "@/lib/projects/acl/listProjectFolderRefs";
import { upsertProjectFolderRef } from "@/lib/projects/acl/upsertProjectFolderRef";
import { resolveFolderRefActor } from "@/lib/projects/acl/resolveFolderRefActor";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
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
  if (!folderActor.ok) {
    const missing = folderActor.code === "not_found";
    return Response.json(
      { ok: false, errorMessage: missing ? "Project not found." : "forbidden" },
      { status: missing ? 404 : 403 },
    );
  }

  const folderRefs = await listProjectFolderRefs(
    projectId,
    folderActor.isOwner ? null : actor.id,
  );
  return Response.json({ ok: true, folderRefs });
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

  const result = await upsertProjectFolderRef({
    projectId,
    ownerUserId: actor.id,
    machineOrDeviceRef,
    folderPath,
    deviceId,
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
