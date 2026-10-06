import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  skillActorRoleProjectFixture,
  skillActorRoleSeatFixture,
} from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole.fixtures";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";
import { updateProjectSkillRevoked } from "@/features/project-skill-share/internal/infrastructure/db/updateProjectSkillRevoked";
import { projectSkillRecordFixture } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareOrchestrators.fixtures";
import { revokeProjectSkill } from "@/features/project-skill-share/internal/infrastructure/orchestrators/revokeProjectSkill";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(),
}));
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow",
  () => ({ selectProjectSkillRow: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/updateProjectSkillRevoked",
  () => ({ updateProjectSkillRevoked: vi.fn() }),
);

describe("revokeProjectSkill real resolver viewer gate", () => {
  beforeEach(() => {
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getActiveProjectMembership).mockReset();
    vi.mocked(selectProjectSkillRow).mockReset();
    vi.mocked(updateProjectSkillRevoked).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(
      skillActorRoleProjectFixture,
    );
  });

  it("forbids viewer from revoking", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(
      skillActorRoleSeatFixture("viewer", "human"),
    );
    vi.mocked(selectProjectSkillRow).mockResolvedValue(
      projectSkillRecordFixture({ publisherUserId: "actor-1" }),
    );
    const result = await revokeProjectSkill({
      actorUserId: "actor-1",
      args: { projectId: "proj-1", skillId: "deploy" },
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
    expect(updateProjectSkillRevoked).not.toHaveBeenCalled();
  });

  it("forbids member publisher from revoking", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(
      skillActorRoleSeatFixture("member", "human"),
    );
    vi.mocked(selectProjectSkillRow).mockResolvedValue(
      projectSkillRecordFixture({ publisherUserId: "actor-1" }),
    );
    const result = await revokeProjectSkill({
      actorUserId: "actor-1",
      args: { projectId: "proj-1", skillId: "deploy" },
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
    expect(updateProjectSkillRevoked).not.toHaveBeenCalled();
  });

  it("allows owner to revoke", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(null);
    const published = projectSkillRecordFixture({
      publisherUserId: "someone",
    });
    vi.mocked(selectProjectSkillRow).mockResolvedValue(published);
    vi.mocked(updateProjectSkillRevoked).mockResolvedValue({
      ...published,
      state: "revoked",
      revokedAt: "2026-10-05T00:00:00Z",
    });
    const result = await revokeProjectSkill({
      actorUserId: skillActorRoleProjectFixture.ownerUserId,
      args: { projectId: "proj-1", skillId: "deploy" },
    });
    expect(result.ok).toBe(true);
    expect(updateProjectSkillRevoked).toHaveBeenCalled();
  });
});
