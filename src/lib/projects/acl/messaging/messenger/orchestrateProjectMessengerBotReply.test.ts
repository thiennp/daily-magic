import { beforeEach, describe, expect, it, vi } from "vitest";

const membershipMock = vi.fn();
const parentMock = vi.fn();
const dispatchMock = vi.fn();

vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: () => membershipMock(),
}));
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerParentRow",
  () => ({
    loadProjectMessengerParentRow: (input: unknown) => parentMock(input),
  }),
);
vi.mock("@/lib/projects/acl/messaging/dispatchProjectMessage", () => ({
  dispatchProjectMessage: (input: unknown) => dispatchMock(input),
}));

import { orchestrateProjectMessengerBotReply } from "@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerBotReply";

const PARENT = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const reply = (args: Record<string, unknown>) =>
  orchestrateProjectMessengerBotReply({
    actorUserId: "user-planner",
    args: { projectId: "proj-trip", summary: "Booked Pine Lake", ...args },
  });

describe("orchestrateProjectMessengerBotReply", () => {
  beforeEach(() => {
    membershipMock
      .mockReset()
      .mockResolvedValue({ id: "mem-planner", memberKind: "bot" });
    parentMock.mockReset();
    dispatchMock
      .mockReset()
      .mockResolvedValue({ ok: true, messageId: "m-2", recipientCount: 1 });
  });

  it("owner parent → Owner, parent id in the summary, default task.status", async () => {
    parentMock.mockResolvedValue({
      senderMembershipId: null,
      senderMemberKind: null,
      senderUserId: "user-jordan",
    });
    expect(await reply({ inReplyTo: PARENT })).toEqual({
      ok: true,
      messageId: "m-2",
      recipientCount: 1,
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      projectId: "proj-trip",
      actorUserId: "user-planner",
      args: {
        toProjectDisplayName: "Owner",
        kind: "task.status",
        summary: `${PARENT}: Booked Pine Lake`,
      },
    });
  });

  it("member parent → that member; done kind kept", async () => {
    parentMock.mockResolvedValue({
      senderMembershipId: "mem-alex",
      senderMemberKind: "human",
      senderUserId: "user-alex",
    });
    await reply({ inReplyTo: PARENT, kind: "task.done" });
    expect(dispatchMock.mock.calls[0]?.[0]).toMatchObject({
      args: { toMembershipId: "mem-alex", kind: "task.done" },
    });
  });

  it("no parent → Owner, summary unchanged", async () => {
    await reply({});
    expect(parentMock).not.toHaveBeenCalled();
    expect(dispatchMock.mock.calls[0]?.[0]).toMatchObject({
      args: { toProjectDisplayName: "Owner", summary: "Booked Pine Lake" },
    });
  });

  it("human seats and bad args are refused before dispatch", async () => {
    membershipMock.mockResolvedValue({ id: "mem-alex", memberKind: "human" });
    expect(await reply({})).toEqual({ ok: false, code: "forbidden" });
    expect(await reply({ kind: "task.assign" })).toEqual({
      ok: false,
      code: "invalid_kind",
    });
    expect(await reply({ inReplyTo: "not-an-id" })).toEqual({
      ok: false,
      code: "invalid_arguments",
    });
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
