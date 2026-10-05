import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const snapshots = vi.hoisted(() => new Map<string, unknown>());
const deleted = vi.hoisted(() => [] as string[]);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

const ensureAcl = vi.hoisted(() => vi.fn(async () => undefined));

vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: ensureAcl,
}));

vi.mock(
  "@/lib/projects/acl/messaging/loadProjectMessageDeleteSnapshot",
  () => ({
    loadProjectMessageDeleteSnapshot: async (input: { messageId: string }) =>
      snapshots.get(input.messageId) ?? null,
  }),
);

vi.mock("@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome", () => ({
  deleteProjectMessageWithOutcome: async (input: {
    messageId: string;
    deletedReason: string;
  }) => {
    deleted.push(`${input.messageId}:${input.deletedReason}`);
    return { ok: true as const, messageId: input.messageId };
  },
}));

import { deleteReadProjectMessages } from "@/lib/projects/acl/messaging/deleteReadProjectMessages";

describe("deleteReadProjectMessages", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    snapshots.clear();
    deleted.length = 0;
    ensureAcl.mockClear();
  });

  it("runs the single ACL ensure before reading snapshots", async () => {
    sqlMock.mockResolvedValue([]);
    await expect(deleteReadProjectMessages()).resolves.toBe(0);
    expect(ensureAcl).toHaveBeenCalledTimes(1);
  });

  it("deletes read + terminal and skips unread or still-watched", async () => {
    sqlMock.mockResolvedValue([
      { id: "msg-done" },
      { id: "msg-watch" },
      { id: "msg-unread" },
    ]);
    snapshots.set("msg-done", {
      messageId: "msg-done",
      kind: "task.assign",
      readAt: "2026-10-05T08:00:00.000Z",
      deliveryStates: ["done"],
    });
    snapshots.set("msg-watch", {
      messageId: "msg-watch",
      kind: "task.assign",
      readAt: "2026-10-05T08:00:00.000Z",
      deliveryStates: ["processing"],
    });
    snapshots.set("msg-unread", {
      messageId: "msg-unread",
      kind: "task.assign",
      readAt: null,
      deliveryStates: ["done"],
    });

    await expect(deleteReadProjectMessages()).resolves.toBe(1);
    expect(deleted).toEqual(["msg-done:delete_on_read"]);
  });

  it("deletes notice read + unwatched but not listed-unacked task.*", async () => {
    sqlMock.mockResolvedValue([{ id: "msg-notice" }, { id: "msg-task" }]);
    snapshots.set("msg-notice", {
      messageId: "msg-notice",
      kind: "peer.joined",
      readAt: "2026-10-05T08:00:00.000Z",
      deliveryStates: [],
    });
    snapshots.set("msg-task", {
      messageId: "msg-task",
      kind: "task.assign",
      readAt: "2026-10-05T08:00:00.000Z",
      deliveryStates: [null],
    });
    await expect(deleteReadProjectMessages()).resolves.toBe(1);
    expect(deleted).toEqual(["msg-notice:delete_on_read"]);
  });
});
