import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.hoisted(() => vi.fn());
const ownerMock = vi.hoisted(() => vi.fn());
const seatMock = vi.hoisted(() => vi.fn());
const idsMock = vi.hoisted(() => vi.fn());
const writeMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: authMock }));
vi.mock("@/lib/projects/acl/authorizeProjectOwner", () => ({
  authorizeProjectOwner: ownerMock,
}));
vi.mock("@/lib/projects/acl/resolveOwnerOrActiveHumanSeat", () => ({
  resolveOwnerOrActiveHumanSeat: seatMock,
}));
vi.mock("@/lib/projects/acl/listInviterRequestIds", () => ({
  listInviterRequestIds: idsMock,
}));
vi.mock("@/lib/projects/acl/webhooks/writePendingRequestGrokWebhook", () => ({
  writePendingRequestGrokWebhook: writeMock,
}));

import { PUT } from "@/app/api/projects/[projectId]/access/requests/[requestId]/wake-link/route";

const call = () =>
  PUT(
    new Request("http://x", {
      method: "PUT",
      body: JSON.stringify({
        webhookUrl: "https://a.example/x",
        webhookKey: "k",
      }),
    }),
    { params: Promise.resolve({ projectId: "p1", requestId: "r1" }) },
  );

describe("PUT /access/requests/:id/wake-link for a member", () => {
  beforeEach(() => {
    for (const m of [authMock, ownerMock, seatMock, idsMock, writeMock]) {
      m.mockReset();
    }
    authMock.mockResolvedValue({ actor: { id: "u2" }, error: null });
    ownerMock.mockResolvedValue({ allow: false, reason: "forbidden" });
    seatMock.mockResolvedValue({
      ok: true,
      kind: "human",
      membership: { role: "member" },
    });
    writeMock.mockResolvedValue({ ok: true });
  });

  it("lets the inviting member set the wake link of their own request", async () => {
    idsMock.mockResolvedValue(new Set(["r1"]));
    expect((await call()).status).toBe(200);
    expect(writeMock).toHaveBeenCalled();
  });

  it("refuses a member for someone else's request, and a viewer", async () => {
    idsMock.mockResolvedValue(new Set(["other"]));
    expect((await call()).status).toBe(403);
    idsMock.mockResolvedValue(new Set(["r1"]));
    seatMock.mockResolvedValue({
      ok: true,
      kind: "human",
      membership: { role: "viewer" },
    });
    expect((await call()).status).toBe(403);
    expect(writeMock).not.toHaveBeenCalled();
  });
});
