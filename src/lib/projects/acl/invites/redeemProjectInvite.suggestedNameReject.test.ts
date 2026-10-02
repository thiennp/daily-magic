import { beforeEach, describe, expect, it, vi } from "vitest";

import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { REDEEM_SUGGEST_INVITE_ROW } from "@/lib/projects/acl/invites/redeemSuggestedName.fixtures";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: vi.fn(async () => "none"),
}));

describe("redeemProjectInvite suggested name reject", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("rejects taken suggestion without creating pending", async () => {
    let restored = false;
    let inserted = false;
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_invites") && q.includes("uses_remaining = uses_remaining - 1")) {
        return [REDEEM_SUGGEST_INVITE_ROW];
      }
      if (q.includes("FROM project_memberships") && q.includes("lower(trim")) {
        return [{ hit: 1 }];
      }
      if (q.includes("uses_remaining = uses_remaining + 1")) {
        restored = true;
        return [];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        inserted = true;
        return [];
      }
      return [];
    });
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
      suggestedProjectDisplayName: "Buni",
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.code).toBe("display_name_taken");
    expect(restored).toBe(true);
    expect(inserted).toBe(false);
  });

  it("rejects invalid suggestion", async () => {
    let restored = false;
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_invites") && q.includes("uses_remaining = uses_remaining - 1")) {
        return [REDEEM_SUGGEST_INVITE_ROW];
      }
      if (q.includes("uses_remaining = uses_remaining + 1")) {
        restored = true;
        return [];
      }
      return [];
    });
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
      suggestedProjectDisplayName: "bad/name",
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.code).toBe("display_name_invalid");
    expect(restored).toBe(true);
  });
});
