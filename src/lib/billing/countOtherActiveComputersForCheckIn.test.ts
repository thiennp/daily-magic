import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => rows,
}));

import { countOtherActiveComputersForCheckIn } from "@/lib/billing/countOtherActiveComputersForCheckIn";

describe("countOtherActiveComputersForCheckIn (6abb783e)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("counts other real computers, not this one, placeholders, or the same computer reinstalled", async () => {
    sqlMock.mockResolvedValue([{ n: 5 }]);

    await expect(
      countOtherActiveComputersForCheckIn({
        userId: "u-1",
        deviceId: "p-6",
        sameComputerLabels: ["Studio#me", "Studio"],
      }),
    ).resolves.toBe(5);

    const call = sqlMock.mock.calls[0] ?? [];
    const text = (call[0] as readonly string[]).join(" ");
    expect(text).toContain("revoked_at IS NULL");
    expect(text).toContain("id <>");
    expect(text).toContain("= ANY(");
    expect(text).toContain("AND NOT (");
    expect(call.slice(1)).toEqual(["u-1", "p-6", ["Studio#me", "Studio"]]);
  });
});
