import { beforeEach, describe, expect, it, vi } from "vitest";

import { findOwnerLibraryCapabilityIdForComponentSlug } from "@/lib/capabilities/findOwnerLibraryCapabilityIdForComponentSlug";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: <T>(value: T): T => value,
}));

describe("findOwnerLibraryCapabilityIdForComponentSlug", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("returns published capability id when a library component exists", async () => {
    sqlMock.mockResolvedValue([{ published_capability_id: "cap-1" }]);

    await expect(
      findOwnerLibraryCapabilityIdForComponentSlug({
        ownerUserId: "user-1",
        kind: "workflow",
        slug: "template-vibe-coding-app-feature",
      }),
    ).resolves.toBe("cap-1");
  });

  it("returns null when no component is linked", async () => {
    sqlMock.mockResolvedValue([]);

    await expect(
      findOwnerLibraryCapabilityIdForComponentSlug({
        ownerUserId: "user-1",
        kind: "workflow",
        slug: "template-vibe-coding-app-feature",
      }),
    ).resolves.toBeNull();
  });
});
