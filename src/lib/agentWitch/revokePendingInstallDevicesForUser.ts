import hashPairingToken from "@/lib/agentWitch/hashPairingToken";
import { getSql } from "@/lib/db";

export const revokePendingInstallDevicesForUser = async (input: {
  readonly userId: string;
  readonly keepPairingToken: string;
}): Promise<void> => {
  const sql = getSql();
  const keepTokenHash = hashPairingToken(input.keepPairingToken);

  await sql`
    UPDATE agent_witch_devices
    SET revoked_at = NOW()
    WHERE user_id = ${input.userId}
      AND revoked_at IS NULL
      AND last_seen_at IS NULL
      AND token_hash <> ${keepTokenHash}
  `;
};
