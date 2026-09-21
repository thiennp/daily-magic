import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { readHarnessInstallArtifactGzip } from "@/lib/harness/readHarnessInstallArtifactGzip";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ artifactId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const { artifactId } = await context.params;
  const artifact = await readHarnessInstallArtifactGzip({
    artifactId,
    deviceId: auth.device.id,
  });

  if (artifact === null) {
    return Response.json(
      { ok: false, error: "Harness install artifact not found or expired." },
      { status: 404 },
    );
  }

  return new Response(new Uint8Array(artifact.bundleGzip), {
    status: 200,
    headers: {
      "Content-Type": "application/gzip",
      "Cache-Control": "private, no-store",
      "X-Content-Sha256": artifact.contentSha256,
    },
  });
}
