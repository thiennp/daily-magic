import { beforeEach, describe, expect, it, vi } from "vitest";

import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import { insertProjectSkillVersionWithSkill } from "@/features/project-skill-share/internal/infrastructure/db/insertProjectSkillVersionWithSkill";
import {
  skillActorRoleProjectFixture,
  skillActorRoleSeatFixture,
} from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole.fixtures";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";
import { selectProjectSkillVersionNumbers } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionNumbers";
import { deleteProjectSkillVersionRows } from "@/features/project-skill-share/internal/infrastructure/db/deleteProjectSkillVersionRows";
import { projectSkillRecordFixture } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareOrchestrators.fixtures";
import { publishProjectSkill } from "@/features/project-skill-share/internal/infrastructure/orchestrators/publishProjectSkill";
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
  "@/features/project-skill-share/internal/infrastructure/db/insertProjectSkillVersionWithSkill",
  () => ({ insertProjectSkillVersionWithSkill: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionNumbers",
  () => ({ selectProjectSkillVersionNumbers: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/deleteProjectSkillVersionRows",
  () => ({ deleteProjectSkillVersionRows: vi.fn() }),
);

const body = "# Deploy\nsteps";
const hash = computeProjectSkillContentHash(body);

describe("publishProjectSkill real resolver viewer gate", () => {
  beforeEach(() => {
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getActiveProjectMembership).mockReset();
    vi.mocked(selectProjectSkillRow).mockReset();
    vi.mocked(insertProjectSkillVersionWithSkill).mockReset();
    vi.mocked(selectProjectSkillVersionNumbers).mockReset();
    vi.mocked(deleteProjectSkillVersionRows).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(
      skillActorRoleProjectFixture,
    );
    vi.mocked(selectProjectSkillRow).mockResolvedValue(null);
    vi.mocked(insertProjectSkillVersionWithSkill).mockResolvedValue(
      projectSkillRecordFixture({
        publisherUserId: "actor-1",
        contentHash: hash,
      }),
    );
    vi.mocked(selectProjectSkillVersionNumbers).mockResolvedValue([1]);
    vi.mocked(deleteProjectSkillVersionRows).mockResolvedValue(undefined);
  });

  it("forbids viewer from publishing a new skill", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(
      skillActorRoleSeatFixture("viewer", "human"),
    );
    const result = await publishProjectSkill({
      actorUserId: "actor-1",
      args: { projectId: "proj-1", name: "Deploy", body },
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
    expect(insertProjectSkillVersionWithSkill).not.toHaveBeenCalled();
  });

  it("forbids member from publishing a new skill", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(
      skillActorRoleSeatFixture("member", "human"),
    );
    const result = await publishProjectSkill({
      actorUserId: "actor-1",
      args: { projectId: "proj-1", name: "Deploy", body },
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
    expect(insertProjectSkillVersionWithSkill).not.toHaveBeenCalled();
  });

  it("allows owner to publish a new skill", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(null);
    // actor is project owner via fixture ownerUserId
    const result = await publishProjectSkill({
      actorUserId: skillActorRoleProjectFixture.ownerUserId,
      args: { projectId: "proj-1", name: "Deploy", body },
    });
    expect(result.ok).toBe(true);
    expect(insertProjectSkillVersionWithSkill).toHaveBeenCalled();
  });
});
