import { describe, expect, it } from "vitest";
import { toPostgresTimestamptz } from "@/lib/projects/acl/messaging/toPostgresTimestamptz";

describe("toPostgresTimestamptz", () => {
  it("returns null for nullish/empty", () => {
    expect(toPostgresTimestamptz(null)).toBeNull();
    expect(toPostgresTimestamptz(undefined)).toBeNull();
    expect(toPostgresTimestamptz("")).toBeNull();
    expect(toPostgresTimestamptz("   ")).toBeNull();
  });

  it("ISO-normalizes Date", () => {
    const d = new Date("2026-10-05T08:38:04.859Z");
    expect(toPostgresTimestamptz(d)).toBe("2026-10-05T08:38:04.859Z");
  });

  it("ISO-normalizes String(Date) GMT+0200 form that Postgres rejects", () => {
    const legacy = String(new Date("2026-10-05T08:38:04.859Z"));
    expect(legacy).toMatch(/GMT/i);
    const iso = toPostgresTimestamptz(legacy);
    expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}T.*Z$/);
    expect(iso).not.toMatch(/GMT/i);
    expect(Number.isNaN(new Date(iso!).getTime())).toBe(false);
  });

  it("keeps ISO strings as ISO", () => {
    expect(toPostgresTimestamptz("2026-10-05T08:38:04.859Z")).toBe(
      "2026-10-05T08:38:04.859Z",
    );
  });
});
