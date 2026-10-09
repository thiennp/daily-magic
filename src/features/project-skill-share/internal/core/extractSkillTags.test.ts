import { describe, expect, it } from "vitest";

import { extractSkillTags } from "@/features/project-skill-share/internal/core/extractSkillTags";

const skill = (frontMatter: string): string =>
  `---\nname: X\n${frontMatter}\n---\n# Steps\n1. Go\n`;

describe("extractSkillTags", () => {
  it("reads keywords in list, comma and space form", () => {
    expect(extractSkillTags(skill("keywords: [React, tsx, scaffold]"))).toEqual(
      ["react", "tsx", "scaffold"],
    );
    expect(extractSkillTags(skill("keywords: ci, pre-push, red"))).toEqual([
      "ci",
      "pre-push",
      "red",
    ]);
    expect(extractSkillTags(skill('tags: "deploy" vercel'))).toEqual([
      "deploy",
      "vercel",
    ]);
  });

  it("dedupes and caps", () => {
    expect(extractSkillTags(skill("keywords: a, A, b, a"))).toEqual(["a", "b"]);
    const many = Array.from({ length: 30 }, (_, i) => `t${i}`).join(",");
    expect(extractSkillTags(skill(`keywords: ${many}`))).toHaveLength(12);
  });

  it("returns none without front matter or key", () => {
    expect(extractSkillTags("# Just a body\nkeywords: ignored")).toEqual([]);
    expect(extractSkillTags(skill("description: no tags here"))).toEqual([]);
    expect(extractSkillTags("")).toEqual([]);
  });
});
