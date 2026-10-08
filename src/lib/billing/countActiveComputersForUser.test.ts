import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => rows,
}));

import { countActiveComputersForUser } from "@/lib/billing/countActiveComputersForUser";
import { listActiveComputersForLimit } from "@/lib/billing/listActiveComputersForLimit";

const sqlTextOf = (call: readonly unknown[]): string => {
  const strings = call[0];
  return Array.isArray(strings) ? strings.join(" ") : String(strings);
};

const PLACEHOLDER_EXCLUSION = [
  "AND NOT (",
  "install_bundle_version IS NULL",
  "public_key IS NULL",
  "last_handshake_at IS NULL",
];

describe("computer limit ignores pending pairing placeholders (544db9dd)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("does not count placeholders toward the limit", async () => {
    sqlMock.mockResolvedValue([{ n: 4 }]);

    await expect(countActiveComputersForUser("user-1")).resolves.toBe(4);

    const text = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    for (const fragment of PLACEHOLDER_EXCLUSION) {
      expect(text).toContain(fragment);
    }
  });

  it("does not list placeholders in the limit message", async () => {
    sqlMock.mockResolvedValue([{ label: "Studio Mac", last_seen_at: null }]);

    await expect(listActiveComputersForLimit("user-1")).resolves.toEqual([
      { label: "Studio Mac", lastSeenAt: null },
    ]);

    const text = sqlTextOf(sqlMock.mock.calls[0] ?? []);
    for (const fragment of PLACEHOLDER_EXCLUSION) {
      expect(text).toContain(fragment);
    }
    expect(text).not.toContain("never installed");
  });
});
