import { beforeEach, describe, expect, it, vi } from "vitest";

import { requireProjectIdForCreate } from "@/lib/projects/requireProjectIdForCreate";

const mocks = vi.hoisted(() => ({
  checkProjectMembershipStatus: vi.fn(),
  getUserProjectById: vi.fn(),
}));

vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: mocks.checkProjectMembershipStatus,
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: mocks.getUserProjectById,
}));

describe("requireProjectIdForCreate", () => {
  beforeEach(() => {
    mocks.checkProjectMembershipStatus.mockReset();
    mocks.getUserProjectById.mockReset();
  });

  it("rejects missing project_id with project_required", async () => {
    const result = await requireProjectIdForCreate({
      actorUserId: "user-1",
      projectId: "  ",
    });

    expect(result).toEqual({
      ok: false,
      status: 400,
      code: "project_required",
      error: "project_id is required.",
    });
  });

  it("allows owner membership", async () => {
    mocks.checkProjectMembershipStatus.mockResolvedValue("owner");

    const result = await requireProjectIdForCreate({
      actorUserId: "user-1",
      projectId: "proj-1",
    });

    expect(result).toEqual({ ok: true, projectId: "proj-1" });
  });

  it("returns not_found when the project does not exist", async () => {
    mocks.checkProjectMembershipStatus.mockResolvedValue("none");
    mocks.getUserProjectById.mockResolvedValue(null);

    const result = await requireProjectIdForCreate({
      actorUserId: "user-1",
      projectId: "missing",
    });

    expect(result).toMatchObject({
      ok: false,
      status: 404,
      code: "not_found",
    });
  });

  it("returns forbidden when the actor is not a member", async () => {
    mocks.checkProjectMembershipStatus.mockResolvedValue("none");
    mocks.getUserProjectById.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "other",
    });

    const result = await requireProjectIdForCreate({
      actorUserId: "user-1",
      projectId: "proj-1",
    });

    expect(result).toMatchObject({
      ok: false,
      status: 403,
      code: "forbidden",
    });
  });
});
