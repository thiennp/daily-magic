import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectInvite } from "@/lib/projects/acl/invites/createProjectInvite";
import { hashProjectInviteToken } from "@/lib/projects/acl/invites/hashProjectInviteToken";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  createProjectApiKeyPlaintext,
  hashProjectApiKey,
} from "@/lib/projects/acl/projectApiKeys/hashProjectApiKey";
import { validateProjectDisplayName } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
import { PROJECT_API_KEY_PREFIX } from "@/lib/projects/acl/projectApiKeys/projectApiKey.constants";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (projectId: string) =>
    projectId === "proj-1"
      ? {
          id: "proj-1",
          ownerUserId: "owner-1",
          deviceId: "mac-1",
          name: "Demo",
          folderPath: "/tmp/demo",
          repoUrls: [],
          defaultBranch: null,
          lastUsedAt: null,
          createdAt: "2026-10-01T00:00:00.000Z",
          updatedAt: "2026-10-01T00:00:00.000Z",
        }
      : null,
  ),
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: vi.fn(async () => "none"),
}));

describe("project invite + display name security (A1/A2/A10)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("stores invite hash only; URL carries opaque token once", async () => {
    const inserted: { hash: string | null } = { hash: null };
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("INSERT INTO project_invites")) {
        inserted.hash = String(values[3]);
        return [{
          id: "inv-1", project_id: "proj-1", created_by_user_id: "owner-1",
          token_hash: inserted.hash, team_label: null,
          scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
          max_uses: 1, uses_remaining: 1,
          expires_at: "2026-10-09T00:00:00.000Z", revoked_at: null,
          created_at: "2026-10-02T00:00:00.000Z",
        }];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });
    const created = await createProjectInvite({ projectId: "proj-1", ownerUserId: "owner-1" });
    expect(created.ok).toBe(true);
    if (!created.ok) return;
    expect(created.url).toContain("/invite/p/");
    expect(created.url).not.toContain("proj-1");
    expect(inserted.hash).toBe(hashProjectInviteToken(created.token));
  });

  it("atomic redeem fails closed when uses exhausted", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_invites") && q.includes("uses_remaining")) return [];
      return [];
    });
    const result = await redeemProjectInvite({ token: "a".repeat(22), actorUserId: "bot-1" });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.code).toBe("invalid_token");
  });

  it("project API keys use awc_proj_ prefix and hash at rest", () => {
    const plaintext = createProjectApiKeyPlaintext();
    expect(plaintext.startsWith(PROJECT_API_KEY_PREFIX)).toBe(true);
    expect(hashProjectApiKey(plaintext)).toHaveLength(64);
  });

  it("rejects reserved/invalid display names", () => {
    expect(validateProjectDisplayName("owner").ok).toBe(false);
    expect(validateProjectDisplayName("Buni").ok).toBe(true);
    expect(validateProjectDisplayName("bad/name").ok).toBe(false);
  });

  it("non-owner cannot create invites", async () => {
    const result = await createProjectInvite({ projectId: "proj-1", ownerUserId: "not-owner" });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.code).toBe("forbidden");
  });
});
