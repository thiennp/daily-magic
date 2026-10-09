import { beforeEach, describe, expect, it, vi } from "vitest";

const capMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/capabilities/capabilityQueries", () => ({
  getPublishedCapabilityById: capMock,
}));

import { pickCapabilityIdForRun } from "@/lib/dispatch/pickCapabilityIdForRun";

const pick = (resolved: string | null, claimed: unknown) =>
  pickCapabilityIdForRun({
    requesterUserId: "me",
    resolvedCapabilityId: resolved,
    payloadCapabilityId: claimed,
  });

describe("pickCapabilityIdForRun", () => {
  beforeEach(() => capMock.mockReset());

  it("trusts a capability the dispatch checks already resolved", async () => {
    expect(await pick("c1", "c2")).toBe("c1");
    expect(capMock).not.toHaveBeenCalled();
  });

  it("keeps a body capability only when it is the requester's own", async () => {
    capMock.mockResolvedValue({ ownerUserId: "me" });
    expect(await pick(null, "c2")).toBe("c2");
    capMock.mockResolvedValue({ ownerUserId: "victim" });
    expect(await pick(null, "c2")).toBeNull();
    capMock.mockResolvedValue(null);
    expect(await pick(null, "gone")).toBeNull();
    expect(await pick(null, undefined)).toBeNull();
  });
});
