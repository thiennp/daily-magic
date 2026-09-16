import { asRowArray, getSql } from "@/lib/db";

export const DEVICE_SUPERSESSION_MIGRATION_FILENAME =
  "026-agent-witch-device-supersession.sql";

export const readDeviceSupersessionMigrationApplied =
  async (): Promise<boolean> => {
    const sql = getSql();
    const rows = asRowArray(
      await sql`
        SELECT 1 AS applied
        FROM schema_migrations
        WHERE filename = ${DEVICE_SUPERSESSION_MIGRATION_FILENAME}
        LIMIT 1
      `,
    );

    return rows.length > 0;
  };
