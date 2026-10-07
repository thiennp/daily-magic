import { beforeEach, describe, expect, it, vi } from "vitest";

import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import { revokeProjectInvite } from "@/lib/projects/acl/invites/revokeProjectInvite";
import { toInviteListItem } from "@/lib/projects/acl/invites/toInviteListItem";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({
    id: "proj-1",
    ownerUserId: "owner-1",
  })),
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: vi.fn(async () => undefined),
}));

const ROW = {
  id: "inv-1",
  project_id: "proj-1",
  created_by_user_id: "owner-1",
  token_hash: "h",
  team_label: null,
  scopes: [],
  max_uses: 1,
  uses_remaining: 1,
  expires_at: "2026-10-14T00:00:00.000Z",
  revoked_at: null,
  created_at: "2026-10-07T00:00:00.000Z",
};

describe("107 invite token copy lifecycle", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("revoke clears the stored ciphertext in the same UPDATE", async () => {
    const updates: string[] = [];
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("UPDATE project_invites")) {
        updates.push(q);
        return [{ ...ROW, revoked_at: "2026-10-07T01:00:00.000Z" }];
      }
      return [];
    });
    const result = await revokeProjectInvite({
      projectId: "proj-1",
      inviteId: "inv-1",
      ownerUserId: "owner-1",
    });
    expect(result.ok).toBe(true);
    expect(updates[0]).toContain(
      "SET revoked_at = NOW(), token_ciphertext = NULL, token_iv = NULL",
    );
  });

  it("list item exposes only copyAvailable, never the ciphertext", () => {
    const withCopy = toInviteListItem(
      mapProjectInviteRow({
        ...ROW,
        token_ciphertext: "c2VjcmV0",
        token_iv: "aXY=",
      }),
    );
    expect(withCopy.copyAvailable).toBe(true);
    expect(JSON.stringify(withCopy)).not.toContain("c2VjcmV0");
    expect(JSON.stringify(withCopy)).not.toContain("token");
    const legacy = toInviteListItem(mapProjectInviteRow(ROW));
    expect(legacy.copyAvailable).toBe(false);
  });
});
