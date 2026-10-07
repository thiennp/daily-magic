import { beforeEach, describe, expect, it, vi } from "vitest";

import { insertProjectSkillVersionWithSkill } from "@/features/project-skill-share/internal/infrastructure/db/insertProjectSkillVersionWithSkill";
import { promoteProjectSkillDraftVersion } from "@/features/project-skill-share/internal/infrastructure/db/promoteProjectSkillDraftVersion";
import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";
import { updateProjectSkillRevoked } from "@/features/project-skill-share/internal/infrastructure/db/updateProjectSkillRevoked";
import { projectSkillRecordFixture as rec } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareOrchestrators.fixtures";
import { publishProjectSkill } from "@/features/project-skill-share/internal/infrastructure/orchestrators/publishProjectSkill";
import { revokeProjectSkill } from "@/features/project-skill-share/internal/infrastructure/orchestrators/revokeProjectSkill";

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
  "@/features/project-skill-share/internal/infrastructure/db/promoteProjectSkillDraftVersion",
  () => ({ promoteProjectSkillDraftVersion: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/updateProjectSkillRevoked",
  () => ({ updateProjectSkillRevoked: vi.fn() }),
);

const role = (r: "owner" | "member" | "viewer") =>
  vi.mocked(resolveProjectSkillActorRole).mockResolvedValue(r);
const draft = { projectId: "proj-1", body: "# gen", asDraft: true } as const;
const published = rec({
  publishedVersion: 3,
  latestVersion: 3,
  contentHash: "sha256:live",
});

describe("DF-040 members cannot publish or revoke; viewers cannot draft", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("member publish / promote → forbidden with owner-only message", async () => {
    role("member");
    vi.mocked(selectProjectSkillRow).mockResolvedValue(published);
    for (const args of [
      { projectId: "proj-1", name: "X", body: "# x" },
      { projectId: "proj-1", skillId: "deploy" },
      { projectId: "proj-1", skillId: "deploy", asDraft: true },
    ]) {
      expect(
        await publishProjectSkill({ actorUserId: "kai", args }),
      ).toMatchObject({
        ok: false,
        code: "forbidden",
        message: expect.stringContaining("Only the project owner can publish"),
      });
    }
    expect(insertProjectSkillVersionWithSkill).not.toHaveBeenCalled();
    expect(promoteProjectSkillDraftVersion).not.toHaveBeenCalled();
  });

  it("member revoke → forbidden; viewer draft → forbidden", async () => {
    role("member");
    vi.mocked(selectProjectSkillRow).mockResolvedValue(published);
    expect(
      await revokeProjectSkill({
        actorUserId: "kai",
        args: { projectId: "proj-1", skillId: "deploy" },
      }),
    ).toMatchObject({
      ok: false,
      code: "forbidden",
      message: expect.stringContaining("owner"),
    });
    expect(updateProjectSkillRevoked).not.toHaveBeenCalled();
    role("viewer");
    expect(
      await publishProjectSkill({
        actorUserId: "v",
        args: { ...draft, name: "X" },
      }),
    ).toMatchObject({ ok: false, code: "forbidden" });
    expect(insertProjectSkillVersionWithSkill).not.toHaveBeenCalled();
  });
});
