import { beforeEach, describe, expect, it, vi } from "vitest";

import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

const membershipMock = vi.fn();
const rateMock = vi.fn();
const orchestrateMock = vi.fn();

vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
}));
vi.mock("@/lib/projects/acl/messaging/purgeExpiredProjectMessages", () => ({
  purgeExpiredProjectMessages: async () => undefined,
}));
vi.mock("@/lib/projects/acl/messaging/checkProjectMessageSilence", () => ({
  checkProjectMessageSilence: async () => 0,
}));
vi.mock(
  "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits",
  () => ({
    assertProjectMessageDispatchRateLimits: (input: unknown) => rateMock(input),
  }),
);
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: () => membershipMock(),
}));
vi.mock("@/lib/projects/acl/messaging/resolveDispatchRecipients", () => ({
  resolveDispatchRecipients: async () => ({
    ok: true,
    recipients: [{ id: "mem-b", user_id: "user-b" }],
  }),
}));
vi.mock("@/lib/projects/acl/messaging/orchestrateProjectBotToBotMessage", () => ({
  orchestrateProjectBotToBotMessage: (input: unknown) => orchestrateMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/writeProjectMessageDispatchAudit", () => ({
  writeProjectMessageDispatchAudit: async () => undefined,
}));

import { dispatchProjectMessage } from "@/lib/projects/acl/messaging/dispatchProjectMessage";

const seat = (
  overrides: Partial<ProjectMembershipRecord>,
): ProjectMembershipRecord => ({
  id: "mem-a",
  projectId: "proj-1",
  userId: "user-a",
  role: "member",
  status: "active",
  memberKind: "bot",
  teamLabel: null,
  scopes: ["msg:dispatch"],
  projectDisplayName: "Sender Bot",
  createdAt: "2026-01-01T00:00:00.000Z",
  revokedAt: null,
  ...overrides,
});

const dispatch = () =>
  dispatchProjectMessage({
    projectId: "proj-1",
    actorUserId: "user-a",
    args: { kind: "task.assign", summary: "do it", toMembershipId: "mem-b" },
  });

describe("dispatchProjectMessage human member roles", () => {
  beforeEach(() => {
    membershipMock.mockReset();
    rateMock.mockReset();
    orchestrateMock.mockReset();
    rateMock.mockResolvedValue({ ok: true });
    orchestrateMock.mockResolvedValue({ messageId: "msg-1", wakeResults: [] });
  });

  it("bot member dispatch is unchanged", async () => {
    membershipMock.mockResolvedValue(seat({}));
    expect(await dispatch()).toEqual({
      ok: true,
      messageId: "msg-1",
      recipientCount: 1,
    });
    expect(orchestrateMock.mock.calls[0]?.[0]).toMatchObject({
      message: {
        senderMembershipId: "mem-a",
        senderProjectDisplayName: "Sender Bot",
      },
    });
  });

  it("human member (no scopes) dispatches under the same caps", async () => {
    membershipMock.mockResolvedValue(
      seat({ memberKind: "human", scopes: [], projectDisplayName: "Alex" }),
    );
    expect(await dispatch()).toMatchObject({ ok: true, messageId: "msg-1" });
    expect(rateMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      senderMembershipId: "mem-a",
      senderUserId: "user-a",
    });
    expect(orchestrateMock.mock.calls[0]?.[0]).toMatchObject({
      message: { senderProjectDisplayName: "Alex" },
    });
  });

  it("viewer is rejected before caps, recipients, or insert", async () => {
    membershipMock.mockResolvedValue(
      seat({ role: "viewer", memberKind: "human", scopes: [], projectDisplayName: null }),
    );
    expect(await dispatch()).toEqual({ ok: false, code: "viewer_read_only" });
    expect(rateMock).not.toHaveBeenCalled();
    expect(orchestrateMock).not.toHaveBeenCalled();
  });

  it("bot without msg:dispatch still gets missing_scope", async () => {
    membershipMock.mockResolvedValue(seat({ scopes: ["acl:self"] }));
    expect(await dispatch()).toEqual({ ok: false, code: "missing_scope" });
    expect(orchestrateMock).not.toHaveBeenCalled();
  });

  it("non-member stays forbidden", async () => {
    membershipMock.mockResolvedValue(null);
    expect(await dispatch()).toEqual({ ok: false, code: "forbidden" });
  });
});
