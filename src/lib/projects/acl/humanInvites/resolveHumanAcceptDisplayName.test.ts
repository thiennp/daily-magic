import { beforeEach, describe, expect, it, vi } from "vitest";

const isTaken = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/displayNames/isProjectDisplayNameTaken", () => ({
  isProjectDisplayNameTaken: isTaken,
}));

import { resolveHumanAcceptDisplayName } from "@/lib/projects/acl/humanInvites/resolveHumanAcceptDisplayName";

describe("resolveHumanAcceptDisplayName", () => {
  beforeEach(() => {
    isTaken.mockReset();
    isTaken.mockResolvedValue(false);
  });

  it("accepts a valid suggested name", async () => {
    const result = await resolveHumanAcceptDisplayName({
      projectId: "p",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result).toEqual({ ok: true, name: "Soft Vale" });
    expect(isTaken).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "p",
        displayNameKey: "soft vale",
        softCheckPending: true,
      }),
    );
  });

  it("derives from account name when suggestion omitted", async () => {
    const result = await resolveHumanAcceptDisplayName({
      projectId: "p",
      accountName: "Ada Lovelace",
    });
    expect(result).toEqual({ ok: true, name: "Ada Lovelace" });
  });

  it("returns display_name_taken with prefill", async () => {
    isTaken.mockResolvedValue(true);
    await expect(
      resolveHumanAcceptDisplayName({
        projectId: "p",
        suggestedProjectDisplayName: "Taken Name",
      }),
    ).resolves.toEqual({
      ok: false,
      code: "display_name_taken",
      suggestedProjectDisplayName: "Taken Name",
    });
  });

  it("returns display_name_invalid for bad suggestion", async () => {
    await expect(
      resolveHumanAcceptDisplayName({
        projectId: "p",
        suggestedProjectDisplayName: "bad@name",
      }),
    ).resolves.toEqual({
      ok: false,
      code: "display_name_invalid",
      suggestedProjectDisplayName: "bad@name",
    });
  });

  it("returns display_name_required when nothing usable", async () => {
    await expect(
      resolveHumanAcceptDisplayName({
        projectId: "p",
        accountName: "",
      }),
    ).resolves.toMatchObject({
      ok: false,
      code: "display_name_required",
    });
  });
});
