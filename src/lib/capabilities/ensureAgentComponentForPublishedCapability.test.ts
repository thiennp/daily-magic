import { beforeEach, describe, expect, it, vi } from "vitest";

import ensureAgentComponentForPublishedCapability from "@/lib/capabilities/ensureAgentComponentForPublishedCapability";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: <T>(value: T): T => value,
}));

describe("ensureAgentComponentForPublishedCapability", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("completes when slug upsert returns an existing component id", async () => {
    sqlMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: "existing-component-id" }]);

    await expect(
      ensureAgentComponentForPublishedCapability({
        capabilityId: "new-capability-id",
        ownerUserId: "user-1",
        name: "Add vibe coding app feature",
        description: "",
        visibility: "private",
        capabilityType: "workflow",
        harnessSetSlug: "template-vibe-coding-app-feature",
      }),
    ).resolves.toBeUndefined();

    expect(sqlMock).toHaveBeenCalledTimes(2);
  });

  it("throws when upsert returns no row", async () => {
    sqlMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    await expect(
      ensureAgentComponentForPublishedCapability({
        capabilityId: "new-capability-id",
        ownerUserId: "user-1",
        name: "Add vibe coding app feature",
        description: "",
        visibility: "private",
        capabilityType: "workflow",
        harnessSetSlug: "template-vibe-coding-app-feature",
      }),
    ).rejects.toThrow("Could not ensure agent component for capability.");
  });
});
