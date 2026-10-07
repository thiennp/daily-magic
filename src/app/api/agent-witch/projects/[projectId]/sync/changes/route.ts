import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { ensureProjectSyncSchema } from "@/lib/projects/acl/sync/ensureProjectSyncSchema";
import { listProjectSyncChangesSince } from "@/lib/projects/acl/sync/listProjectSyncChangesSince";

export const dynamic = "force-dynamic";

/** Pull change log since seq (resume). */
export async function GET(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const { projectId } = await context.params;
  const since = Number(
    new URL(request.url).searchParams.get("since") ?? "0",
  );
  await ensureProjectSyncSchema();
  const result = await listProjectSyncChangesSince({
    projectId: projectId.trim(),
    deviceId: auth.device.id,
    sinceSeq: Number.isFinite(since) ? since : 0,
  });
  if (!result.ok) {
    return Response.json({ ok: false, code: result.code }, { status: 403 });
  }
  return Response.json({ ok: true, changes: result.changes });
}
