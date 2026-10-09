import { describe, expect, it } from "vitest";

import {
  filterProjectSkillsByQuery,
  type SearchableSkill,
} from "@/features/project-skill-share/internal/core/filterProjectSkillsByQuery";

const skill = (
  skillId: string,
  name: string,
  description: string | null,
  tags: readonly string[] = [],
): SearchableSkill => ({
  skillId,
  name,
  description,
  tags,
  updatedAt: "2026-10-05T00:00:00Z",
});

const LIBRARY = [
  skill("deploy", "Deploy to Vercel", "Ship a preview build"),
  skill("react-component", "Scaffold React component", "Typed props, Tailwind"),
  skill("ui-report", "UI report remediation", null),
];

const ids = (query: string, library: readonly SearchableSkill[] = LIBRARY) =>
  filterProjectSkillsByQuery(library, query).map((s) => s.skillId);

describe("filterProjectSkillsByQuery scoring rules", () => {
  it("one rare word in a name or tag is enough, one in a description is not", () => {
    expect(ids("react kubernetes")).toEqual(["react-component"]);
    expect(ids("please somewhere preview")).toEqual([]);
  });

  it("short words match whole words only (aw is not awl)", () => {
    const library = [
      skill("pager", "Chat pager", "local AWL first"),
      skill("ui-report", "UI report", null),
    ];
    expect(ids("add local folder for aw", library)).toEqual([]);
    expect(ids("ui", library)).toEqual(["ui-report"]);
  });

  it("a common word cannot outrank a rare one", () => {
    const library = [
      skill("pager", "Project chat pager", "project chat history"),
      skill("bots", "Bot rules", "how bots talk in the project chat"),
      skill("a", "Project plan", "project steps"),
      skill("b", "Project goals", "project goals"),
      skill("c", "Chat tips", "chat etiquette"),
    ];
    expect(ids("bot dispatch in project chat", library)[0]).toBe("bots");
  });

  it("cuts weak results below 40% of the best", () => {
    const library = [
      skill("strong", "Deploy preview build", "deploy preview"),
      skill("weak", "Other", "a preview"),
      ...Array.from({ length: 8 }, (_, i) =>
        skill(`f${i}`, `Filler ${i}`, null),
      ),
    ];
    expect(ids("deploy preview build", library)).toEqual(["strong"]);
  });
});
