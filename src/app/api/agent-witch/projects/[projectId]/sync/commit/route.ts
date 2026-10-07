import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { ensureProjectSyncSchema } from "@/lib/projects/acl/sync/ensureProjectSyncSchema";
import { commitProjectSyncOffer } from "@/lib/projects/acl/sync/commitProjectSyncOffer";

export const dynamic = "force-dynamic";

/**
 * Device uploads one sync file (v1: body in the offer). Checksums + size +
 * secret scan enforced server-side.
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const { projectId } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    path?: unknown;
    baseSeq?: unknown;
    contentSha256?: unknown;
    bodyUtf8?: unknown;
  } | null;
  if (
    body === null ||
    typeof body.path !== "string" ||
    typeof body.contentSha256 !== "string" ||
    typeof body.bodyUtf8 !== "string" ||
    typeof body.baseSeq !== "number"
  ) {
    return Response.json(
      { ok: false, errorMessage: "path, baseSeq, contentSha256, bodyUtf8 required." },
      { status: 400 },
    );
  }
  await ensureProjectSyncSchema();
  const result = await commitProjectSyncOffer({
    projectId: projectId.trim(),
    deviceId: auth.device.id,
    path: body.path,
    baseSeq: body.baseSeq,
    contentSha256: body.contentSha256,
    bodyUtf8: body.bodyUtf8,
  });
  if (!result.ok) {
    const status =
      result.code === "too_large" || result.code === "secret_suspect"
        ? 413
        : result.code === "not_enabled" || result.code === "not_member"
          ? 403
          : 400;
    return Response.json({ ok: false, code: result.code }, { status });
  }
  return Response.json({ ok: true, ...result });
}
