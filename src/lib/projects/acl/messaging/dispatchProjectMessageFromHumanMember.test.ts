import { beforeEach, describe, expect, it, vi } from "vitest";

import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

const membershipMock = vi.fn();
const dispatchMock = vi.fn();

vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: () => membershipMock(),
}));
vi.mock("@/lib/projects/acl/messaging/dispatchProjectMessage", () => ({
  dispatchProjectMessage: (input: unknown) => dispatchMock(input),
}));

import { dispatchProjectMessageFromHumanMember } from "@/lib/projects/acl/messaging/dispatchProjectMessageFromHumanMember";

const seat = (
  overrides: Partial<ProjectMembershipRecord>,
): ProjectMembershipRecord => ({
  id: "mem-h",
  projectId: "proj-1",
  userId: "user-h",
  role: "member",
  status: "active",
  memberKind: "human",
  teamLabel: null,
  scopes: [],
  projectDisplayName: "Alex",
  createdAt: "2026-01-01T00:00:00.000Z",
  revokedAt: null,
  ...overrides,
});

const send = (args: unknown = { summary: "hi", toMembershipId: "mem-b" }) =>
  dispatchProjectMessageFromHumanMember({
    projectId: "proj-1",
    actorUserId: "user-h",
    args,
  });

describe("dispatchProjectMessageFromHumanMember", () => {
  beforeEach(() => {
    membershipMock.mockReset();
    dispatchMock.mockReset();
    dispatchMock.mockResolvedValue({ ok: true, messageId: "msg-1", recipientCount: 1 });
  });

  it("human member delegates to project dispatch with default kind", async () => {
    membershipMock.mockResolvedValue(seat({}));
    expect(await send()).toEqual({ ok: true, messageId: "msg-1", recipientCount: 1 });
    expect(dispatchMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      actorUserId: "user-h",
      args: { summary: "hi", toMembershipId: "mem-b", kind: "task.assign" },
    });
  });

  it("keeps an explicit kind", async () => {
    membershipMock.mockResolvedValue(seat({}));
    await send({ kind: "task.status", summary: "hi", toMembershipId: "mem-b" });
    expect(dispatchMock.mock.calls[0]?.[0]).toMatchObject({
      args: { kind: "task.status" },
    });
  });

  it("viewer gets viewer_read_only and nothing is dispatched", async () => {
    membershipMock.mockResolvedValue(seat({ role: "viewer", projectDisplayName: null }));
    expect(await send()).toEqual({ ok: false, code: "viewer_read_only" });
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it("bot seats and non-members stay forbidden on the session path", async () => {
    membershipMock.mockResolvedValue(seat({ memberKind: "bot", scopes: ["msg:dispatch"] }));
    expect(await send()).toEqual({ ok: false, code: "forbidden" });
    membershipMock.mockResolvedValue(seat({ memberKind: undefined }));
    expect(await send()).toEqual({ ok: false, code: "forbidden" });
    membershipMock.mockResolvedValue(null);
    expect(await send()).toEqual({ ok: false, code: "forbidden" });
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it("unnamed human member gets naming_required", async () => {
    membershipMock.mockResolvedValue(seat({ projectDisplayName: null }));
    expect(await send()).toEqual({ ok: false, code: "naming_required" });
  });

  it("member with an unreadable body gets invalid_arguments", async () => {
    membershipMock.mockResolvedValue(seat({}));
    expect(await send(null)).toEqual({ ok: false, code: "invalid_arguments" });
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
