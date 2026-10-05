import { buildAgentWitchLocalTooOldRefusalResponse } from "@/lib/agentWitch/buildAgentWitchLocalTooOldRefusalResponse";
import { classifyAgentWitchLocalConnectVersion } from "@/lib/agentWitch/classifyAgentWitchLocalConnectVersion";
import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";

/**
 * When Connect/dispatch targets a device whose reported install bundle is
 * too old (or missing), return the shared HTTP 409 response; otherwise null.
 */
export const refuseTooOldAgentWitchDeviceForConnect = async (
  deviceId: string | null | undefined,
): Promise<Response | null> => {
  if (
    deviceId === null ||
    deviceId === undefined ||
    deviceId.trim().length === 0
  ) {
    return null;
  }

  const device = await findAgentWitchDeviceById(deviceId.trim());
  const installBundleVersion = device?.installBundleVersion ?? null;
  if (classifyAgentWitchLocalConnectVersion(installBundleVersion) === "too_old") {
    return buildAgentWitchLocalTooOldRefusalResponse(installBundleVersion);
  }

  return null;
};
