import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => rows,
}));

import {
  AGENT_WITCH_CONNECT_PLACEHOLDER_TTL_HOURS,
  revokeStaleConnectPlaceholders,
} from "@/lib/agentWitch/revokeStaleConnectPlaceholders";
import {
  CONNECT_PLACEHOLDER_SWEEP_INTERVAL_MS,
  startConnectPlaceholderSweep,
} from "@/lib/agentWitch/startConnectPlaceholderSweep";

const sqlTextOf = (call: readonly unknown[]): string => {
  const strings = call[0];
  return Array.isArray(strings) ? strings.join(" ") : String(strings);
};

describe("revokeStaleConnectPlaceholders (544db9dd)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("revokes only never-checked-in placeholders older than the TTL", async () => {
    sqlMock.mockResolvedValue([{ id: "p-1" }, { id: "p-2" }]);

    await expect(revokeStaleConnectPlaceholders()).resolves.toBe(2);

    const call = sqlMock.mock.calls[0] ?? [];
    const text = sqlTextOf(call);
    expect(text).toContain("SET revoked_at = NOW()");
    expect(text).toContain("install_bundle_version IS NULL");
    expect(text).toContain("public_key IS NULL");
    expect(text).toContain("last_handshake_at IS NULL");
    expect(text).toContain("btrim(device_label)");
    expect(text).toContain("claimed_at < NOW() - make_interval(hours =>");
    expect(call.slice(1)).toContain(AGENT_WITCH_CONNECT_PLACEHOLDER_TTL_HOURS);
    expect(AGENT_WITCH_CONNECT_PLACEHOLDER_TTL_HOURS).toBe(24);
  });

  it("sweeps on start and then on an interval", async () => {
    sqlMock.mockResolvedValue([]);
    const scheduled: number[] = [];

    startConnectPlaceholderSweep((_run, intervalMs) => {
      scheduled.push(intervalMs);
    });

    expect(sqlMock).toHaveBeenCalledTimes(1);
    expect(scheduled).toEqual([CONNECT_PLACEHOLDER_SWEEP_INTERVAL_MS]);
  });
});
