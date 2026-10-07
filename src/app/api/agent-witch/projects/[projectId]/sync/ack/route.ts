import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { ackProjectSyncSeq } from "@/lib/projects/acl/sync/ackProjectSyncSeq";
import { ensureProjectSyncSchema } from "@/lib/projects/acl/sync/ensureProjectSyncSchema";

export const dynamic = "force-dynamic";

/** Device applied a sync seq (feeds prune for chat files). */
export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const { projectId } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    seq?: unknown;
  } | null;
  if (body === null || typeof body.seq !== "number") {
    return Response.json(
      { ok: false, errorMessage: "seq is required." },
      { status: 400 },
    );
  }
  await ensureProjectSyncSchema();
  const result = await ackProjectSyncSeq({
    projectId: projectId.trim(),
    deviceId: auth.device.id,
    seq: body.seq,
  });
  if (!result.ok) {
    const status = result.code === "not_found" ? 404 : 403;
    return Response.json({ ok: false, code: result.code }, { status });
  }
  return Response.json({ ok: true });
}
