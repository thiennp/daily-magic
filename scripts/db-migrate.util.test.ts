import { describe, expect, it } from "vitest";

import {
  listPendingMigrationFilenames,
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
});
