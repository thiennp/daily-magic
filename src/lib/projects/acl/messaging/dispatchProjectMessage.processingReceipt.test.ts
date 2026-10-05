import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMock = vi.fn();
const resolveMock = vi.fn();
const sqlMock = vi.fn();
const auditMock = vi.fn(async (_input: unknown) => undefined);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
}));

vi.mock("@/lib/projects/acl/messaging/purgeExpiredProjectMessages", () => ({
  purgeExpiredProjectMessages: async () => undefined,
}));

vi.mock("@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits", () => ({
  assertProjectMessageDispatchRateLimits: async () => ({ ok: true }),
}));

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

vi.mock("@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries", () => ({
  insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
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
  writeProjectAccessAudit: (input: unknown) => auditMock(input),
}));

import { dispatchProjectMessage } from "@/lib/projects/acl/messaging/dispatchProjectMessage";
import {
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

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
    resolveMock.mockReset();
    sqlMock.mockReset();
    auditMock.mockReset();
    resolveMock.mockResolvedValue({ ok: true, recipients });
  });

  it("stores one task.processing receipt per http_200 peer and skips other results", async () => {
    insertMock.mockImplementation(async (input: { kind?: string }) => {
      if (input.kind === PROJECT_MESSAGE_KIND_TASK_PROCESSING) {
        return { messageId: "receipt", wakeResults: [] };
      }
      return {
        messageId: "msg-1",
        wakeResults: [
          { membershipId: "mem-b", result: "http_200" },
          { membershipId: "mem-c", result: "not_postable" },
          { membershipId: "mem-a", result: "http_200" },
          { membershipId: "mem-d", result: "http_200" },
          { membershipId: "mem-stranger", result: "http_200" },
          { membershipId: "mem-c", result: "fetch_failed" },
          { membershipId: "mem-b", result: "http_500" },
        ],
      };
    });
    sqlMock.mockResolvedValue([
      { id: "mem-b", project_display_name: "Peer B" },
    ]);

    const result = await dispatch();
    expect(result).toEqual({
      ok: true,
      messageId: "msg-1",
      recipientCount: recipients.length,
    });
    expect(sqlMock).toHaveBeenCalledTimes(1);
    expect(sqlMock.mock.calls[0]?.slice(1)).toEqual(
      expect.arrayContaining(["proj-1", ["mem-b", "mem-d"]]),
    );

    const receipts = insertMock.mock.calls
      .map((call) => call[0] as Record<string, unknown>)
      .filter((input) => input.kind === PROJECT_MESSAGE_KIND_TASK_PROCESSING);
    expect(receipts).toEqual([
      {
        projectId: "proj-1",
        senderMembershipId: "mem-b",
        senderUserId: "user-b",
        senderProjectDisplayName: "Peer B",
        toMembershipId: "mem-a",
        toUserId: "user-a",
        toTeamLabel: null,
        toProjectDisplayName: "Sender Bot",
        kind: PROJECT_MESSAGE_KIND_TASK_PROCESSING,
        summary: "processing msg-1",
        refsJson: "{}",
        recipients: [{ id: "mem-a", user_id: "user-a" }],
      },
      {
        projectId: "proj-1",
        senderMembershipId: "mem-d",
        senderUserId: "user-d",
        senderProjectDisplayName: null,
        toMembershipId: "mem-a",
        toUserId: "user-a",
        toTeamLabel: null,
        toProjectDisplayName: "Sender Bot",
        kind: PROJECT_MESSAGE_KIND_TASK_PROCESSING,
        summary: "processing msg-1",
        refsJson: "{}",
        recipients: [{ id: "mem-a", user_id: "user-a" }],
      },
    ]);
    expect(String(receipts[0]?.summary).length).toBeLessThanOrEqual(
      PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
    );
    expect(auditMock).toHaveBeenCalledTimes(1);
    expect(auditMock.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({
        detail: expect.objectContaining({ messageId: "msg-1" }),
      }),
    );
  });

  it("does not store a receipt when the wake is not http_200", async () => {
    insertMock.mockResolvedValue({
      messageId: "msg-2",
      wakeResults: [
        { membershipId: "mem-b", result: "not_postable" },
        { membershipId: "mem-c", result: "fetch_failed" },
        { membershipId: "mem-d", result: "http_500" },
      ],
    });
    const result = await dispatch();
    expect(result).toEqual({
      ok: true,
      messageId: "msg-2",
      recipientCount: recipients.length,
    });
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
