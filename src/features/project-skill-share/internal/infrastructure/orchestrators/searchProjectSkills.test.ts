import { beforeEach, describe, expect, it, vi } from "vitest";

import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";
import { listProjectSkillsTool } from "@/features/project-skill-share/internal/infrastructure/orchestrators/listProjectSkillsTool";
import { projectSkillRecordFixture } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareOrchestrators.fixtures";
import { searchProjectSkills } from "@/features/project-skill-share/internal/infrastructure/orchestrators/searchProjectSkills";

vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole",
  () => ({ resolveProjectSkillActorRole: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows",
  () => ({ selectProjectSkillRows: vi.fn() }),
);

const call = (args: Record<string, unknown>) =>
  listProjectSkillsTool({
    actorUserId: "o",
    args: { projectId: "proj-1", ...args },
  });
const ids = (result: Awaited<ReturnType<typeof call>>): readonly string[] =>
  "matches" in result ? result.matches.map((m) => m.skillId) : [];

describe("searchProjectSkills / list_project_skills tool", () => {
  beforeEach(() => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("owner");
    vi.mocked(selectProjectSkillRows).mockResolvedValue([
      projectSkillRecordFixture({
        skillId: "react-component",
        name: "Scaffold React component",
        description: "Typed props",
        tags: ["tsx", "scaffold"],
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

  it("returns compact matches, best first, with total", async () => {
    const result = await call({ query: "create a react component" });
    expect(ids(result)).toEqual(["react-component"]);
    expect(result).toMatchObject({ ok: true, total: 1 });
    expect(JSON.stringify(result)).not.toContain("contentHash");
  });

  it("finds a skill by tag", async () => {
    expect(ids(await call({ query: "scaffold" }))).toEqual(["react-component"]);
  });

  it("returns nothing for a vague multi-word task", async () => {
    const result = await call({ query: "fix the bug" });
    expect(result).toMatchObject({ ok: true, matches: [], total: 0 });
  });

  it("caps rows at limit and keeps the full total", async () => {
    const result = await call({ query: "react typed state", limit: 1 });
    expect(ids(result)).toHaveLength(1);
    expect(result).toMatchObject({ total: 2 });
  });

  it("limit alone returns the newest rows", async () => {
    const result = await call({ limit: 1 });
    expect(ids(result)).toEqual(["react-hook"]);
    expect(result).toMatchObject({ total: 3 });
  });

  it("without query or limit the tool returns the whole library as before", async () => {
    const result = await call({});
    expect("skills" in result && result.skills).toHaveLength(3);
    expect("matches" in result).toBe(false);
  });

  it("rejects bad args and non-members", async () => {
    expect(await searchProjectSkills({ actorUserId: "o", args: {} })).toEqual({
      ok: false,
      code: "invalid_arguments",
    });
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("none");
    expect(await call({ query: "react" })).toEqual({
      ok: false,
      code: "forbidden",
    });
  });
});
