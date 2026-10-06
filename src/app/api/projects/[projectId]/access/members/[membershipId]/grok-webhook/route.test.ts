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

import { PUT } from "@/app/api/projects/[projectId]/access/members/[membershipId]/grok-webhook/route";

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

const callPut = (body: unknown) =>
  PUT(
    new Request("http://localhost/x", {
      method: "PUT",
      body: JSON.stringify(body),
    }),
    { params },
  );

describe("owner grok-webhook route PUT", () => {
  it("owner saves via ONE guarded write; response is host + key set, never the key", async () => {
    const response = await callPut({
      webhookUrl: URL_OK,
      webhookKey: SECRET_KEY,
    });
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(JSON.parse(text)).toEqual({
      ok: true,
      grokWebhookRegistered: true,
      grokWebhookUrlHost: "hooks.example.com",
      keySet: true,
      hmacWebhookRegistered: false,
      hmacWebhookUrlHost: null,
      secretSet: false,
      deliveryModeFlipped: false,
    });
    expect(text).not.toContain(SECRET_KEY);
    expect(inserts()).toHaveLength(1);
    const [strings, ...values] = inserts()[0] ?? [];
    const query = String(strings);
    expect(query).toContain("FROM project_memberships m");
    expect(query).toContain("m.status = 'active'");
    expect(query).toContain("m.role = 'member'");
    expect(query).toContain("btrim(m.project_display_name) <> ''");
    expect(values).toEqual(
      expect.arrayContaining([SECRET_KEY, "proj-1", "member_row", "mem-1"]),
    );
  });

  it("validates like register_project_webhook (https only, key required) before any write", async () => {
    const http = await callPut({
      webhookUrl: "http://hooks.example.com",
      webhookKey: SECRET_KEY,
    });
    expect(http.status).toBe(400);
    expect((await http.json()).code).toBe("https_only");
    const noKey = await callPut({ webhookUrl: URL_OK, webhookKey: " " });
    expect(noKey.status).toBe(400);
    expect((await noKey.json()).code).toBe("invalid_bearer");
    expect(inserts()).toEqual([]);
  });

  it("an active member without a nickname is refused by the guarded write (409)", async () => {
    Object.assign(db, { writable: false, present: true });
    const response = await callPut({
      webhookUrl: URL_OK,
      webhookKey: SECRET_KEY,
    });
    expect(response.status).toBe(409);
    expect((await response.json()).code).toBe("naming_required");
  });
});
