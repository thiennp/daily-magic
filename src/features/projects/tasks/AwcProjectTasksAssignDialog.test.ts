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

const panel = readFileSync(
  path.join(process.cwd(), "src/features/projects/tasks/AwcProjectTasksPanel.tsx"),
  "utf8",
);

describe("AwcProjectTasksAssignDialog — screen D", () => {
  it("uses select pickers for branch/worktree; hides when !hasGit", () => {
    expect(src).toContain("sanitizeProjectTaskGitRefName");
    expect(src).toContain("buildProjectTaskBranchOptions");
    expect(src).toContain("{hasGit ? (");
    expect(src).toContain("aria-label={C.branch}");
    expect(src).toContain("aria-label={C.worktree}");
    expect(src).toContain("C.createWorktree");
    expect(src).toContain("createWorktree");
    expect(src).toMatch(/<select[\s\S]*aria-label=\{C\.branch\}/);
  });

  it("dispatches via sendMessengerTask → inbox/dispatch (not a UI stub)", () => {
    expect(src).toContain("sendMessengerTask");
    expect(src).toContain("fetchProjectAccess");
    expect(src).toContain("inboxDispatchPeerOptions");
    expect(src).toContain("assigneeMembershipId");
    expect(src).toContain("setPending");
    expect(src).toContain('role="alert"');
    expect(src).not.toContain("dialog is UI only");
    expect(panel).toContain("onAssigned");
    expect(panel).toContain("tasks.reload()");
    expect(panel).toContain("projectId={project.id}");
    expect(panel).not.toContain("dialog is UI only");
  });

  it("keeps use client as first line", () => {
    expect(src.startsWith('"use client";')).toBe(true);
    expect(panel.startsWith('"use client";')).toBe(true);
  });
});
