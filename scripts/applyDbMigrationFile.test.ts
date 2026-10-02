import { describe, expect, it } from "vitest";

import {
  applyDbMigrationFile,
  type MigrationDbClient,
  type MigrationDbPool,
} from "./applyDbMigrationFile";

const MIGRATION_FILENAME = "043-user-projects-repo-urls.sql";
const MIGRATION_SQL =
  "ALTER TABLE user_projects ADD COLUMN IF NOT EXISTS repo_urls TEXT[];";

class FakeMigrationDatabase implements MigrationDbPool {
  readonly filenames = new Set<string>();

  sqlRunCount = 0;

  releaseCount = 0;

  private lockHeld = false;

  private readonly lockWaiters: Array<() => void> = [];

  constructor(
    private readonly options: {
      readonly delaySqlMs?: number;
      readonly failSql?: boolean;
    } = {},
  ) {}

  connect(): Promise<MigrationDbClient> {
    const session = { holdsLock: false };
    const pendingInserts: string[] = [];
    const pendingSqlRuns = { count: 0 };

    const releaseLock = (): void => {
      if (!session.holdsLock) {
        return;
      }

      session.holdsLock = false;
      const nextWaiter = this.lockWaiters.shift();

      if (nextWaiter) {
        this.lockHeld = true;
        session.holdsLock = false;
        nextWaiter();
        return;
      }

      this.lockHeld = false;
    };

    const client: MigrationDbClient = {
      query: async (sql, values) => {
        if (sql === "BEGIN" || sql === "COMMIT" || sql === "ROLLBACK") {
          if (sql === "COMMIT") {
            for (const pendingFilename of pendingInserts) {
              if (this.filenames.has(pendingFilename)) {
                throw new Error(
                  'duplicate key value violates unique constraint "schema_migrations_pkey"',
                );
              }

              this.filenames.add(pendingFilename);
            }

            this.sqlRunCount += pendingSqlRuns.count;
          }

          if (sql === "COMMIT" || sql === "ROLLBACK") {
            pendingInserts.splice(0, pendingInserts.length);
            pendingSqlRuns.count = 0;
            releaseLock();
          }

          return { rows: [] };
        }

        if (sql.startsWith("SELECT pg_advisory_xact_lock")) {
          if (this.lockHeld) {
            await new Promise<void>((resolve) => {
              this.lockWaiters.push(() => {
                session.holdsLock = true;
                resolve();
              });
            });
          } else {
            this.lockHeld = true;
            session.holdsLock = true;
          }

          return { rows: [] };
        }

        if (sql.startsWith("SELECT filename FROM schema_migrations WHERE")) {
          const filename = values?.[0];
          const rows =
            typeof filename === "string" && this.filenames.has(filename)
              ? [{ filename }]
              : [];

          return { rows };
        }

        if (sql.startsWith("INSERT INTO schema_migrations")) {
          const filename = values?.[0];

          if (typeof filename !== "string") {
            throw new Error("migration filename is missing");
          }

          if (
            this.filenames.has(filename) ||
            pendingInserts.includes(filename)
          ) {
            throw new Error(
              'duplicate key value violates unique constraint "schema_migrations_pkey"',
            );
          }

          pendingInserts.push(filename);
          return { rows: [] };
        }

        if (this.options.failSql) {
          throw new Error("migration sql failed");
        }

        const delaySqlMs = this.options.delaySqlMs ?? 0;

        if (delaySqlMs > 0) {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, delaySqlMs);
          });
        }

        pendingSqlRuns.count += 1;
        return { rows: [] };
      },
      release: () => {
        this.releaseCount += 1;
      },
    };

    return Promise.resolve(client);
  }
}

describe("applyDbMigrationFile", () => {
  it("runs SQL once and records the filename", async () => {
    const database = new FakeMigrationDatabase();

    await applyDbMigrationFile(database, MIGRATION_FILENAME, MIGRATION_SQL);

    expect(database.sqlRunCount).toBe(1);
    expect(database.filenames.has(MIGRATION_FILENAME)).toBe(true);
    expect(database.releaseCount).toBe(1);
  });

  it("skips SQL when the filename is already recorded", async () => {
    const database = new FakeMigrationDatabase();
    database.filenames.add(MIGRATION_FILENAME);

    await applyDbMigrationFile(database, MIGRATION_FILENAME, MIGRATION_SQL);

    expect(database.sqlRunCount).toBe(0);
    expect(database.releaseCount).toBe(1);
  });

  it("lets a second concurrent migrate skip after the first records the filename", async () => {
    const database = new FakeMigrationDatabase({ delaySqlMs: 30 });

    await Promise.all([
      applyDbMigrationFile(database, MIGRATION_FILENAME, MIGRATION_SQL),
      applyDbMigrationFile(database, MIGRATION_FILENAME, MIGRATION_SQL),
    ]);

    expect(database.sqlRunCount).toBe(1);
    expect(database.filenames.has(MIGRATION_FILENAME)).toBe(true);
    expect(database.releaseCount).toBe(2);
  });

  it("rolls back and does not record the filename when SQL fails", async () => {
    const database = new FakeMigrationDatabase({ failSql: true });

    await expect(
      applyDbMigrationFile(database, MIGRATION_FILENAME, MIGRATION_SQL),
    ).rejects.toThrow("migration sql failed");

    expect(database.filenames.has(MIGRATION_FILENAME)).toBe(false);
    expect(database.sqlRunCount).toBe(0);
    expect(database.releaseCount).toBe(1);
  });
});
