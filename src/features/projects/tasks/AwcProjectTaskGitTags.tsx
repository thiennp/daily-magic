import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";

/** Branch/worktree tags — only render when project has git and values exist. */
export default function AwcProjectTaskGitTags({
  branch,
  worktree,
  show,
}: {
  readonly branch: string | null;
  readonly worktree: string | null;
  readonly show: boolean;
}) {
  if (!show) return null;
  if (branch === null && worktree === null) return null;
  return (
    <span className="inline-flex flex-wrap gap-1.5 text-[11px] text-awc-fg-muted dark:text-gray-400">
      {branch !== null ? (
        <span className="rounded-md border border-awc-border bg-awc-tile px-1.5 py-0.5 dark:border-gray-700 dark:bg-white/5">
          {C.branch}: {branch}
        </span>
      ) : null}
      {worktree !== null ? (
        <span className="rounded-md border border-awc-border bg-awc-tile px-1.5 py-0.5 dark:border-gray-700 dark:bg-white/5">
          {C.worktree}: {worktree}
        </span>
      ) : null}
    </span>
  );
}
