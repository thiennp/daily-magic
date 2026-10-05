import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  GUARDED_INSERT,
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

import {
  GET,
  PUT,
} from "@/app/api/projects/[projectId]/access/members/[membershipId]/grok-webhook/route";

const SECRET_KEY = "grok-routine-secret-key";
const URL_OK = "https://hooks.example.com/wake/abc";
const params = Promise.resolve({ projectId: "proj-1", membershipId: "mem-1" });
const db: GrokWebhookSqlState = {
  writable: true,
  present: true,
  statusRow: null,
};

const inserts = (): unknown[][] =>
  sqlMock.mock.calls.filter((call) => String(call[0]).includes(GUARDED_INSERT));

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

const callPut = () =>
  PUT(
    new Request("http://localhost/x", {
      method: "PUT",
      body: JSON.stringify({ webhookUrl: URL_OK, webhookKey: SECRET_KEY }),
    }),
    { params },
  );

describe("owner grok-webhook route auth", () => {
  it("refuses a signed-in non-owner before any DB write (403)", async () => {
    requireAuth.mockResolvedValue({ actor: { id: "member-1" }, error: null });
    expect((await callPut()).status).toBe(403);
    expect(
      (await GET(new Request("http://localhost/x"), { params })).status,
    ).toBe(403);
    expect(inserts()).toEqual([]);
  });

  it("refuses signed out (401)", async () => {
    requireAuth.mockResolvedValue({
      actor: null,
      error: Response.json({ ok: false }, { status: 401 }),
    });
    expect((await callPut()).status).toBe(401);
    expect(inserts()).toEqual([]);
  });

  it("404s an unknown project", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue(null);
    expect((await callPut()).status).toBe(404);
    expect(inserts()).toEqual([]);
  });

  it("404s a wrong, foreign-project, revoked or inactive membership id: the guarded write matches no row", async () => {
    Object.assign(db, { writable: false, present: false });
    const response = await callPut();
    expect(response.status).toBe(404);
    expect((await response.json()).code).toBe("not_found");
    expect(inserts()).toHaveLength(1);
    expect(String(inserts()[0]?.[0])).toContain("m.project_id = ");
  });
});
