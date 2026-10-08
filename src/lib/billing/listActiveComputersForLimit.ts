import { asRowArray, getSql } from "@/lib/db";

export interface ActiveComputerForLimit {
  readonly label: string;
  readonly lastSeenAt: string | null;
}

/** The non-revoked computers the plan limit counts, with the name the list shows. */
export const listActiveComputersForLimit = async (
  userId: string,
): Promise<readonly ActiveComputerForLimit[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        CASE
          WHEN install_bundle_version IS NULL
            AND public_key IS NULL
            AND last_handshake_at IS NULL
            AND COALESCE(btrim(display_name), '') = ''
            AND COALESCE(btrim(device_label), '') = ''
          THEN 'a Connect that was never installed'
          ELSE COALESCE(
            NULLIF(btrim(display_name), ''),
            NULLIF(btrim(device_label), ''),
            'Unnamed computer'
          )
        END AS label,
        last_seen_at
      FROM agent_witch_devices
      WHERE user_id = ${userId}
        AND revoked_at IS NULL
      ORDER BY COALESCE(last_seen_at, claimed_at) DESC
    `,
  );
  return rows.map((row) => ({
    label: String(row.label),
    lastSeenAt:
      row.last_seen_at === null || row.last_seen_at === undefined
        ? null
        : new Date(String(row.last_seen_at)).toISOString(),
  }));
};
