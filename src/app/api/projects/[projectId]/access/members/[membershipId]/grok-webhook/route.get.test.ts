import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  grokWebhookSql,
  type GrokWebhookSqlState,
} from "@/lib/projects/acl/webhooks/grokWebhookSql.fixtures";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));
vi.mock("@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl", () => ({
  assertSafeProjectWebhookUrl: vi.fn(async (raw: unknown) =>
    String(raw).startsWith("https://")
      ? { ok: true, url: new URL(String(raw)) }
      : { ok: false, code: "https_only" },
  ),
}));

import { GET } from "@/app/api/projects/[projectId]/access/members/[membershipId]/grok-webhook/route";

const params = Promise.resolve({ projectId: "proj-1", membershipId: "mem-1" });
const db: GrokWebhookSqlState = {
  writable: true,
  present: true,
  statusRow: null,
};

beforeEach(() => {
  sqlMock.mockReset();
  requireAuth.mockReset();
  resetProjectAclSchemaEnsureForTests();
  Object.assign(db, { writable: true, present: true, statusRow: null });
  requireAuth.mockResolvedValue({ actor: { id: "owner-1" }, error: null });
  vi.mocked(getUserProjectById).mockResolvedValue({
    id: "proj-1",
    ownerUserId: "owner-1",
  } as never);
  sqlMock.mockImplementation(grokWebhookSql(db));
});

const callGet = () => GET(new Request("http://localhost/x"), { params });

const statusQuery = (): string | undefined =>
  sqlMock.mock.calls
    .map((call) => String(call[0]))
    .find((q) =>
      q.includes("LEFT JOIN project_membership_grok_routine_webhooks"),
    );

describe("owner grok-webhook route GET", () => {
  it("returns host + key set only, scoped to this project's active member row", async () => {
    db.statusRow = {
      webhook_url: "https://hooks.example.com/wake/abc",
      last_wake_result: "http_200",
    };
    const response = await callGet();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      grokWebhookRegistered: true,
      grokWebhookUrlHost: "hooks.example.com",
      keySet: true,
    });
    expect(statusQuery()).toContain("m.status = 'active'");
    expect(statusQuery()).not.toContain("bearer");
  });

  it("404s when the membership is not an active member of this project", async () => {
    db.statusRow = null;
    expect((await callGet()).status).toBe(404);
  });
});
