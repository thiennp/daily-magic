import hashPairingToken from "@/lib/agentWitch/hashPairingToken";
import { asRowArray, getSql } from "@/lib/db";

interface AgentWitchDeviceForPairingToken {
  readonly id: string;
  readonly deviceLabel: string | null;
}

const getAgentWitchDeviceForPairingToken = async (
  pairingToken: string,
): Promise<AgentWitchDeviceForPairingToken | null> => {
  const sql = getSql();
  const tokenHash = hashPairingToken(pairingToken);
  const rows = asRowArray(
    await sql`
      SELECT id, device_label
      FROM agent_witch_devices
      WHERE token_hash = ${tokenHash}
        AND revoked_at IS NULL
      LIMIT 1
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return {
    id: String(rows[0].id),
    deviceLabel:
      rows[0].device_label === null || rows[0].device_label === undefined
        ? null
        : String(rows[0].device_label),
  };
};

export default getAgentWitchDeviceForPairingToken;
