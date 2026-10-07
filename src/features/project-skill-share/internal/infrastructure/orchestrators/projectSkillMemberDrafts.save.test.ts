import { beforeEach, describe, expect, it, vi } from "vitest";

import { insertProjectSkillVersionWithSkill } from "@/features/project-skill-share/internal/infrastructure/db/insertProjectSkillVersionWithSkill";
import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";
import { selectProjectSkillVersionNumbers } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionNumbers";
import { projectSkillRecordFixture as rec } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareOrchestrators.fixtures";
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

const role = (r: "owner" | "member" | "viewer") =>
  vi.mocked(resolveProjectSkillActorRole).mockResolvedValue(r);
const inserted = () =>
  vi.mocked(insertProjectSkillVersionWithSkill).mock.calls[0]?.[0];
const draft = { projectId: "proj-1", body: "# gen", asDraft: true } as const;
const published = rec({
  publishedVersion: 3,
  latestVersion: 3,
  contentHash: "sha256:live",
});

describe("DF-040 member drafts are saved without touching the live row", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    role("member");
    vi.mocked(selectProjectSkillRow).mockResolvedValue(null);
    vi.mocked(selectProjectSkillVersionNumbers).mockResolvedValue([1]);
    vi.mocked(insertProjectSkillVersionWithSkill).mockImplementation(
      async (i) =>
        rec({
          state: i.transition.state,
          latestVersion: i.version,
          publisherUserId: "kai",
        }),
    );
  });

  it("member asDraft new skill (playbook kind) → saved as draft", async () => {
    const result = await publishProjectSkill({
      actorUserId: "kai",
      args: { ...draft, name: "Arch review loop", kind: "playbook" },
    });
    expect(result).toMatchObject({
      ok: true,
      version: 1,
      mirror: "not_applicable",
    });
    expect(inserted()).toMatchObject({
      asDraft: true,
      kind: "playbook",
      actorUserId: "kai",
    });
    expect(inserted()?.transition).toMatchObject({
      state: "draft",
      publishedVersion: null,
    });
  });

  it("member asDraft new version of a published skill keeps the live version/body/meta", async () => {
    vi.mocked(selectProjectSkillRow).mockResolvedValue(published);
    const result = await publishProjectSkill({
      actorUserId: "kai",
      args: { ...draft, skillId: "deploy", name: "Renamed", kind: "playbook" },
    });
    expect(result.ok).toBe(true);
    expect(inserted()).toMatchObject({
      draftOnly: true,
      version: 4,
      kind: "skill",
      asDraft: true,
    });
    expect(inserted()?.transition).toEqual({
      state: "published",
      publishedVersion: 3,
      contentHash: "sha256:live",
    });
  });

  it("member draft on a revoked skill keeps it revoked", async () => {
    vi.mocked(selectProjectSkillRow).mockResolvedValue(
      rec({ state: "revoked" }),
    );
    await publishProjectSkill({
      actorUserId: "kai",
      args: { ...draft, skillId: "deploy" },
    });
    expect(inserted()).toMatchObject({ draftOnly: true });
    expect(inserted()?.transition.state).toBe("revoked");
  });
});
