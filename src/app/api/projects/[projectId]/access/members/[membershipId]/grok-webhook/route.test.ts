import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
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
  assertSafeProjectWebhookUrl: vi.fn(async (raw: unknown) => {
    const text = String(raw);
    if (!text.startsWith("https://")) return { ok: false, code: "https_only" };
    return { ok: true, url: new URL(text) };
  }),
}));

import { PUT } from "@/app/api/projects/[projectId]/access/members/[membershipId]/grok-webhook/route";

const SECRET_KEY = "grok-routine-secret-key";
const params = Promise.resolve({ projectId: "proj-1", membershipId: "mem-1" });

const memberRow = {
  id: "mem-1",
  project_id: "proj-1",
  user_id: "bot-user-1",
  role: "member",
  status: "active",
  project_display_name: "Bot",
  scopes: [],
};

const callPut = (body: unknown) =>
  PUT(
    new Request("http://localhost/x", {
      method: "PUT",
      body: JSON.stringify(body),
    }),
    { params },
  );

const inserts = (): unknown[][] =>
  sqlMock.mock.calls.filter((call) =>
    String(call[0]).includes(
      "INSERT INTO project_membership_grok_routine_webhooks",
    ),
  );

describe("owner grok-webhook route", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    requireAuth.mockReset();
    resetProjectAclSchemaEnsureForTests();
    requireAuth.mockResolvedValue({ actor: { id: "owner-1" }, error: null });
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const text = strings.join("?");
      if (text.includes("FROM project_memberships")) return [memberRow];
      if (
        text.includes("INSERT INTO project_membership_grok_routine_webhooks")
      ) {
        return [{ webhook_url: "https://hooks.example.com/wake/abc" }];
      }
      return [];
    });
  });

  it("owner saves URL + key; response shows host and key set, never the key", async () => {
    const response = await callPut({
      webhookUrl: "https://hooks.example.com/wake/abc",
      webhookKey: SECRET_KEY,
    });
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(JSON.parse(text)).toEqual({
      ok: true,
      grokWebhookRegistered: true,
      grokWebhookUrlHost: "hooks.example.com",
      keySet: true,
    });
    expect(text).not.toContain(SECRET_KEY);
    expect(inserts()).toHaveLength(1);
    const values = inserts()[0]?.slice(1);
    expect(values).toContain(SECRET_KEY);
    expect(values).toContain("bot-user-1");
    expect(values).toContain("mem-1");
  });

  it("validates like register_project_webhook (https only, key required)", async () => {
    const http = await callPut({
      webhookUrl: "http://hooks.example.com",
      webhookKey: SECRET_KEY,
    });
    expect(http.status).toBe(400);
    expect((await http.json()).code).toBe("https_only");
    const noKey = await callPut({
      webhookUrl: "https://hooks.example.com",
      webhookKey: " ",
    });
    expect(noKey.status).toBe(400);
    expect((await noKey.json()).code).toBe("invalid_bearer");
    expect(inserts()).toEqual([]);
  });
});
