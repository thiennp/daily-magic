import { beforeEach, describe, expect, it, vi } from "vitest";

import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { resolveOwnerOrActiveHumanSeat } from "@/lib/projects/acl/resolveOwnerOrActiveHumanSeat";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));

const humanSeat = (role: "member" | "viewer") =>
  ({
    id: "mem-1",
    role,
    memberKind: "human",
    status: "active",
    scopes: [],
    projectDisplayName: null,
  }) as never;

describe("resolveOwnerOrActiveHumanSeat", () => {
  beforeEach(() => {
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
    vi.mocked(getActiveProjectMembership).mockResolvedValue(null);
  });

  it("allows the owner", async () => {
    await expect(
      resolveOwnerOrActiveHumanSeat({
        projectId: "proj-1",
        actorUserId: "owner-1",
      }),
    ).resolves.toMatchObject({ ok: true, kind: "owner" });
  });

  it.each(["member", "viewer"] as const)(
    "allows active human %s",
    async (role) => {
      vi.mocked(getActiveProjectMembership).mockResolvedValue(humanSeat(role));
      await expect(
        resolveOwnerOrActiveHumanSeat({
          projectId: "proj-1",
          actorUserId: "user-1",
        }),
      ).resolves.toMatchObject({ ok: true, kind: "human" });
    },
  );

  it("forbids bot seats and strangers", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue({
      ...humanSeat("member"),
      memberKind: "bot",
    } as never);
    await expect(
      resolveOwnerOrActiveHumanSeat({
        projectId: "proj-1",
        actorUserId: "bot-1",
      }),
    ).resolves.toEqual({ ok: false, code: "forbidden" });

    vi.mocked(getActiveProjectMembership).mockResolvedValue(null);
    await expect(
      resolveOwnerOrActiveHumanSeat({
        projectId: "proj-1",
        actorUserId: "stranger",
      }),
    ).resolves.toEqual({ ok: false, code: "forbidden" });
  });

  it("not_found when project missing", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue(null);
    await expect(
      resolveOwnerOrActiveHumanSeat({
        projectId: "missing",
        actorUserId: "owner-1",
      }),
    ).resolves.toEqual({ ok: false, code: "not_found" });
  });
});
