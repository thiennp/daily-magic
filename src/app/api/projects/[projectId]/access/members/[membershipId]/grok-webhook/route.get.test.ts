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

import { GET } from "@/app/api/projects/[projectId]/access/members/[membershipId]/grok-webhook/route";

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

describe("owner grok-webhook route GET", () => {
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

  it("GET returns host + key set only, and never selects the bearer", async () => {
    const response = await GET(new Request("http://localhost/x"), { params });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      grokWebhookRegistered: true,
      grokWebhookUrlHost: "hooks.example.com",
      keySet: true,
    });
    const statusQuery = sqlMock.mock.calls
      .map((call) => String(call[0]))
      .find((q) =>
        q.includes("LEFT JOIN project_membership_grok_routine_webhooks"),
      );
    expect(statusQuery).toBeDefined();
    expect(statusQuery).not.toContain("bearer");
  });
});
