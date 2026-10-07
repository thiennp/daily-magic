import { describe, expect, it } from "vitest";

import {
  buildProjectTaskBranchOptions,
  buildProjectTaskWorktreeOptions,
  sanitizeProjectTaskGitRefName,
} from "@/features/projects/tasks/projectTaskGitRefs";

describe("projectTaskGitRefs — meta names only", () => {
  it("accepts branch-like names", () => {
    expect(sanitizeProjectTaskGitRefName("main")).toBe("main");
    expect(sanitizeProjectTaskGitRefName("feat/csv-export")).toBe(
      "feat/csv-export",
    );
    expect(sanitizeProjectTaskGitRefName("wt-login")).toBe("wt-login");
  });

  it("rejects absolute/relative paths and local path smuggling", () => {
    expect(sanitizeProjectTaskGitRefName("/Users/x/proj")).toBeNull();
    expect(sanitizeProjectTaskGitRefName("~/worktrees/x")).toBeNull();
    expect(sanitizeProjectTaskGitRefName("C:\\repo")).toBeNull();
    expect(sanitizeProjectTaskGitRefName("../escape")).toBeNull();
    expect(sanitizeProjectTaskGitRefName("has space")).toBeNull();
    expect(sanitizeProjectTaskGitRefName("")).toBeNull();
  });

  it("buildBranchOptions prefers defaultBranch and falls back to main", () => {
    expect(
      buildProjectTaskBranchOptions({
        defaultBranch: "develop",
        branches: ["/abs/path", "feat/a", "develop"],
      }).map((o) => o.id),
    ).toEqual(["develop", "feat/a"]);
    expect(
      buildProjectTaskBranchOptions({ defaultBranch: null, branches: [] }).map(
        (o) => o.id,
      ),
    ).toEqual(["main"]);
  });

  it("buildWorktreeOptions drops path-like entries", () => {
    expect(
      buildProjectTaskWorktreeOptions({
        worktrees: ["wt-csv", "/tmp/wt-secret", "wt-login"],
      }).map((o) => o.id),
    ).toEqual(["wt-csv", "wt-login"]);
  });
});
