import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/auth/requireAuth", () => ({
  requireAuth,
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));

import { GET } from "@/app/api/projects/[projectId]/inbox/[messageId]/grok-wake-result/route";

const callGet = (projectId: string, messageId: string) =>
  GET(new Request("http://localhost/api/projects/inbox/grok-wake-result"), {
    params: Promise.resolve({ projectId, messageId }),
  });

const wakeSelects = (): unknown[][] =>
  sqlMock.mock.calls.filter((call) =>
    String(call[0]).includes("INNER JOIN project_messages"),
  );

describe("GET owner grok wake result", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    requireAuth.mockReset();
    resetProjectAclSchemaEnsureForTests();
    requireAuth.mockResolvedValue({ actor: { id: "owner-1" }, error: null });
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
    sqlMock.mockResolvedValue([]);
  });

  it("returns only messageId, membershipId, and result", async () => {
    sqlMock.mockImplementation(async () => [
      {
        message_id: "msg-1",
        membership_id: "mem-1",
        result: "fetch_failed",
        webhook_url: "https://secret.example/hook",
        bearer_retained: "sekret-bearer",
      },
    ]);
    const response = await callGet("proj-1", "msg-1");
    expect(response.status).toBe(200);
    const body: unknown = await response.json();
    expect(body).toEqual({
      messageId: "msg-1",
      membershipId: "mem-1",
      result: "fetch_failed",
    });
    const query = String(wakeSelects()[0]?.[0]);
    expect(query).toContain("m.project_id");
    expect(wakeSelects()[0]?.slice(1)).toEqual(
      expect.arrayContaining(["proj-1", "msg-1"]),
    );
    expect(query).not.toContain("webhook_url");
    expect(query).not.toContain("bearer");
  });

  it("returns not-found when that project has no row", async () => {
    const response = await callGet("proj-1", "msg-missing");
    expect(response.status).toBe(404);
    const body: unknown = await response.json();
    expect(body).toEqual({ ok: false, errorMessage: "not_found" });
    expect(JSON.stringify(body)).not.toContain("http_");
    expect(JSON.stringify(body)).not.toContain("fetch_failed");
  });

  it("does not return a row to someone who does not own the project", async () => {
    requireAuth.mockResolvedValue({ actor: { id: "member-1" }, error: null });
    sqlMock.mockResolvedValue([
      {
        message_id: "msg-1",
        membership_id: "mem-1",
        result: "fetch_failed",
      },
    ]);
    const response = await callGet("proj-1", "msg-1");
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({
      ok: false,
      errorMessage: "forbidden",
    });
    expect(wakeSelects()).toEqual([]);
  });
});
