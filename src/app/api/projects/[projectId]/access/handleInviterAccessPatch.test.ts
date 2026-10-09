import { beforeEach, describe, expect, it, vi } from "vitest";

const seatMock = vi.hoisted(() => vi.fn());
const idsMock = vi.hoisted(() => vi.fn());
const approveMock = vi.hoisted(() => vi.fn());
const denyMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/resolveOwnerOrActiveHumanSeat", () => ({
  resolveOwnerOrActiveHumanSeat: seatMock,
}));
vi.mock("@/lib/projects/acl/listInviterRequestIds", () => ({
  listInviterRequestIds: idsMock,
}));
vi.mock("@/lib/projects/acl/approveProjectAccessRequest", () => ({
  approveProjectAccessRequest: approveMock,
}));
vi.mock("@/lib/projects/acl/denyProjectAccessRequest", () => ({
  denyProjectAccessRequest: denyMock,
}));

import { handleInviterAccessPatch } from "@/app/api/projects/[projectId]/access/handleInviterAccessPatch";

const memberSeat = {
  ok: true,
  kind: "human",
  project: { ownerUserId: "owner" },
  membership: { role: "member" },
};
const patch = (body: Record<string, unknown>) =>
  handleInviterAccessPatch({ projectId: "p1", actorUserId: "u2", body });

describe("handleInviterAccessPatch", () => {
  beforeEach(() => {
    for (const m of [seatMock, idsMock, approveMock, denyMock]) m.mockReset();
    seatMock.mockResolvedValue(memberSeat);
    idsMock.mockResolvedValue(new Set(["r1"]));
    approveMock.mockResolvedValue({ ok: true, request: { id: "r1" } });
    denyMock.mockResolvedValue({ ok: true, request: { id: "r1" } });
  });

  it("approves a request the member's own invite produced, as the owner's identity", async () => {
    const res = await patch({ action: "approve", requestId: "r1" });
    expect(res.status).toBe(200);
    expect(approveMock).toHaveBeenCalledWith(
      expect.objectContaining({ requestId: "r1", ownerUserId: "owner" }),
    );
  });

  it("denies the member's own request", async () => {
    expect((await patch({ action: "deny", requestId: "r1" })).status).toBe(200);
    expect(denyMock).toHaveBeenCalled();
  });

  it.each([
    ["someone else's request", { action: "approve", requestId: "r9" }],
    ["revoke", { action: "revoke", requestId: "r1" }],
    ["a missing requestId", { action: "approve" }],
  ])("refuses %s", async (_name, body) => {
    expect((await patch(body)).status).toBe(403);
    expect(approveMock).not.toHaveBeenCalled();
  });

  it("refuses a viewer", async () => {
    seatMock.mockResolvedValue({
      ...memberSeat,
      membership: { role: "viewer" },
    });
    expect((await patch({ action: "approve", requestId: "r1" })).status).toBe(
      403,
    );
  });
});
