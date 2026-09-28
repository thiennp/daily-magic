import { buildAgentWitchInstallCommandWithToken } from "@/lib/agentWitch/buildAgentWitchInstallCommandWithToken";
import { claimAgentWitchDevice } from "@/lib/agentWitch/claimAgentWitchDevice";
import { generateAgentWitchPairingToken } from "@/lib/agentWitch/generateAgentWitchPairingToken";
import hashPairingToken from "@/lib/agentWitch/hashPairingToken";
import { revokePendingInstallDevicesForUser } from "@/lib/agentWitch/revokePendingInstallDevicesForUser";

export const createAgentWitchInstallTokenForUser = async (input: {
  readonly userId: string;
  readonly email: string;
  readonly origin: string;
}): Promise<{
  readonly pairingToken: string;
  readonly tokenHash: string;
  readonly installCommand: string;
}> => {
  const pairingToken = generateAgentWitchPairingToken();
  const profileEmail = input.email.trim().toLowerCase();
  const tokenHash = hashPairingToken(pairingToken);

  await claimAgentWitchDevice({
    pairingToken,
    userId: input.userId,
    deviceLabel: null,
    recordLastSeen: false,
  });
  await revokePendingInstallDevicesForUser({
    userId: input.userId,
  });

  return {
    pairingToken,
    tokenHash,
    installCommand: buildAgentWitchInstallCommandWithToken({
      origin: input.origin,
      pairingToken,
      profileEmail,
    }),
  };
};
