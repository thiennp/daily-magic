import { beforeEach, describe, expect, it, vi } from "vitest";

const scheduleMock = vi.hoisted(() =>
  vi.fn(async (_input: unknown) => ({ scheduled: true })),
);
const listMock = vi.hoisted(() => vi.fn());
const updateStatusMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/knowledge/listProjectKnowledgeItemsForProject", () => ({
  default: (ownerUserId: unknown, projectId: unknown, statuses: unknown) =>
    listMock(ownerUserId, projectId, statuses),
}));
vi.mock("@/lib/projects/knowledge/updateProjectKnowledgeItemStatus", () => ({
  default: (input: unknown) => updateStatusMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify", () => ({
  scheduleProjectUpdatedNotify: (input: unknown) => scheduleMock(input),
}));

import promoteAllProjectKnowledgeCandidates from "@/lib/projects/knowledge/promoteAllProjectKnowledgeCandidates";

describe("promoteAllProjectKnowledgeCandidates notify (Arch A)", () => {
  beforeEach(() => {
    scheduleMock.mockClear();
    listMock.mockReset();
    updateStatusMock.mockReset();
  });

  it("does not re-schedule at orchestrator; leaf status updates own schedule", async () => {
    listMock.mockResolvedValue([
      { id: "k1" },
      { id: "k2" },
    ]);
    updateStatusMock.mockResolvedValue(true);

    await expect(
      promoteAllProjectKnowledgeCandidates({
        ownerUserId: "owner-1",
        projectId: "proj-1",
      }),
    ).resolves.toBe(2);

    expect(updateStatusMock).toHaveBeenCalledTimes(2);
    expect(scheduleMock).not.toHaveBeenCalled();
  });
});
