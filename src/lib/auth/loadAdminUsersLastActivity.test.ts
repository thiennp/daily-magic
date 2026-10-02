import { describe, expect, it, vi } from "vitest";

import loadAdminUsersLastActivity from "@/lib/auth/loadAdminUsersLastActivity";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("loadAdminUsersLastActivity", () => {
  it("maps user_id to ISO last_activity_at from one SQL aggregation", async () => {
    sqlMock.mockResolvedValue([
      {
        user_id: "u1",
        last_activity_at: new Date("2026-04-01T10:00:00.000Z"),
      },
      { user_id: "u2", last_activity_at: "2026-05-02T11:00:00.000Z" },
      { user_id: "u3", last_activity_at: null },
    ]);

    const map = await loadAdminUsersLastActivity();

    expect(sqlMock).toHaveBeenCalledTimes(1);
    expect(map.get("u1")).toBe("2026-04-01T10:00:00.000Z");
    expect(map.get("u2")).toBe("2026-05-02T11:00:00.000Z");
    expect(map.has("u3")).toBe(false);
  });
});
