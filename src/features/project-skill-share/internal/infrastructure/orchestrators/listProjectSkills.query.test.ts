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

const list = (args: Record<string, unknown>) =>
  listProjectSkills({
    actorUserId: "o",
    args: { projectId: "proj-1", ...args },
  });

describe("listProjectSkills query and limit", () => {
  beforeEach(() => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("owner");
    vi.mocked(selectProjectSkillRows).mockResolvedValue([
      projectSkillRecordFixture({
        skillId: "react-component",
        name: "Scaffold React component",
        description: "Typed props",
      }),
      projectSkillRecordFixture({
        skillId: "deploy",
        name: "Deploy to Vercel",
        description: null,
      }),
      projectSkillRecordFixture({
        skillId: "react-hook",
        name: "React hook pattern",
        description: "State hooks",
        updatedAt: "2026-10-08T00:00:00Z",
      }),
    ]);
  });

  it("returns only matches, best first, with total", async () => {
    const result = await list({ query: "create a react component" });
    expect(result).toMatchObject({ ok: true, total: 2 });
    expect(result.ok && result.skills.map((s) => s.skillId)).toEqual([
      "react-component",
      "react-hook",
    ]);
  });

  it("caps rows at limit and keeps the full total", async () => {
    const result = await list({ query: "react", limit: 1 });
    expect(result.ok && result.skills).toHaveLength(1);
    expect(result).toMatchObject({ ok: true, total: 2 });
  });

  it("limit alone returns the newest rows", async () => {
    const result = await list({ limit: 1 });
    expect(result.ok && result.skills.map((s) => s.skillId)).toEqual([
      "react-hook",
    ]);
    expect(result).toMatchObject({ ok: true, total: 3 });
  });

  it("without query or limit the whole library comes back with no total", async () => {
    const result = await list({});
    expect(result.ok && result.skills).toHaveLength(3);
    expect(result.ok && "total" in result).toBe(false);
  });
});
