import { beforeEach, describe, expect, it, vi } from "vitest";

import { insertProjectSkillVersionWithSkill } from "@/features/project-skill-share/internal/infrastructure/db/insertProjectSkillVersionWithSkill";
import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";
import { selectProjectSkillVersionNumbers } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionNumbers";
import { listProjectSkills } from "@/features/project-skill-share/internal/infrastructure/orchestrators/listProjectSkills";
import { projectSkillRecordFixture as rec } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareOrchestrators.fixtures";
import { publishProjectSkill } from "@/features/project-skill-share/internal/infrastructure/orchestrators/publishProjectSkill";

vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole",
  () => ({
    resolveProjectSkillActorRole: vi.fn(),
  }),
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
  "@/features/project-skill-share/internal/infrastructure/db/insertProjectSkillVersionWithSkill",
  () => ({
    insertProjectSkillVersionWithSkill: vi.fn(),
  }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionNumbers",
  () => ({
    selectProjectSkillVersionNumbers: vi.fn(),
  }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/deleteProjectSkillVersionRows",
  () => ({
    deleteProjectSkillVersionRows: vi.fn(),
  }),
);

const insertedKind = (): unknown =>
  vi.mocked(insertProjectSkillVersionWithSkill).mock.calls[0]?.[0].kind;

describe("project skill kind (playbooks)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("owner");
    vi.mocked(selectProjectSkillRow).mockResolvedValue(null);
    vi.mocked(selectProjectSkillVersionNumbers).mockResolvedValue([1]);
    vi.mocked(insertProjectSkillVersionWithSkill).mockResolvedValue(
      rec({ kind: "playbook" }),
    );
  });

  it("publishes a playbook with kind and returns it on the view", async () => {
    const result = await publishProjectSkill({
      actorUserId: "pub",
      args: {
        projectId: "proj-1",
        name: "Ship",
        body: "# x",
        kind: "playbook",
      },
    });
    expect(insertedKind()).toBe("playbook");
    expect(result.ok && result.skill.kind).toBe("playbook");
  });

  it("new rows default to skill; omitted kind keeps an existing playbook", async () => {
    await publishProjectSkill({
      actorUserId: "pub",
      args: { projectId: "proj-1", name: "Deploy", body: "# x" },
    });
    expect(insertedKind()).toBe("skill");
    vi.clearAllMocks();
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("owner");
    vi.mocked(selectProjectSkillRow).mockResolvedValue(
      rec({ kind: "playbook" }),
    );
    await publishProjectSkill({
      actorUserId: "pub",
      args: { projectId: "proj-1", skillId: "deploy", body: "# y" },
    });
    expect(insertedKind()).toBe("playbook");
  });

  it("rejects an unknown kind", async () => {
    const result = await publishProjectSkill({
      actorUserId: "pub",
      args: { projectId: "proj-1", name: "X", body: "# x", kind: "recipe" },
    });
    expect(result).toEqual({ ok: false, code: "invalid_arguments" });
  });

  it("list filters by kind; omitted kind lists every kind", async () => {
    vi.mocked(selectProjectSkillRows).mockResolvedValue([
      rec({ skillId: "a" }),
      rec({ skillId: "b", kind: "playbook" }),
    ]);
    const only = await listProjectSkills({
      actorUserId: "o",
      args: { projectId: "proj-1", kind: "playbook" },
    });
    expect(only.ok && only.skills.map((s) => [s.skillId, s.kind])).toEqual([
      ["b", "playbook"],
    ]);
    const all = await listProjectSkills({
      actorUserId: "o",
      args: { projectId: "proj-1" },
    });
    expect(all.ok && all.skills.map((s) => s.skillId)).toEqual(["a", "b"]);
  });
});
