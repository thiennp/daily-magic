"use client";

import { useMemo } from "react";

import {
  buildProjectTaskBranchOptions,
  buildProjectTaskWorktreeOptions,
} from "@/features/projects/tasks/projectTaskGitRefs";

/** Branch / worktree select options for the Assign dialog. */
export const useAwcProjectTasksRefOptions = (input: {
  readonly defaultBranch: string | null;
  readonly branches?: readonly string[];
  readonly worktrees?: readonly string[];
}) => {
  const { defaultBranch, branches, worktrees } = input;
  const branchOptions = useMemo(
    () => buildProjectTaskBranchOptions({ defaultBranch, branches }),
    [defaultBranch, branches],
  );
  const worktreeOptions = useMemo(
    () => buildProjectTaskWorktreeOptions({ worktrees }),
    [worktrees],
  );
  return { branchOptions, worktreeOptions };
};
