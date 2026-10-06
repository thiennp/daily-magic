import { beforeEach, describe, expect, it, vi } from "vitest";

import { peekProjectInviteByToken } from "@/lib/projects/acl/invites/peekProjectInviteByToken";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { hashProjectInviteToken } from "@/lib/projects/acl/invites/hashProjectInviteToken";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("peekProjectInviteByToken", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("returns autoApprove without consuming a use", async () => {
    const token = "a".repeat(22);
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("FROM project_invites") && q.includes("token_hash")) {
        return [
          {
            id: "inv-1",
            project_id: "proj-1",
            created_by_user_id: "owner-1",
            token_hash: hashProjectInviteToken(token),
            team_label: null,
            scopes: [],
            max_uses: 1,
            uses_remaining: 1,
            expires_at: "2026-10-09T00:00:00.000Z",
            revoked_at: null,
            created_at: "2026-10-02T00:00:00.000Z",
            auto_approve: true,
          },
        ];
      }
      return [];
    });
    const result = await peekProjectInviteByToken(token);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.invite.autoApprove).toBe(true);
    const joined = sqlMock.mock.calls.map((c) => String(c[0])).join("\n");
    expect(joined).not.toMatch(/uses_remaining = uses_remaining - 1/);
  });
});
