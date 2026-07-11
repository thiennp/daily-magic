import { asRowArray, getSql } from "@/lib/db";

export async function revokeAgentWitchDevice(input: {
  readonly deviceId: string;
  readonly userId: string;
}): Promise<boolean> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE agent_witch_devices
      SET revoked_at = NOW()
      WHERE id = ${input.deviceId}
        AND user_id = ${input.userId}
        AND revoked_at IS NULL
      RETURNING id
    `,
  );

  return result.length > 0;
}
