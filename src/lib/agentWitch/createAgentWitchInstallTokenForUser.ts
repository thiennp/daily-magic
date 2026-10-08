import { buildAgentWitchInstallCommandWithToken } from "@/lib/agentWitch/buildAgentWitchInstallCommandWithToken";
import { claimAgentWitchDevice } from "@/lib/agentWitch/claimAgentWitchDevice";
import { generateAgentWitchPairingToken } from "@/lib/agentWitch/generateAgentWitchPairingToken";
import hashPairingToken from "@/lib/agentWitch/hashPairingToken";
import { reusePendingConnectPlaceholder } from "@/lib/agentWitch/reusePendingConnectPlaceholder";
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

  // bca9b1eb: reuse the newest never-checked-in pairing row, don't stack more.
  const reused = await reusePendingConnectPlaceholder({
    userId: input.userId,
    tokenHash,
  });
  if (!reused) {
    await claimAgentWitchDevice({
      pairingToken,
      userId: input.userId,
      deviceLabel: null,
      recordLastSeen: false,
    });
  }
  await revokePendingInstallDevicesForUser({
    userId: input.userId,
    protectTokenHash: tokenHash,
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
