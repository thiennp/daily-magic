import { beforeEach, describe, expect, it, vi } from "vitest";

import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import { insertProjectSkillVersionWithSkill } from "@/features/project-skill-share/internal/infrastructure/db/insertProjectSkillVersionWithSkill";
import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";
import { selectProjectSkillVersionNumbers } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionNumbers";
import { deleteProjectSkillVersionRows } from "@/features/project-skill-share/internal/infrastructure/db/deleteProjectSkillVersionRows";
import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";
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

describe("publishProjectSkill mirror + conflicts", () => {
  beforeEach(() => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("member");
    vi.mocked(selectProjectSkillRow).mockResolvedValue(null);
    vi.mocked(insertProjectSkillVersionWithSkill).mockResolvedValue(
      projectSkillRecordFixture({ publisherUserId: "m1", contentHash: hash }),
    );
    vi.mocked(selectProjectSkillVersionNumbers).mockResolvedValue([1]);
    vi.mocked(deleteProjectSkillVersionRows).mockResolvedValue(undefined);
  });

  it("History ON mirrors and checks the hash", async () => {
    const write = vi
      .fn()
      .mockResolvedValue({ path: "/p/v0001.md", contentHash: hash });
    const history: ProjectSkillHistoryPort = {
      isHistoryEnabled: () => true,
      resolveProjectDataDir: () => "/p",
      writeProjectSkillVersion: write,
      readProjectSkillVersion: () => null,
    };
    const result = await publishProjectSkill({
      actorUserId: "m1",
      args: { projectId: "proj-1", name: "Deploy", body },
      deps: { history },
    });
    expect(result).toMatchObject({ ok: true, mirror: "mirrored" });
    expect(write).toHaveBeenCalledWith({
      projectId: "proj-1",
      skillId: "deploy",
      version: 1,
      body,
    });
  });

  it("reports version_conflict when a concurrent publish won", async () => {
    vi.mocked(insertProjectSkillVersionWithSkill).mockResolvedValue(null);
    const result = await publishProjectSkill({
      actorUserId: "m1",
      args: { projectId: "proj-1", name: "Deploy", body },
    });
    expect(result).toEqual({ ok: false, code: "version_conflict" });
  });
});
