import hashPairingToken from "@/lib/agentWitch/hashPairingToken";
import { getSql } from "@/lib/db";

export async function touchAgentWitchDeviceLastSeen(
  pairingToken: string,
  deviceLabel?: string | null,
): Promise<void> {
  const sql = getSql();
  const tokenHash = hashPairingToken(pairingToken);
  const label = deviceLabel ?? null;

  await sql`
    UPDATE agent_witch_devices
    SET
      last_seen_at = NOW(),
      device_label = COALESCE(${label}, device_label)
    WHERE token_hash = ${tokenHash}
      AND revoked_at IS NULL
  `;
}
