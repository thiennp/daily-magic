import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import parseSyncProjectHarnessBindingsBody from "@/lib/projects/parseSyncProjectHarnessBindingsBody";
import syncProjectHarnessBindingsForDevice from "@/lib/projects/syncProjectHarnessBindingsForDevice";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const body: unknown = await request.json().catch(() => null);
  const harnessSetSlugs = parseSyncProjectHarnessBindingsBody(body);

  if (harnessSetSlugs === null) {
    return Response.json(
      { ok: false, errorMessage: "Invalid harness binding payload." },
      { status: 400 },
    );
  }

  const { projectId } = await context.params;
  const result = await syncProjectHarnessBindingsForDevice({
    ownerUserId: auth.device.userId,
    deviceId: auth.device.id,
    projectId: projectId.trim(),
    harnessSetSlugs,
  });

  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.errorMessage },
      { status: result.errorMessage === "Project not found." ? 404 : 400 },
    );
  }

  return Response.json({
    ok: true,
    boundHarnessCount: result.boundHarnessCount,
  });
}
