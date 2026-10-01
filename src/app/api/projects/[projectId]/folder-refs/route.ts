import { listProjectFolderRefs } from "@/lib/projects/acl/listProjectFolderRefs";
import { upsertProjectFolderRef } from "@/lib/projects/acl/upsertProjectFolderRef";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
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
  const project = await getUserProjectById(projectId);
  if (project === null || project.ownerUserId !== actor.id) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  const folderRefs = await listProjectFolderRefs(projectId);
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

  const result = await upsertProjectFolderRef({
    projectId,
    ownerUserId: actor.id,
    machineOrDeviceRef,
    folderPath,
  });

  if (!result.ok) {
    const status =
      result.code === "forbidden"
        ? 403
        : result.code === "not_found"
          ? 404
          : 400;
    return Response.json({ ok: false, errorMessage: result.code }, { status });
  }

  return Response.json({ ok: true, folderRef: result.folderRef });
}
