import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const notify = vi.hoisted(() => vi.fn(async () => "delivered" as const));
const overdue = vi.hoisted(() =>
  vi.fn(async () => ({ count: 1, oldestCreatedAt: "2026-09-01T00:00:00.000Z" })),
);
const backlog = vi.hoisted(() =>
  vi.fn(async () => [
    {
      messageId: "m-old",
      createdAt: "2026-09-01T00:00:00.000Z",
      kind: "task",
      summary: "s",
      refs: {},
      fromProjectDisplayName: "Owner",
      fromMembershipId: null,
      toMembershipId: null,
      toUserId: null,
      toTeamLabel: null,
      toProjectDisplayName: null,
      ackedAt: null,
    },
  ]),
);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/acl/messaging/notifyProjectComputerOfMessage", () => ({
  notifyProjectComputerOfMessage: notify,
}));

vi.mock(
  "@/lib/projects/acl/messaging/readProjectComputerHistoryUnsavedOverdue",
  () => ({
    readProjectComputerHistoryUnsavedOverdue: overdue,
  }),
);

vi.mock("@/lib/projects/acl/messaging/listProjectComputerHistoryBacklog", () => ({
  listProjectComputerHistoryBacklog: backlog,
}));

import { wakeProjectComputersForUnsavedOverdue } from "@/lib/projects/acl/messaging/wakeProjectComputerForUnsavedOverdue";
import { PROJECT_COMPUTER_HISTORY_UNSAVED_WAKE_KEY_PREFIX } from "@/lib/projects/acl/messaging/projectComputerHistory.constants";

describe("wakeProjectComputersForUnsavedOverdue", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    notify.mockClear();
    overdue.mockClear();
    backlog.mockClear();
  });

  it("re-pushes oldest backlog via notify and stamps last_unsaved_wake_at", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("SELECT project_id, last_unsaved_wake_at")) {
        return [{ project_id: "p1", last_unsaved_wake_at: null }];
      }
      return [];
    });
    const now = new Date("2026-10-20T12:00:00.000Z");
    expect(await wakeProjectComputersForUnsavedOverdue({ now })).toBe(1);
    expect(notify).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "p1",
        message: expect.objectContaining({ messageId: "m-old" }),
        idempotencyKey: expect.stringContaining(
          PROJECT_COMPUTER_HISTORY_UNSAVED_WAKE_KEY_PREFIX,
        ),
      }),
    );
    const update = sqlMock.mock.calls.find((c) =>
      String(c[0]).includes("SET last_unsaved_wake_at"),
    );
    expect(update).toBeDefined();
  });

  it("skips projects woken within the min interval", async () => {
    const now = new Date("2026-10-20T12:00:00.000Z");
    sqlMock.mockResolvedValueOnce([
      {
        project_id: "p1",
        last_unsaved_wake_at: "2026-10-20T01:00:00.000Z",
      },
    ]);
    expect(await wakeProjectComputersForUnsavedOverdue({ now })).toBe(0);
    expect(notify).not.toHaveBeenCalled();
  });
});
