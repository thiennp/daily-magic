import { asRowArray, getSql } from "@/lib/db";

export async function listActivePairedUserIds(
  userIds: readonly string[],
): Promise<ReadonlySet<string>> {
  if (userIds.length === 0) {
    return new Set();
  }

  const sql = getSql();
  const pairedIds = new Set<string>();

  for (const userId of userIds) {
    const result = asRowArray(
      await sql`
        SELECT user_id
        FROM agent_witch_devices
        WHERE user_id = ${userId}
          AND revoked_at IS NULL
        LIMIT 1
      `,
    );

    if (result[0]) {
      pairedIds.add(String(result[0].user_id));
    }
  }

  return pairedIds;
}
