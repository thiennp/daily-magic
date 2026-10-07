import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { ensureProjectSyncSchema } from "@/lib/projects/acl/sync/ensureProjectSyncSchema";
import { loadProjectSyncBlobUtf8 } from "@/lib/projects/acl/sync/loadProjectSyncBlobUtf8";

export const dynamic = "force-dynamic";

/** Download one sync blob by sha (resume unit = whole file in v1). */
export async function GET(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const { projectId } = await context.params;
  const sha = new URL(request.url).searchParams.get("sha")?.trim() ?? "";
  if (sha.length === 0) {
    return Response.json(
      { ok: false, errorMessage: "sha is required." },
      { status: 400 },
    );
  }
  await ensureProjectSyncSchema();
  const result = await loadProjectSyncBlobUtf8({
    projectId: projectId.trim(),
    deviceId: auth.device.id,
    contentSha256: sha,
  });
  if (!result.ok) {
    const status = result.code === "not_found" ? 404 : 403;
    return Response.json({ ok: false, code: result.code }, { status });
  }
  return Response.json({
    ok: true,
    bodyUtf8: result.bodyUtf8,
    sizeBytes: result.sizeBytes,
  });
}
