import { describe, expect, it } from "vitest";

import {
  filterProjectSkillsByQuery,
  sortProjectSkillsNewestFirst,
  tokenizeSkillQuery,
  type SearchableSkill,
} from "@/features/project-skill-share/internal/core/filterProjectSkillsByQuery";

const skill = (
  skillId: string,
  name: string,
  description: string | null,
  tags: readonly string[] = [],
  updatedAt = "2026-10-05T00:00:00Z",
): SearchableSkill => ({ skillId, name, description, tags, updatedAt });

const LIBRARY = [
  skill("deploy", "Deploy to Vercel", "Ship a preview build"),
  skill("react-component", "Scaffold React component", "Typed props, Tailwind"),
  skill("ui-report", "UI report remediation", null),
  skill("build-check", "Run focused checks", "Lint and build before push"),
  skill("unblock-push", "Unblock push", "CI is red", ["ci", "husky"]),
];

const ids = (query: string, library = LIBRARY) =>
  filterProjectSkillsByQuery(library, query).map((s) => s.skillId);

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
  it("matches word prefixes of name, description, tags and id", () => {
    expect(ids("create react components")).toEqual(["react-component"]);
    expect(ids("lint")).toEqual(["build-check"]);
    expect(ids("husky")).toEqual(["unblock-push"]);
  });

  it("does not match inside a word (ui is not build)", () => {
    expect(ids("ui")).toEqual(["ui-report"]);
  });

  it("ranks a name hit above a tag above a description hit", () => {
    const library = [
      skill("d", "Other", "release steps"),
      skill("t", "Other two", null, ["release"]),
      skill("n", "Release notes", null),
    ];
    expect(ids("release", library)).toEqual(["n", "t", "d"]);
  });

  it("a multi-word query must match two words, a vague one matches nothing", () => {
    expect(ids("react kubernetes")).toEqual([]);
    expect(ids("fix the bug")).toEqual([]);
    expect(ids("kubernetes")).toEqual([]);
    expect(ids("   ")).toEqual([]);
  });

  it("handles a null description", () => {
    expect(ids("remediation")).toEqual(["ui-report"]);
  });

  it("breaks ties by newest update", () => {
    const rows = [
      skill("a", "Release notes", null, [], "2026-10-01T00:00:00Z"),
      skill("b", "Release checklist", null, [], "2026-10-08T00:00:00Z"),
    ];
    expect(ids("release", rows)).toEqual(["b", "a"]);
  });
});

describe("sortProjectSkillsNewestFirst", () => {
  it("does not mutate its input", () => {
    const rows = [
      skill("old", "Old", null, [], "2026-10-01T00:00:00Z"),
      skill("new", "New", null, [], "2026-10-08T00:00:00Z"),
    ];
    expect(sortProjectSkillsNewestFirst(rows).map((s) => s.skillId)).toEqual([
      "new",
      "old",
    ]);
    expect(rows.map((s) => s.skillId)).toEqual(["old", "new"]);
  });
});
