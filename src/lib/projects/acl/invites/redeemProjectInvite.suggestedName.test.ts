import { beforeEach, describe, expect, it, vi } from "vitest";

import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: vi.fn(async () => "none"),
}));

const INVITE_ROW = {
  id: "inv-1",
  project_id: "proj-1",
  created_by_user_id: "owner-1",
  token_hash: "hash",
  team_label: null,
  scopes: ["acl:self", "project:meta", "peer_sync"],
  max_uses: 1,
  uses_remaining: 0,
  expires_at: "2026-10-09T00:00:00.000Z",
  revoked_at: null,
  created_at: "2026-10-02T00:00:00.000Z",
};

const pendingRow = (suggestion: string | null) => ({
  id: "req-1",
  project_id: "proj-1",
  requester_user_id: "bot-1",
  invited_by_user_id: "owner-1",
  reason: "invite_redeem",
  requested_scopes: ["acl:self", "project:meta", "peer_sync"],
  status: "pending",
  decided_by_user_id: null,
  decided_at: null,
  created_at: "2026-10-02T00:00:00.000Z",
  expires_at: "2026-10-16T00:00:00.000Z",
  invite_id: "inv-1",
  team_label: null,
  suggested_project_display_name: suggestion,
});

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
        return [INVITE_ROW];
      }
      if (q.includes("FROM project_memberships") && q.includes("lower(trim")) return [];
      if (q.includes("FROM project_access_requests") && q.includes("suggested_project_display_name")) {
        return [];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        insertedSuggestion = values[8];
        return [pendingRow("Soft Vale")];
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

  it("rejects taken suggestion without creating pending", async () => {
    let restored = false;
    let inserted = false;
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_invites") && q.includes("uses_remaining = uses_remaining - 1")) {
        return [INVITE_ROW];
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
        return [INVITE_ROW];
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

  it("omitting suggestion keeps today's pending behavior", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_invites") && q.includes("uses_remaining = uses_remaining - 1")) {
        return [INVITE_ROW];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        expect(values[8]).toBeNull();
        return [pendingRow(null)];
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
