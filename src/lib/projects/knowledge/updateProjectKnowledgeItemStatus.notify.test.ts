import { beforeEach, describe, expect, it, vi } from "vitest";

const scheduleMock = vi.hoisted(() =>
  vi.fn(async (_input: unknown) => ({ scheduled: true })),
);
const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock("@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify", () => ({
  scheduleProjectUpdatedNotify: (input: unknown) => scheduleMock(input),
}));

import updateProjectKnowledgeItemStatus from "@/lib/projects/knowledge/updateProjectKnowledgeItemStatus";

describe("updateProjectKnowledgeItemStatus notify hook", () => {
  beforeEach(() => {
    scheduleMock.mockClear();
    sqlMock.mockReset();
  });

  it("schedules only after a successful write", async () => {
    sqlMock.mockResolvedValueOnce([{ id: "item-1" }]);
    await expect(
      updateProjectKnowledgeItemStatus({
        ownerUserId: "owner-1",
        projectId: "proj-1",
        itemId: "item-1",
        status: "accepted",
      }),
    ).resolves.toBe(true);
    expect(scheduleMock).toHaveBeenCalledTimes(1);
    expect(scheduleMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      fields: ["knowledge"],
      actorUserId: "owner-1",
    });
  });

  it("does not schedule when the write matches nothing", async () => {
    sqlMock.mockResolvedValueOnce([]);
    await expect(
      updateProjectKnowledgeItemStatus({
        ownerUserId: "owner-1",
        projectId: "proj-1",
        itemId: "missing",
        status: "rejected",
      }),
    ).resolves.toBe(false);
    expect(scheduleMock).not.toHaveBeenCalled();
  });
});
