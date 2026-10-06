import { beforeEach, describe, expect, it, vi } from "vitest";

import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";
import { listProjectSkills } from "@/features/project-skill-share/internal/infrastructure/orchestrators/listProjectSkills";
import { projectSkillRecordFixture } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareOrchestrators.fixtures";

vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole",
  () => ({ resolveProjectSkillActorRole: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows",
  () => ({ selectProjectSkillRows: vi.fn() }),
);

describe("listProjectSkills", () => {
  beforeEach(() => {
    vi.mocked(selectProjectSkillRows).mockResolvedValue([
      projectSkillRecordFixture({
        skillId: "pub",
        state: "published",
        publisherUserId: "a",
      }),
      projectSkillRecordFixture({
        skillId: "mine",
        state: "draft",
        publisherUserId: "m1",
      }),
      projectSkillRecordFixture({
        skillId: "theirs",
        state: "draft",
        publisherUserId: "a",
      }),
    ]);
  });

  it("member: published only (drafts owner-only)", async () => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("member");
    const result = await listProjectSkills({
      actorUserId: "m1",
      args: { projectId: "proj-1" },
    });
    expect(result.ok && result.skills.map((s) => s.skillId)).toEqual(["pub"]);
    expect(result.ok && result.skills[0]).toMatchObject({
      canRevoke: false,
      isPublisher: false,
    });
  });

  it("owner sees all drafts and can revoke", async () => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("owner");
    const result = await listProjectSkills({
      actorUserId: "o",
      args: { projectId: "proj-1" },
    });
    expect(result.ok && result.skills).toHaveLength(3);
    expect(result.ok && result.skills.every((s) => s.canRevoke)).toBe(true);
  });

  it("viewer: published only (no drafts)", async () => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("viewer");
    const result = await listProjectSkills({
      actorUserId: "v1",
      args: { projectId: "proj-1" },
    });
    expect(result.ok && result.skills.map((s) => s.skillId)).toEqual(["pub"]);
  });

  it("forbids non-members and rejects bad args", async () => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("none");
    expect(
      await listProjectSkills({
        actorUserId: "x",
        args: { projectId: "proj-1" },
      }),
    ).toEqual({ ok: false, code: "forbidden" });
    expect(await listProjectSkills({ actorUserId: "x", args: {} })).toEqual({
      ok: false,
      code: "invalid_arguments",
    });
  });
});
