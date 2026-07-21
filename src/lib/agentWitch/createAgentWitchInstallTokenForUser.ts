import { buildAgentWitchInstallCommandWithToken } from "@/lib/agentWitch/buildAgentWitchInstallCommandWithToken";
import { claimAgentWitchDevice } from "@/lib/agentWitch/claimAgentWitchDevice";
import { generateAgentWitchPairingToken } from "@/lib/agentWitch/generateAgentWitchPairingToken";
import { revokePendingInstallDevicesForUser } from "@/lib/agentWitch/revokePendingInstallDevicesForUser";

export const createAgentWitchInstallTokenForUser = async (input: {
  readonly userId: string;
  readonly email: string;
  readonly origin: string;
}): Promise<{
  readonly pairingToken: string;
  readonly installCommand: string;
}> => {
  const pairingToken = generateAgentWitchPairingToken();
  const profileEmail = input.email.trim().toLowerCase();

  await claimAgentWitchDevice({
    pairingToken,
    userId: input.userId,
    deviceLabel: null,
  });
  await revokePendingInstallDevicesForUser({
    userId: input.userId,
    keepPairingToken: pairingToken,
  });

  return {
    pairingToken,
    installCommand: buildAgentWitchInstallCommandWithToken({
      origin: input.origin,
      pairingToken,
      profileEmail,
    }),
  };
};
