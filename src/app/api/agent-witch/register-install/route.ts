import { buildAgentWitchLocalTooOldRefusalResponse } from "@/lib/agentWitch/buildAgentWitchLocalTooOldRefusalResponse";
import { classifyAgentWitchLocalConnectVersion } from "@/lib/agentWitch/classifyAgentWitchLocalConnectVersion";
import { parseRegisterInstallBody } from "@/lib/agentWitch/parseRegisterInstallBody";
import { registerAgentWitchInstallFromMac } from "@/lib/agentWitch/registerAgentWitchInstallFromMac";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const parsed = parseRegisterInstallBody(await request.json());

  if (parsed === null) {
    return Response.json(
      { error: "pairingToken and deviceLabel are required." },
      { status: 400 },
    );
  }

  const registered = await registerAgentWitchInstallFromMac(parsed);
  if (registered === null) {
    return Response.json(
      { error: "Install token is not valid." },
      { status: 404 },
    );
  }
  if (!registered.ok) {
    return Response.json(
      { error: registered.errorMessage, code: registered.code },
      { status: 403 },
    );
  }

  const installBundleVersion = parsed.installBundleVersion ?? null;
  if (
    classifyAgentWitchLocalConnectVersion(installBundleVersion) === "too_old"
  ) {
    return buildAgentWitchLocalTooOldRefusalResponse(installBundleVersion);
  }

  return Response.json({
    ok: true,
    deviceId: registered.deviceId,
  });
}
