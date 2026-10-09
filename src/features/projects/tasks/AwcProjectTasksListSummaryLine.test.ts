import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("AwcProjectTasksList summary line (f4bf6a0c)", () => {
  it("shows the Done summary under the title and wraps it", () => {
    const source = readFileSync(
      "src/features/projects/tasks/AwcProjectTaskListRow.tsx",
      "utf8",
    );
    expect(source).toContain("task.summaryLine");
    expect(source).toMatch(/whitespace-normal break-words/);
  });
});
