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

import createProjectKnowledgeCandidate from "@/lib/projects/knowledge/createProjectKnowledgeCandidate";

describe("createProjectKnowledgeCandidate notify hook", () => {
  beforeEach(() => {
    scheduleMock.mockClear();
    sqlMock.mockReset();
  });

  it("schedules after insert success", async () => {
    sqlMock
      .mockResolvedValueOnce([{ id: "proj-1" }])
      .mockResolvedValueOnce([]);
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
    sqlMock.mockResolvedValueOnce([]);
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
