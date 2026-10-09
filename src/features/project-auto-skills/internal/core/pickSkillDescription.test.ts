import { describe, expect, it } from "vitest";

import { pickSkillDescription } from "./pickSkillDescription";

describe("pickSkillDescription", () => {
  it("uses the front matter description", () => {
    const body = "---\nname: a\ndescription: Migrate one slug.\n---\n# A";
    expect(pickSkillDescription(body, "Save a as a skill?")).toBe(
      "Migrate one slug.",
    );
  });

  it("falls back to the title without front matter or description", () => {
    expect(pickSkillDescription("# A", "Title")).toBe("Title");
    expect(pickSkillDescription("---\nname: a\n---\n", "Title")).toBe("Title");
  });
});
