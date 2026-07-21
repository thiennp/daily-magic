import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import { getAgentWitchPairingStore } from "@/lib/agentWitch/getAgentWitchHub";
import { touchAgentWitchDeviceLastSeen } from "@/lib/agentWitch/touchAgentWitchDeviceLastSeen";

export const registerAgentWitchInstallFromMac = async (input: {
  readonly pairingToken: string;
  readonly deviceLabel: string;
}): Promise<{ readonly ok: true; readonly deviceId: string } | null> => {
  const device = await findAgentWitchDeviceByToken(input.pairingToken);
  if (device === null || device.revokedAt !== null) {
    return null;
  }

  await touchAgentWitchDeviceLastSeen(input.pairingToken, input.deviceLabel);
  await getAgentWitchPairingStore().touchLastSeen(
    input.pairingToken,
    input.deviceLabel,
  );

  return { ok: true, deviceId: device.id };
};
