import { beforeEach, describe, expect, it, vi } from "vitest";

import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  REDEEM_SUGGEST_INVITE_ROW,
  redeemSuggestPendingRow,
} from "@/lib/projects/acl/invites/redeemSuggestedName.fixtures";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: vi.fn(async () => "none"),
}));

describe("redeemProjectInvite suggestedProjectDisplayName", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("stores suggestion when unique and valid", async () => {
    let insertedSuggestion: unknown = undefined;
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_invites") && q.includes("uses_remaining = uses_remaining - 1")) {
        return [REDEEM_SUGGEST_INVITE_ROW];
      }
      if (q.includes("FROM project_memberships") && q.includes("lower(trim")) return [];
      if (q.includes("FROM project_access_requests") && q.includes("suggested_project_display_name")) {
        return [];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        insertedSuggestion = values[8];
        return [redeemSuggestPendingRow("Soft Vale")];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.suggestedProjectDisplayName).toBe("Soft Vale");
    expect(result.request.suggestedProjectDisplayName).toBe("Soft Vale");
    expect(insertedSuggestion).toBe("Soft Vale");
  });

  it("omitting suggestion keeps today's pending behavior", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_invites") && q.includes("uses_remaining = uses_remaining - 1")) {
        return [REDEEM_SUGGEST_INVITE_ROW];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        expect(values[8]).toBeNull();
        return [redeemSuggestPendingRow(null)];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.namingRequired).toBe(true);
    expect(result.suggestedProjectDisplayName).toBeNull();
  });
});
