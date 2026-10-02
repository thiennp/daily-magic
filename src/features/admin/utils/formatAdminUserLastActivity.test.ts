import { describe, expect, it } from "vitest";

import formatAdminUserLastActivity from "@/features/admin/utils/formatAdminUserLastActivity";

describe("formatAdminUserLastActivity", () => {
  it("returns em dash when lastActivityAt is null (never uses createdAt)", () => {
    expect(formatAdminUserLastActivity(null)).toBe("—");
  });

  it("returns em dash for invalid ISO", () => {
    expect(formatAdminUserLastActivity("not-a-date")).toBe("—");
  });

  it("formats a valid ISO timestamp without falling back to createdAt", () => {
    const formatted = formatAdminUserLastActivity("2026-06-01T12:00:00.000Z");
    expect(formatted).not.toBe("—");
    expect(formatted.length).toBeGreaterThan(0);
  });
});
