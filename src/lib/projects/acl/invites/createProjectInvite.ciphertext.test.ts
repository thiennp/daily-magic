import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectInvite } from "@/lib/projects/acl/invites/createProjectInvite";
import { hashProjectInviteToken } from "@/lib/projects/acl/invites/hashProjectInviteToken";
import { decryptProjectInviteToken } from "@/lib/projects/acl/invites/projectInviteTokenCipher";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({
    id: "proj-1",
    ownerUserId: "owner-1",
    name: "Demo",
  })),
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: vi.fn(async () => undefined),
}));

type Captured = { values: unknown[] | null; ddl: string[]; sweeps: number };

const captureInsert = (captured: Captured) => {
  sqlMock.mockImplementation(
    async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) {
        captured.ddl.push(q);
        return [];
      }
      if (q.includes("INSERT INTO project_invites")) {
        captured.values = values;
        return [
          {
            id: values[0],
            project_id: "proj-1",
            created_by_user_id: "owner-1",
            token_hash: values[3],
            team_label: null,
            scopes: [],
            max_uses: 1,
            uses_remaining: 1,
            expires_at: "2026-10-14T00:00:00.000Z",
            revoked_at: null,
            created_at: "2026-10-07T00:00:00.000Z",
            token_ciphertext: values[11],
            token_iv: values[12],
          },
        ];
      }
      if (q.includes("SET token_ciphertext = NULL")) captured.sweeps += 1;
      return [];
    },
  );
};

describe("createProjectInvite writes the encrypted token (107)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("stores hash + AES-GCM ciphertext that decrypts to the URL token", async () => {
    vi.stubEnv("AUTH_SECRET", "test-secret");
    const captured: Captured = { values: null, ddl: [], sweeps: 0 };
    captureInsert(captured);
    const created = await createProjectInvite({
      projectId: "proj-1",
      ownerUserId: "owner-1",
    });
    expect(created.ok).toBe(true);
    if (!created.ok || captured.values === null) return;
    const [, , , hash, , , , , , , , ciphertext, iv] = captured.values;
    expect(hash).toBe(hashProjectInviteToken(created.token));
    expect(typeof ciphertext).toBe("string");
    expect(String(ciphertext)).not.toContain(created.token);
    expect(
      decryptProjectInviteToken(
        { ciphertext: String(ciphertext), iv: String(iv) },
        "test-secret",
      ),
    ).toBe(created.token);
    expect(created.invite.copyAvailable).toBe(true);
    expect(captured.ddl.some((q) => q.includes("token_ciphertext"))).toBe(true);
    expect(captured.sweeps).toBe(1);
  });

  it("without AUTH_SECRET stores no ciphertext (Copy unavailable later)", async () => {
    vi.stubEnv("AUTH_SECRET", "");
    const captured: Captured = { values: null, ddl: [], sweeps: 0 };
    captureInsert(captured);
    const created = await createProjectInvite({
      projectId: "proj-1",
      ownerUserId: "owner-1",
    });
    expect(created.ok).toBe(true);
    if (!created.ok || captured.values === null) return;
    expect(captured.values[11]).toBeNull();
    expect(captured.values[12]).toBeNull();
    expect(created.invite.copyAvailable).toBe(false);
  });
});
