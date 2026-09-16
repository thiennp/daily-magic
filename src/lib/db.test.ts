import { describe, expect, it } from "vitest";

import { isDatabaseUrlConfigured } from "@/lib/db";

describe("isDatabaseUrlConfigured", () => {
  it("returns false when DATABASE_URL is missing or blank", () => {
    const previousDatabaseUrl = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;
    expect(isDatabaseUrlConfigured()).toBe(false);

    process.env.DATABASE_URL = "   ";
    expect(isDatabaseUrlConfigured()).toBe(false);

    if (previousDatabaseUrl !== undefined) {
      process.env.DATABASE_URL = previousDatabaseUrl;
    } else {
      delete process.env.DATABASE_URL;
    }
  });

  it("returns true when DATABASE_URL is a non-empty string", () => {
    const previousDatabaseUrl = process.env.DATABASE_URL;
    process.env.DATABASE_URL = "postgresql://local/test";
    expect(isDatabaseUrlConfigured()).toBe(true);

    if (previousDatabaseUrl !== undefined) {
      process.env.DATABASE_URL = previousDatabaseUrl;
    } else {
      delete process.env.DATABASE_URL;
    }
  });
});
