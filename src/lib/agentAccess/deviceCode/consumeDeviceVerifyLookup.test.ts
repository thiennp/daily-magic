import { beforeEach, describe, expect, it, vi } from "vitest";

const consume = vi.hoisted(() => vi.fn());
vi.mock("@/lib/agentAccess/consumeAgentAccessBucket", () => ({
  consumeAgentAccessBucket: consume,
}));

import { consumeDeviceVerifyLookup } from "@/lib/agentAccess/deviceCode/consumeDeviceVerifyLookup";

describe("consumeDeviceVerifyLookup", () => {
  beforeEach(() => consume.mockReset());

  it("uses the lookup bucket, 60/hour, keyed by a hash of the person", async () => {
    consume.mockResolvedValue(true);
    await expect(consumeDeviceVerifyLookup("user-1")).resolves.toBe(true);
    const arg = consume.mock.calls[0]?.[0];
    expect(arg).toMatchObject({ bucket: "device_verify_lookup", limit: 60 });
    expect(arg.subjectHash).toMatch(/^[0-9a-f]{64}$/);
    expect(arg.subjectHash).not.toContain("user-1");
  });

  it("returns false once the cap is hit", async () => {
    consume.mockResolvedValue(false);
    await expect(consumeDeviceVerifyLookup("user-1")).resolves.toBe(false);
  });
});
