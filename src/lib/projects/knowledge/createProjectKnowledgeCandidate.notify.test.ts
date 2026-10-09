import { beforeEach, describe, expect, it, vi } from "vitest";

const scheduleMock = vi.hoisted(() => vi.fn(async () => ({ scheduled: true })));
const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock("@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify", () => ({
  scheduleProjectUpdatedNotify: scheduleMock,
}));

const canSubmitMock = vi.hoisted(() => vi.fn(async () => true));

vi.mock(
  "@/lib/projects/knowledge/canUserSubmitProjectKnowledgeCandidate",
  () => ({
    canUserSubmitProjectKnowledgeCandidate: canSubmitMock,
  }),
);

import createProjectKnowledgeCandidate from "@/lib/projects/knowledge/createProjectKnowledgeCandidate";

describe("createProjectKnowledgeCandidate notify hook", () => {
  beforeEach(() => {
    scheduleMock.mockClear();
    sqlMock.mockReset();
    canSubmitMock.mockReset();
    canSubmitMock.mockResolvedValue(true);
  });

  it("schedules after insert success", async () => {
    sqlMock.mockResolvedValueOnce([]);
    const id = await createProjectKnowledgeCandidate({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      kind: "lesson",
    });
    expect(id).toEqual(expect.any(String));
    expect(scheduleMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      fields: ["knowledge"],
      actorUserId: "owner-1",
    });
  });

  it("does not schedule when the project is missing", async () => {
    canSubmitMock.mockResolvedValue(false);
    await expect(
      createProjectKnowledgeCandidate({
        projectId: "missing",
        ownerUserId: "owner-1",
        kind: "fact",
      }),
    ).resolves.toBeNull();
    expect(scheduleMock).not.toHaveBeenCalled();
  });
});
