import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

import { lookupLibraryItemProjectId } from "@/lib/library/lookupLibraryItemProjectId";

describe("lookupLibraryItemProjectId", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("returns the item's project_id", async () => {
    sqlMock.mockResolvedValue([{ project_id: "p1" }]);
    await expect(lookupLibraryItemProjectId("cap-1")).resolves.toBe("p1");
  });

  it("returns null for a NULL or empty project_id (069 leaves it nullable)", async () => {
    sqlMock.mockResolvedValue([{ project_id: null }]);
    await expect(lookupLibraryItemProjectId("cap-1")).resolves.toBeNull();

    sqlMock.mockResolvedValue([{ project_id: "" }]);
    await expect(lookupLibraryItemProjectId("cap-1")).resolves.toBeNull();
  });

  it("returns null for a missing row or a failed query", async () => {
    sqlMock.mockResolvedValue([]);
    await expect(lookupLibraryItemProjectId("cap-1")).resolves.toBeNull();

    sqlMock.mockRejectedValue(new Error("db down"));
    await expect(lookupLibraryItemProjectId("cap-1")).resolves.toBeNull();
  });
});
