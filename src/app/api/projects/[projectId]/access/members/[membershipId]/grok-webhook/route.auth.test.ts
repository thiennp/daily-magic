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

import {
  GET,
  PUT,
} from "@/app/api/projects/[projectId]/access/members/[membershipId]/grok-webhook/route";

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

describe("owner grok-webhook route auth", () => {
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
      if (text.includes("LEFT JOIN project_membership_grok_routine_webhooks")) {
        return [
          {
            webhook_url: "https://hooks.example.com/wake/abc",
            last_wake_result: "http_200",
          },
        ];
      }
      return [];
    });
  });

  it("rejects a non-owner and stores nothing", async () => {
    requireAuth.mockResolvedValue({ actor: { id: "member-1" }, error: null });
    const response = await callPut({
      webhookUrl: "https://hooks.example.com/wake/abc",
      webhookKey: SECRET_KEY,
    });
    expect(response.status).toBe(403);
    expect(inserts()).toEqual([]);
    const get = await GET(new Request("http://localhost/x"), { params });
    expect(get.status).toBe(403);
  });

  it("returns 401 when signed out", async () => {
    requireAuth.mockResolvedValue({
      actor: null,
      error: Response.json({ ok: false }, { status: 401 }),
    });
    const response = await callPut({
      webhookUrl: "https://a.example",
      webhookKey: "k",
    });
    expect(response.status).toBe(401);
    expect(inserts()).toEqual([]);
  });

  it("404s when the membership is not an active member of this project", async () => {
    sqlMock.mockResolvedValue([]);
    const response = await callPut({
      webhookUrl: "https://hooks.example.com/wake/abc",
      webhookKey: SECRET_KEY,
    });
    expect(response.status).toBe(404);
    expect(inserts()).toEqual([]);
  });
});
