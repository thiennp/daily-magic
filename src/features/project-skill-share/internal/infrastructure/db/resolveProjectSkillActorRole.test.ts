import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  skillActorRoleProjectFixture,
  skillActorRoleSeatFixture,
} from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole.fixtures";
import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(),
}));

describe("resolveProjectSkillActorRole", () => {
  beforeEach(() => {
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getActiveProjectMembership).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(skillActorRoleProjectFixture);
  });

  it("returns owner when actor owns the project", async () => {
    await expect(
      resolveProjectSkillActorRole({
        projectId: "proj-1",
        actorUserId: "owner-1",
      }),
    ).resolves.toBe("owner");
    expect(getActiveProjectMembership).not.toHaveBeenCalled();
  });

  it("returns viewer for an active human viewer seat", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(
      skillActorRoleSeatFixture("viewer", "human"),
    );
    await expect(
      resolveProjectSkillActorRole({
        projectId: "proj-1",
        actorUserId: "actor-1",
      }),
    ).resolves.toBe("viewer");
  });

  it("returns member for an active human member seat", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(
      skillActorRoleSeatFixture("member", "human"),
    );
    await expect(
      resolveProjectSkillActorRole({
        projectId: "proj-1",
        actorUserId: "actor-1",
      }),
    ).resolves.toBe("member");
  });

  it("returns none when there is no active membership", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(null);
    await expect(
      resolveProjectSkillActorRole({
        projectId: "proj-1",
        actorUserId: "stranger",
      }),
    ).resolves.toBe("none");
  });

  it("keeps bot seats as member (unchanged)", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(
      skillActorRoleSeatFixture("member", "bot"),
    );
    await expect(
      resolveProjectSkillActorRole({
        projectId: "proj-1",
        actorUserId: "bot-1",
      }),
    ).resolves.toBe("member");
  });

  it("returns project_not_found when the project is missing", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue(null);
    await expect(
      resolveProjectSkillActorRole({
        projectId: "missing",
        actorUserId: "owner-1",
      }),
    ).resolves.toBe("project_not_found");
  });
});
