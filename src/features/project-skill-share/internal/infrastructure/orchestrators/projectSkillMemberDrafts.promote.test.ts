import { beforeEach, describe, expect, it, vi } from "vitest";

import { promoteProjectSkillDraftVersion } from "@/features/project-skill-share/internal/infrastructure/db/promoteProjectSkillDraftVersion";
import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";
import { selectProjectSkillVersionNumbers } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionNumbers";
import { selectProjectSkillVersionRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionRow";
import { listProjectSkills } from "@/features/project-skill-share/internal/infrastructure/orchestrators/listProjectSkills";
import {
  projectSkillRecordFixture as rec,
  projectSkillVersionRowFixture,
} from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareOrchestrators.fixtures";
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
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows",
  () => ({ selectProjectSkillRows: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionNumbers",
  () => ({ selectProjectSkillVersionNumbers: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/deleteProjectSkillVersionRows",
  () => ({ deleteProjectSkillVersionRows: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionRow",
  () => ({ selectProjectSkillVersionRow: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/promoteProjectSkillDraftVersion",
  () => ({ promoteProjectSkillDraftVersion: vi.fn() }),
);

const role = (r: "owner" | "member" | "viewer") =>
  vi.mocked(resolveProjectSkillActorRole).mockResolvedValue(r);

describe("DF-040 owner promotes member drafts; draft visibility", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(selectProjectSkillVersionNumbers).mockResolvedValue([4]);
  });

  it("owner promotes a member's latest draft", async () => {
    role("owner");
    const pending = rec({
      publisherUserId: "kai",
      publishedVersion: 3,
      latestVersion: 4,
    });
    vi.mocked(selectProjectSkillRow).mockResolvedValue(pending);
    vi.mocked(selectProjectSkillVersionRow).mockResolvedValue({
      ...projectSkillVersionRowFixture("# gen", "sha256:gen"),
      version: 4,
      isDraft: true,
      createdByUserId: "kai",
    });
    vi.mocked(promoteProjectSkillDraftVersion).mockResolvedValue(
      rec({ publishedVersion: 4, latestVersion: 4, contentHash: "sha256:gen" }),
    );
    const result = await publishProjectSkill({
      actorUserId: "owner",
      args: { projectId: "proj-1", skillId: "deploy" },
    });
    expect(result).toMatchObject({
      ok: true,
      version: 4,
      contentHash: "sha256:gen",
    });
    expect(promoteProjectSkillDraftVersion).toHaveBeenCalledWith({
      skillRowId: "row-1",
      version: 4,
    });
  });

  it("list: members see drafts with author; viewers see published only", async () => {
    vi.mocked(selectProjectSkillRows).mockResolvedValue([
      rec({ skillId: "live" }),
      rec({
        skillId: "gen",
        state: "draft",
        publishedVersion: null,
        latestAuthorName: "Kai",
      }),
    ]);
    role("member");
    const m = await listProjectSkills({
      actorUserId: "kai",
      args: { projectId: "proj-1" },
    });
    expect(
      m.ok &&
        m.skills.map((s) => [s.skillId, s.latestAuthorName, s.canPublish]),
    ).toEqual([
      ["live", null, false],
      ["gen", "Kai", false],
    ]);
    role("viewer");
    const v = await listProjectSkills({
      actorUserId: "v",
      args: { projectId: "proj-1" },
    });
    expect(v.ok && v.skills.map((s) => s.skillId)).toEqual(["live"]);
  });
});
