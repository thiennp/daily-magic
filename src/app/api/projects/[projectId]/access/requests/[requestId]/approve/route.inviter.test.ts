import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.hoisted(() => vi.fn());
const ownerMock = vi.hoisted(() => vi.fn());
const inviterMock = vi.hoisted(() => vi.fn());
const approveMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: authMock }));
vi.mock("@/lib/projects/acl/authorizeProjectOwner", () => ({
  authorizeProjectOwner: ownerMock,
}));
vi.mock(
  "@/app/api/projects/[projectId]/access/handleInviterAccessPatch",
  () => ({ handleInviterAccessPatch: inviterMock }),
);
vi.mock("@/lib/projects/acl/approveProjectAccessRequest", () => ({
  approveProjectAccessRequest: approveMock,
}));

import { POST } from "@/app/api/projects/[projectId]/access/requests/[requestId]/approve/route";

const call = () =>
  POST(
    new Request("http://x", {
      method: "POST",
      body: JSON.stringify({ projectDisplayName: "Thien Cursor" }),
    }),
    { params: Promise.resolve({ projectId: "p1", requestId: "r1" }) },
  );

describe("POST /access/requests/:id/approve", () => {
  beforeEach(() => {
    for (const m of [authMock, ownerMock, inviterMock, approveMock]) {
      m.mockReset();
    }
    authMock.mockResolvedValue({ actor: { id: "u2" }, error: null });
    inviterMock.mockResolvedValue(Response.json({ ok: true }));
  });

  it("lets a non-owner member through to the inviter rule with the chosen name", async () => {
    ownerMock.mockResolvedValue({ allow: false, reason: "forbidden" });

    const response = await call();

    expect(response.status).toBe(200);
    expect(inviterMock).toHaveBeenCalledWith({
      projectId: "p1",
      actorUserId: "u2",
      body: {
        action: "approve",
        requestId: "r1",
        projectDisplayName: "Thien Cursor",
      },
    });
    expect(approveMock).not.toHaveBeenCalled();
  });

  it("keeps the owner on the normal approve path", async () => {
    ownerMock.mockResolvedValue({ allow: true });
    approveMock.mockResolvedValue({ ok: true, request: {}, membership: {} });

    await call();

    expect(inviterMock).not.toHaveBeenCalled();
    expect(approveMock).toHaveBeenCalled();
  });
});
