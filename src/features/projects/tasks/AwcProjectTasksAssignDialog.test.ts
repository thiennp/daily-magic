import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const src = readFileSync(
  path.join(
    process.cwd(),
    "src/features/projects/tasks/AwcProjectTasksAssignDialog.tsx",
  ),
  "utf8",
);

describe("AwcProjectTasksAssignDialog — screen D", () => {
  it("uses select pickers for branch/worktree; hides when !hasGit", () => {
    expect(src).toContain("sanitizeProjectTaskGitRefName");
    expect(src).toContain("buildProjectTaskBranchOptions");
    expect(src).toContain("{hasGit ? (");
    expect(src).toContain('aria-label={C.branch}');
    expect(src).toContain('aria-label={C.worktree}');
    expect(src).toContain("C.createWorktree");
    expect(src).toContain("createWorktree");
    // free-text branch input removed in favor of select
    expect(src).toMatch(/<select[\s\S]*aria-label=\{C\.branch\}/);
  });
});
