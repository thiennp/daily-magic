import { describe, expect, it } from "vitest";

import {
  listLegacySchemaSqlMigrationFilenames,
  listPendingMigrationFilenames,
  SCHEMA_SQL_SNAPSHOT_CUTOFF_MIGRATION,
  sortMigrationFilenames,
} from "./db-migrate.util";

describe("db-migrate.util", () => {
  it("sorts sql migration files lexicographically", () => {
    expect(
      sortMigrationFilenames([
        "013-onboarding.sql",
        "002-super-admin.sql",
        "README.md",
      ]),
    ).toEqual(["002-super-admin.sql", "013-onboarding.sql"]);
  });

  it("returns only pending migrations", () => {
    const pending = listPendingMigrationFilenames(
      ["002-super-admin.sql", "013-onboarding.sql"],
      new Set(["002-super-admin.sql"]),
    );

    expect(pending).toEqual(["013-onboarding.sql"]);
  });

  it("records legacy schema.sql migrations when snapshot columns exist", () => {
    const filenames = [
      "002-super-admin.sql",
      SCHEMA_SQL_SNAPSHOT_CUTOFF_MIGRATION,
      "019-future.sql",
    ];
    const legacy = listLegacySchemaSqlMigrationFilenames(
      filenames,
      new Set(["002-super-admin.sql"]),
      true,
    );

    expect(legacy).toEqual([SCHEMA_SQL_SNAPSHOT_CUTOFF_MIGRATION]);
  });

  it("skips legacy bootstrap when schema.sql snapshot is absent", () => {
    const legacy = listLegacySchemaSqlMigrationFilenames(
      ["002-super-admin.sql", SCHEMA_SQL_SNAPSHOT_CUTOFF_MIGRATION],
      new Set(),
      false,
    );

    expect(legacy).toEqual([]);
  });
});
