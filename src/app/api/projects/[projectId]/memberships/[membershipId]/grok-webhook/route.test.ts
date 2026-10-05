import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  GUARDED_INSERT,
  grokWebhookSql,
  type GrokWebhookSqlState,
} from "@/lib/projects/acl/webhooks/grokWebhookSql.fixtures";

const sqlMock = vi.fn();
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
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
} from "@/app/api/projects/[projectId]/memberships/[membershipId]/grok-webhook/route";

const SECRET_KEY = "owned-bot-secret";
const URL_OK = "https://hooks.example.com/wake/owned";
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
  requireAuth.mockResolvedValue({ actor: { id: "human-1" }, error: null });
  sqlMock.mockImplementation(grokWebhookSql(db));
});

describe("owned-bot memberships grok-webhook route", () => {
  it("owner of the bot saves via owned_bot_row; response never includes the key", async () => {
    const response = await PUT(
      new Request("http://localhost/x", {
        method: "PUT",
        body: JSON.stringify({ webhookUrl: URL_OK, webhookKey: SECRET_KEY }),
      }),
      { params },
    );
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(JSON.parse(text)).toEqual({
      ok: true,
      grokWebhookRegistered: true,
      grokWebhookUrlHost: "hooks.example.com",
      keySet: true,
    });
    expect(text).not.toContain(SECRET_KEY);
    expect(String(inserts()[0]?.[0])).toContain("owned_bot_row");
    expect(inserts()[0]).toEqual(
      expect.arrayContaining([SECRET_KEY, "proj-1", "owned_bot_row", "mem-1", "human-1"]),
    );
  });

  it("non-owner write matches no row (404)", async () => {
    Object.assign(db, { writable: false, present: false });
    requireAuth.mockResolvedValue({ actor: { id: "stranger" }, error: null });
    const response = await PUT(
      new Request("http://localhost/x", {
        method: "PUT",
        body: JSON.stringify({ webhookUrl: URL_OK, webhookKey: SECRET_KEY }),
      }),
      { params },
    );
    expect(response.status).toBe(404);
    expect((await response.json()).code).toBe("not_found");
  });

  it("GET 404s when the membership is not owned by the caller", async () => {
    Object.assign(db, { statusRow: null });
    sqlMock.mockImplementation(
      grokWebhookSql({ writable: false, present: false, statusRow: null }),
    );
    const response = await GET(new Request("http://localhost/x"), { params });
    expect(response.status).toBe(404);
  });
});
