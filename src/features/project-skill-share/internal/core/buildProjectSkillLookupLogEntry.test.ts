import { describe, expect, it } from "vitest";

import { buildProjectSkillLookupLogEntry } from "@/features/project-skill-share/internal/core/buildProjectSkillLookupLogEntry";

describe("buildProjectSkillLookupLogEntry", () => {
  it("logs a query lookup as counts and ids, never the query text", () => {
    const entry = buildProjectSkillLookupLogEntry({
      tool: "list_project_skills",
      args: { projectId: "p1", query: "secret customer name" },
      result: {
        ok: true,
        matches: [{ skillId: "a" }, { skillId: "b" }],
        total: 7,
      },
    });
    expect(entry).toMatchObject({
      projectId: "p1",
      tool: "list",
      hadQuery: true,
      queryChars: 20,
      returned: 2,
      total: 7,
      topIds: ["a", "b"],
    });
    expect(JSON.stringify(entry)).not.toContain("secret");
    expect(entry?.responseTokens).toBeGreaterThan(0);
  });

  it("logs a whole-library list with no query and no total", () => {
    const entry = buildProjectSkillLookupLogEntry({
      tool: "list_project_skills",
      args: { projectId: "p1" },
      result: { ok: true, skills: [{ skillId: "a" }, { skillId: "b" }] },
    });
    expect(entry).toMatchObject({ hadQuery: false, returned: 2, total: null });
  });

  it("logs a get with the skill id", () => {
    expect(
      buildProjectSkillLookupLogEntry({
        tool: "get_project_skill",
        args: { projectId: "p1", skillId: "deploy" },
        result: { ok: true, skill: { body: "x" } },
      }),
    ).toMatchObject({ tool: "get", skillId: "deploy", returned: 1 });
  });

  it("skips failures, other tools and calls without a project", () => {
    const base = { args: { projectId: "p1" } };
    expect(
      buildProjectSkillLookupLogEntry({
        ...base,
        tool: "list_project_skills",
        result: { ok: false, code: "forbidden" },
      }),
    ).toBeNull();
    expect(
      buildProjectSkillLookupLogEntry({
        ...base,
        tool: "publish_project_skill",
        result: { ok: true },
      }),
    ).toBeNull();
    expect(
      buildProjectSkillLookupLogEntry({
        tool: "list_project_skills",
        args: {},
        result: { ok: true, skills: [] },
      }),
    ).toBeNull();
  });
});
