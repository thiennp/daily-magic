/** Branch · worktree tag — only when project has git and values exist (design .git). */
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
  const label =
    branch !== null && worktree !== null
      ? `${branch} · ${worktree}`
      : (branch ?? worktree ?? "");
  return (
    <span
      className="inline-flex max-w-full items-center gap-1 truncate rounded-[5px] border border-awc-border bg-awc-tile px-1.5 font-mono text-[12px] leading-[1.4] text-awc-fg-muted"
      title={label}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
        <path
          d="M8 1.5a1.5 1.5 0 0 1 1.5 1.5v1.1a4 4 0 0 1 2.9 2.9H13.5a1.5 1.5 0 1 1 0 3h-1.1a4 4 0 0 1-2.9 2.9V14.5a1.5 1.5 0 1 1-3 0v-1.1a4 4 0 0 1-2.9-2.9H2.5a1.5 1.5 0 1 1 0-3h1.1A4 4 0 0 1 6.5 4.1V3A1.5 1.5 0 0 1 8 1.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      {label}
    </span>
  );
}
