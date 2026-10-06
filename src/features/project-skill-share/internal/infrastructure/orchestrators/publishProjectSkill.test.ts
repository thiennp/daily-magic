import { beforeEach, describe, expect, it, vi } from "vitest";

import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import { insertProjectSkillVersionWithSkill } from "@/features/project-skill-share/internal/infrastructure/db/insertProjectSkillVersionWithSkill";
import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";
import { selectProjectSkillVersionNumbers } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionNumbers";
import { deleteProjectSkillVersionRows } from "@/features/project-skill-share/internal/infrastructure/db/deleteProjectSkillVersionRows";
import { projectSkillRecordFixture } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareOrchestrators.fixtures";
import { publishProjectSkill } from "@/features/project-skill-share/internal/infrastructure/orchestrators/publishProjectSkill";

vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole",
  () => ({ resolveProjectSkillActorRole: vi.fn() }),
);
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

describe("publishProjectSkill", () => {
  beforeEach(() => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("owner");
    vi.mocked(selectProjectSkillRow).mockResolvedValue(null);
    vi.mocked(insertProjectSkillVersionWithSkill).mockResolvedValue(
      projectSkillRecordFixture({ publisherUserId: "m1", contentHash: hash }),
    );
    vi.mocked(selectProjectSkillVersionNumbers).mockResolvedValue([1]);
    vi.mocked(deleteProjectSkillVersionRows).mockResolvedValue(undefined);
  });

  it("forbids non-members", async () => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("none");
    const result = await publishProjectSkill({
      actorUserId: "x",
      args: { projectId: "proj-1", name: "Deploy", body },
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
  });

  it("rejects bodies over 64KB before writing", async () => {
    const result = await publishProjectSkill({
      actorUserId: "m1",
      args: {
        projectId: "proj-1",
        name: "Deploy",
        body: "x".repeat(64 * 1024 + 1),
      },
    });
    expect(result).toEqual({ ok: false, code: "body_too_large" });
    expect(insertProjectSkillVersionWithSkill).not.toHaveBeenCalled();
  });

  it("stores body in AWC with hash; History OFF stub → not_applicable", async () => {
    const result = await publishProjectSkill({
      actorUserId: "m1",
      args: { projectId: "proj-1", name: "Deploy", body },
    });
    expect(result).toMatchObject({
      ok: true,
      version: 1,
      contentHash: hash,
      mirror: "not_applicable",
    });
    expect(insertProjectSkillVersionWithSkill).toHaveBeenCalledWith(
      expect.objectContaining({
        skillId: "deploy",
        body,
        contentHash: hash,
        expectedLatestVersion: 0,
      }),
    );
  });

  it("forbids members from publishing", async () => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("member");
    const result = await publishProjectSkill({
      actorUserId: "m1",
      args: { projectId: "proj-1", name: "Deploy", body },
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
    expect(insertProjectSkillVersionWithSkill).not.toHaveBeenCalled();
  });
});
