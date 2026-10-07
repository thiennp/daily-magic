import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { ensureProjectSyncSchema } from "@/lib/projects/acl/sync/ensureProjectSyncSchema";
import { setProjectSyncDeviceEnabled } from "@/lib/projects/acl/sync/setProjectSyncDeviceEnabled";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export const dynamic = "force-dynamic";

/**
 * Owner enables/disables Sync this computer. Validates computer ∈ project.
 * Body: { deviceId, enabled }.
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const { projectId } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    deviceId?: unknown;
    enabled?: unknown;
    folderRefId?: unknown;
  } | null;
  if (
    body === null ||
    typeof body.deviceId !== "string" ||
    typeof body.enabled !== "boolean"
  ) {
    return Response.json(
      { ok: false, errorMessage: "deviceId and enabled are required." },
      { status: 400 },
    );
  }
  const project = await getUserProjectById(projectId.trim());
  const isOwner = project?.ownerUserId === auth.device.userId;
  await ensureProjectSyncSchema();
  const result = await setProjectSyncDeviceEnabled({
    projectId: projectId.trim(),
    deviceId: body.deviceId,
    enabled: body.enabled,
    actorUserId: auth.device.userId,
    folderRefId:
      typeof body.folderRefId === "string" ? body.folderRefId : null,
    isOwner: isOwner === true,
  });
  if (!result.ok) {
    return Response.json({ ok: false, code: result.code }, { status: 403 });
  }
  return Response.json({ ok: true, enabled: result.enabled });
}
