import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock("@/lib/projects/acl/ensureProjectComputerMembershipSchema", () => ({
  ensureProjectComputerMembershipSchema: vi.fn(async () => undefined),
}));

import { canUserSubmitProjectKnowledgeCandidate } from "@/lib/projects/knowledge/canUserSubmitProjectKnowledgeCandidate";

describe("canUserSubmitProjectKnowledgeCandidate", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("allows the project owner", async () => {
    sqlMock.mockResolvedValueOnce([{ id: "proj-1" }]);
    await expect(
      canUserSubmitProjectKnowledgeCandidate({
        projectId: "proj-1",
        userId: "owner-1",
      }),
    ).resolves.toBe(true);
  });

  it("allows an active human member", async () => {
    sqlMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ project_id: "proj-1" }]);
    await expect(
      canUserSubmitProjectKnowledgeCandidate({
        projectId: "proj-1",
        userId: "member-1",
      }),
    ).resolves.toBe(true);
  });

  it("allows an active computer seat for the device", async () => {
    sqlMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: "seat-1" }]);
    await expect(
      canUserSubmitProjectKnowledgeCandidate({
        projectId: "proj-1",
        userId: "owner-1",
        deviceId: "dev-1",
      }),
    ).resolves.toBe(true);
  });

  it("denies when no relationship matches", async () => {
    sqlMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    await expect(
      canUserSubmitProjectKnowledgeCandidate({
        projectId: "proj-1",
        userId: "stranger",
        deviceId: "dev-9",
      }),
    ).resolves.toBe(false);
  });
});
