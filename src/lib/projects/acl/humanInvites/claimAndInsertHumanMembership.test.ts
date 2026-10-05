import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));

import { claimAndInsertHumanMembership } from "@/lib/projects/acl/humanInvites/claimAndInsertHumanMembership";

describe("claimAndInsertHumanMembership", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("maps display-name unique failure to display_name_taken", async () => {
    sqlMock.mockRejectedValueOnce(
      new Error("duplicate key project_memberships_display_name_active_idx"),
    );
    await expect(
      claimAndInsertHumanMembership({
        token: "t".repeat(22),
        claimantUserId: "u",
        projectDisplayName: "Same",
        role: "member",
      }),
    ).resolves.toEqual({ ok: false, code: "display_name_taken" });
  });

  it("returns invalid_token when CTE matches nothing", async () => {
    sqlMock.mockResolvedValueOnce([]);
    await expect(
      claimAndInsertHumanMembership({
        token: "t".repeat(22),
        claimantUserId: "u",
        projectDisplayName: "Name",
        role: "member",
      }),
    ).resolves.toEqual({ ok: false, code: "invalid_token" });
  });
});
