import { beforeEach, describe, expect, it, vi } from "vitest";

import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const requireAuth = vi.hoisted(() => vi.fn());
const fromOwner = vi.hoisted(() => vi.fn());
const fromHumanMember = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));
vi.mock("@/lib/projects/acl/messaging/dispatchProjectMessageFromOwner", () => ({
  dispatchProjectMessageFromOwner: fromOwner,
}));
vi.mock("@/lib/projects/acl/messaging/dispatchProjectMessageFromHumanMember", () => ({
  dispatchProjectMessageFromHumanMember: fromHumanMember,
}));

import { POST } from "@/app/api/projects/[projectId]/inbox/dispatch/route";

const post = (body: string) =>
  POST(
    new Request("http://localhost/api/projects/proj-1/inbox/dispatch", {
      method: "POST",
      body,
    }),
    { params: Promise.resolve({ projectId: "proj-1" }) },
  );

const body = JSON.stringify({ summary: "hi", toMembershipId: "mem-b" });

describe("POST inbox dispatch for human seats", () => {
  beforeEach(() => {
    fromOwner.mockReset();
    fromHumanMember.mockReset();
    requireAuth.mockResolvedValue({ actor: { id: "user-h" }, error: null });
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
  });

  it("human member posts through the member path", async () => {
    fromHumanMember.mockResolvedValue({ ok: true, messageId: "msg-1", recipientCount: 1 });
    const response = await post(body);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, messageId: "msg-1", recipientCount: 1 });
    expect(fromHumanMember).toHaveBeenCalledWith({
      projectId: "proj-1",
      actorUserId: "user-h",
      args: { summary: "hi", toMembershipId: "mem-b" },
    });
    expect(fromOwner).not.toHaveBeenCalled();
  });

  it("viewer gets 403 viewer_read_only", async () => {
    fromHumanMember.mockResolvedValue({ ok: false, code: "viewer_read_only" });
    const response = await post(body);
    expect(response.status).toBe(403);
    expect(await response.json()).toMatchObject({ ok: false, code: "viewer_read_only" });
  });

  it("non-member (or bot session) stays 403 even with a bad body", async () => {
    fromHumanMember.mockResolvedValue({ ok: false, code: "forbidden" });
    const response = await post("{not json");
    expect(response.status).toBe(403);
    expect(fromHumanMember.mock.calls[0]?.[0]).toMatchObject({ args: null });
  });

  it("member naming_required is 400", async () => {
    fromHumanMember.mockResolvedValue({ ok: false, code: "naming_required" });
    expect((await post(body)).status).toBe(400);
  });

  it("owner still uses the owner path and 400s on a bad body", async () => {
    requireAuth.mockResolvedValue({ actor: { id: "owner-1" }, error: null });
    fromOwner.mockResolvedValue({ ok: true, messageId: "msg-o", recipientCount: 1 });
    expect((await post(body)).status).toBe(200);
    expect(fromOwner).toHaveBeenCalledWith({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      args: { summary: "hi", toMembershipId: "mem-b" },
    });
    expect((await post("{not json")).status).toBe(400);
    expect(fromHumanMember).not.toHaveBeenCalled();
  });
});
