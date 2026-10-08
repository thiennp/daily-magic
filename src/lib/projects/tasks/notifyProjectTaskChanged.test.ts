import { beforeEach, describe, expect, it, vi } from "vitest";

import { notifyProjectTaskChanged } from "@/lib/projects/tasks/notifyProjectTaskChanged";
import { projectTaskRecordFixture as task } from "@/lib/projects/tasks/projectTask.fixtures";

const h = vi.hoisted(() => ({
  insert: vi.fn(),
  seats: vi.fn(),
  dependents: vi.fn(),
}));
vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: h.insert,
  }),
);
vi.mock("@/lib/projects/tasks/projectTaskNoticeQueries", () => ({
  loadActiveProjectTaskNoticeSeats: h.seats,
  listProjectTaskDependents: h.dependents,
}));

const before = task({
  id: "t1",
  status: "in_progress",
  ownerMembershipId: "seat-a",
});
const call = (after = { ...before, status: "queued" as const }) =>
  notifyProjectTaskChanged({
    projectId: "p1",
    actorUserId: "owner-1",
    actorMembershipId: null,
    actorLabel: "Owner",
    before,
    after,
  });

describe("notifyProjectTaskChanged", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    h.dependents.mockResolvedValue([]);
    h.seats.mockResolvedValue(
      new Map([
        [
          "seat-a",
          { id: "seat-a", userId: "u-a", projectDisplayName: "Agent A" },
        ],
      ]),
    );
    h.insert.mockResolvedValue({ messageId: "m1", wakeResults: [] });
  });

  it("sends one task.updated message to the affected seat", async () => {
    expect(await call()).toBe(1);
    expect(h.insert).toHaveBeenCalledTimes(1);
    expect(h.insert.mock.calls[0]?.[0]).toMatchObject({
      projectId: "p1",
      kind: "task.updated",
      senderMembershipId: null,
      senderUserId: "owner-1",
      toMembershipId: "seat-a",
      toUserId: "u-a",
      refsJson: expect.stringContaining('"taskId":"t1"'),
    });
  });

  it("skips seats that are no longer active and never throws", async () => {
    h.seats.mockResolvedValue(new Map());
    expect(await call()).toBe(0);
    expect(h.insert).not.toHaveBeenCalled();
    h.seats.mockRejectedValue(new Error("db down"));
    expect(await call()).toBe(0);
  });

  it("loads dependents only when the task finished or got blocked", async () => {
    await call();
    expect(h.dependents).not.toHaveBeenCalled();
    await call({ ...before, status: "done" as never });
    expect(h.dependents).toHaveBeenCalledTimes(1);
  });
});
