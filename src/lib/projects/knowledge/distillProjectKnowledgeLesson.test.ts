import { describe, expect, it } from "vitest";

import distillProjectKnowledgeLesson from "@/lib/projects/knowledge/distillProjectKnowledgeLesson";

describe("distillProjectKnowledgeLesson", () => {
  it("prefers first output line", () => {
    expect(
      distillProjectKnowledgeLesson({
        prompt: "ignored",
        output: "Ship the ledger first.\nMore detail",
      }),
    ).toBe("Ship the ledger first.");
  });

  it("truncates long lessons", () => {
    const long = "x".repeat(300);
    expect(
      distillProjectKnowledgeLesson({ prompt: "", output: long }).length,
    ).toBe(278);
  });
});
