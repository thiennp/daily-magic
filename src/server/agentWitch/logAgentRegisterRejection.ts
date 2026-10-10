import { findAgentWitchDeviceRevokeAuditByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";

/** One structured line so a `device_not_linked` is explainable from server logs. */
export const logAgentRegisterRejection = async (
  pairingToken: string,
  errorCode: string | undefined,
): Promise<void> => {
  try {
    const audit = await findAgentWitchDeviceRevokeAuditByToken(pairingToken);
    console.warn(
      JSON.stringify({
        event: "agent_register_rejected",
        errorCode: errorCode ?? null,
        deviceId: audit?.deviceId ?? null,
        revokedReason: audit?.revokedReason ?? null,
        supersededByDeviceId: audit?.supersededByDeviceId ?? null,
      }),
    );
  } catch {
    // Diagnostics only.
  }
};
