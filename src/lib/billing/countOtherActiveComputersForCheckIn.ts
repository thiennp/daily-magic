import { asRowArray, getSql } from "@/lib/db";

/**
 * 6abb783e: real (non-placeholder) computers other than the one checking in.
 * Rows with the same install label are the same computer being reinstalled
 * (they get superseded on check-in), so they do not count either.
 */
export const countOtherActiveComputersForCheckIn = async (input: {
  readonly userId: string;
  readonly deviceId: string;
  readonly sameComputerLabels: readonly string[];
}): Promise<number> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS n
      FROM agent_witch_devices
      WHERE user_id = ${input.userId}
        AND revoked_at IS NULL
        AND id <> ${input.deviceId}
        AND NOT (COALESCE(device_label, '') = ANY(${[...input.sameComputerLabels]}::text[]))
        AND NOT (
          install_bundle_version IS NULL
          AND public_key IS NULL
          AND last_handshake_at IS NULL
          AND COALESCE(btrim(display_name), '') = ''
          AND COALESCE(btrim(device_label), '') = ''
        )
    `,
  );
  return Number(rows[0]?.n ?? 0) || 0;
};
