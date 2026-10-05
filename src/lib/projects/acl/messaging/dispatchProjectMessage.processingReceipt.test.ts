import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMock = vi.fn();
const receiptMock = vi.fn();
const resolveMock = vi.fn();

vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
}));

vi.mock("@/lib/projects/acl/messaging/purgeExpiredProjectMessages", () => ({
  purgeExpiredProjectMessages: async () => undefined,
}));

vi.mock(
  "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits",
  () => ({
    assertProjectMessageDispatchRateLimits: async () => ({ ok: true }),
  }),
);

vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: async () => ({
    id: "mem-a",
    projectId: "proj-1",
    userId: "user-a",
    role: "member",
    status: "active",
    teamLabel: null,
    scopes: ["msg:dispatch"],
    projectDisplayName: "Sender Bot",
    createdAt: "2026-01-01T00:00:00.000Z",
    revokedAt: null,
  }),
}));

vi.mock("@/lib/projects/acl/messaging/resolveDispatchRecipients", () => ({
  resolveDispatchRecipients: (input: unknown) => resolveMock(input),
}));

vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
  }),
);

vi.mock("@/lib/projects/acl/messaging/insertProjectProcessingReceipt", () => ({
  insertProjectProcessingReceipt: (input: unknown) => receiptMock(input),
}));

vi.mock("@/lib/projects/acl/messaging/checkProjectMessageSilence", () => ({
  checkProjectMessageSilence: async () => 0,
}));

vi.mock("@/lib/projects/acl/messaging/recordProjectPeerActivity", () => ({
  recordProjectPeerActivity: async () => ({ matched: 0, moved: 0 }),
}));

vi.mock("@/lib/projects/acl/messaging/startProjectMessageSilenceWatch", () => ({
  startProjectMessageSilenceWatch: async () => 0,
}));

vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: async () => undefined,
}));

import { dispatchProjectMessage } from "@/lib/projects/acl/messaging/dispatchProjectMessage";

const recipients = [
  { id: "mem-b", user_id: "user-b" },
  { id: "mem-c", user_id: "user-c" },
  { id: "mem-d", user_id: "user-d" },
  { id: null, user_id: "user-owner" },
];

const dispatch = () =>
  dispatchProjectMessage({
    projectId: "proj-1",
    actorUserId: "user-a",
    args: {
      kind: "task.assign",
      summary: "do the thing",
      toMembershipId: "mem-b",
    },
  });

describe("dispatchProjectMessage processing receipt", () => {
  beforeEach(() => {
    insertMock.mockReset();
    receiptMock.mockClear();
    resolveMock.mockReset();
    resolveMock.mockResolvedValue({ ok: true, recipients });
  });

  it("asks for one shared receipt per http_200 recipient peer", async () => {
    insertMock.mockResolvedValue({
      messageId: "msg-1",
      wakeResults: [
        { membershipId: "mem-b", result: "http_200" },
        { membershipId: "mem-c", result: "not_postable" },
        { membershipId: "mem-d", result: "http_200" },
        { membershipId: "mem-stranger", result: "http_200" },
        { membershipId: "mem-b", result: "http_500" },
      ],
    });
    const result = await dispatch();
    expect(result).toMatchObject({ ok: true, messageId: "msg-1" });
    const shared = {
      projectId: "proj-1",
      sender: "mem-a",
      originalMessageId: "msg-1",
    };
    expect(receiptMock.mock.calls.map((call) => call[0])).toEqual([
      { ...shared, peer: "mem-b" },
      { ...shared, peer: "mem-d" },
    ]);
  });
});
