import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  grokWebhookSql,
  type GrokWebhookSqlState,
} from "@/lib/projects/acl/webhooks/grokWebhookSql.fixtures";
import {
  GROK_GET_WAKE_AT as WAKE_AT,
  grokGetStatusQuery,
  grokGetStatusRow,
} from "@/lib/projects/acl/webhooks/grokWebhookRouteGet.fixtures";
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
  grokGetStatusQuery(sqlMock.mock.calls);

describe("owner grok-webhook route GET wake health (DF-036)", () => {
  it("DF-036: latest failed wake → lastWakeAt ISO + short reason, never URL/body", async () => {
    db.statusRow = grokGetStatusRow("http_429", new Date(WAKE_AT));
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
    db.statusRow = grokGetStatusRow(null, null);
    const body = await (await callGet()).json();
    expect(body.lastWakeAt).toBeNull();
    expect(body.lastFailureReason).toBeNull();
  });
});
