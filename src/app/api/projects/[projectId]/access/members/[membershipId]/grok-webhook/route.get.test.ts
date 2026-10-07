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

const WAKE_AT = "2026-10-07T21:15:00.000Z";

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
      last_wake_at: WAKE_AT,
    };
    const response = await callGet();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      grokWebhookRegistered: true,
      grokWebhookUrlHost: "hooks.example.com",
      keySet: true,
      hmacWebhookRegistered: false,
      hmacWebhookUrlHost: null,
      secretSet: false,
      lastWakeAt: WAKE_AT,
      lastFailureReason: null,
    });
    expect(statusQuery()).toContain("m.status = 'active'");
    expect(statusQuery()).not.toContain("bearer");
  });

  it("includes HMAC host + secretSet when registered, never the secret", async () => {
    db.statusRow = {
      webhook_url: "https://hooks.example.com/wake/abc",
      last_wake_result: "http_200",
      last_wake_at: WAKE_AT,
    };
    db.hmacStatusRow = {
      webhook_url: "https://muse.example.com/inbox",
      secret_set: true,
    };
    const response = await callGet();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({
      ok: true,
      grokWebhookRegistered: true,
      grokWebhookUrlHost: "hooks.example.com",
      keySet: true,
      hmacWebhookRegistered: true,
      hmacWebhookUrlHost: "muse.example.com",
      secretSet: true,
      lastWakeAt: WAKE_AT,
      lastFailureReason: null,
    });
    expect(JSON.stringify(body)).not.toMatch(/awc_whsec_|inbox/i);
  });

  it("DF-036: latest failed wake → lastWakeAt ISO + short reason, never URL/body", async () => {
    db.statusRow = {
      webhook_url: "https://hooks.example.com/wake/abc",
      last_wake_result: "http_429",
      last_wake_at: new Date(WAKE_AT),
    };
    const response = await callGet();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({
      lastWakeAt: WAKE_AT,
      lastFailureReason: "HTTP 429",
    });
    expect(JSON.stringify(body)).not.toContain("/wake/abc");
    expect(statusQuery()).toContain("LEFT JOIN LATERAL");
  });

  it("DF-036: no stored wake → lastWakeAt and lastFailureReason null", async () => {
    db.statusRow = {
      webhook_url: "https://hooks.example.com/wake/abc",
      last_wake_result: null,
      last_wake_at: null,
    };
    const body = await (await callGet()).json();
    expect(body.lastWakeAt).toBeNull();
    expect(body.lastFailureReason).toBeNull();
  });

  it("404s when the membership is not an active member of this project", async () => {
    db.statusRow = null;
    expect((await callGet()).status).toBe(404);
  });
});
