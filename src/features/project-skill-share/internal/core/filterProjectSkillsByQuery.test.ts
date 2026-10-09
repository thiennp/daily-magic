import { describe, expect, it } from "vitest";

import {
  filterProjectSkillsByQuery,
  sortProjectSkillsNewestFirst,
  tokenizeSkillQuery,
} from "@/features/project-skill-share/internal/core/filterProjectSkillsByQuery";
import type { ProjectSkillView } from "@/features/project-skill-share/internal/core/projectSkill.type";

const skill = (
  skillId: string,
  name: string,
  description: string | null,
  updatedAt = "2026-10-05T00:00:00Z",
): ProjectSkillView =>
  ({ skillId, name, description, updatedAt }) as unknown as ProjectSkillView;

const LIBRARY = [
  skill("deploy", "Deploy to Vercel", "Ship a preview build"),
  skill("react-component", "Scaffold React component", "Typed props, Tailwind"),
  skill("ui-report", "UI report remediation", null),
  skill("build-check", "Run focused checks", "Lint and build before push"),
];

describe("tokenizeSkillQuery", () => {
  it("lowercases, dedupes and drops stopwords", () => {
    expect(tokenizeSkillQuery("Create a NEW React component, react!")).toEqual([
      "create",
      "react",
      "component",
    ]);
  });
});

describe("filterProjectSkillsByQuery", () => {
  const ids = (query: string) =>
    filterProjectSkillsByQuery(LIBRARY, query).map((s) => s.skillId);

  it("matches on word prefixes of name, description and id", () => {
    expect(ids("create react components")).toEqual(["react-component"]);
    expect(ids("lint")).toEqual(["build-check"]);
  });

  it("does not match inside a word (ui is not build)", () => {
    expect(ids("ui")).toEqual(["ui-report"]);
  });

  it("ranks a name hit above a description hit", () => {
    expect(ids("build")).toEqual(["build-check", "deploy"]);
  });

  it("handles a null description and an unmatched query", () => {
    expect(ids("remediation")).toEqual(["ui-report"]);
    expect(ids("kubernetes")).toEqual([]);
    expect(ids("   ")).toEqual([]);
  });

  it("breaks ties by newest update", () => {
    const rows = [
      skill("a", "Release notes", null, "2026-10-01T00:00:00Z"),
      skill("b", "Release checklist", null, "2026-10-08T00:00:00Z"),
    ];
    expect(
      filterProjectSkillsByQuery(rows, "release").map((s) => s.skillId),
    ).toEqual(["b", "a"]);
  });
});

describe("sortProjectSkillsNewestFirst", () => {
  it("does not mutate its input", () => {
    const rows = [
      skill("old", "Old", null, "2026-10-01T00:00:00Z"),
      skill("new", "New", null, "2026-10-08T00:00:00Z"),
    ];
    expect(sortProjectSkillsNewestFirst(rows).map((s) => s.skillId)).toEqual([
      "new",
      "old",
    ]);
    expect(rows.map((s) => s.skillId)).toEqual(["old", "new"]);
  });
});
