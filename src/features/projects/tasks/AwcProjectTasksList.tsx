"use client";

import AwcProjectTaskGitTags from "@/features/projects/tasks/AwcProjectTaskGitTags";
import AwcProjectTaskStatusChip from "@/features/projects/tasks/AwcProjectTaskStatusChip";
import {
  AWC_TASKS_LIST_CLASS,
  AWC_TASKS_PRIMARY_BUTTON_CLASS,
  AWC_TASKS_ROW_CLASS,
  AWC_TASKS_ROW_META_CLASS,
  AWC_TASKS_ROW_TIME_CLASS,
  AWC_TASKS_ROW_TITLE_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";

const formatWhen = (iso: string): string => {
  const relative = formatRelativeTimeAgo(iso);
  if (relative !== null) return relative;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
};

/** Simple cat mark for empty state (design HTML). */
const EmptyCat = () => (
  <svg
    className="mx-auto mb-2.5 h-11 w-11 opacity-70"
    viewBox="0 0 44 44"
    fill="none"
    aria-hidden="true"
  >
    <ellipse
      cx="22"
      cy="26"
      rx="14"
      ry="12"
      className="fill-awc-fill stroke-awc-border-strong"
      strokeWidth="1.5"
    />
    <path
      d="M10 18l4-10 6 8M34 18l-4-10-6 8"
      className="stroke-awc-border-strong"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="17" cy="25" r="1.5" className="fill-awc-fg-muted" />
    <circle cx="27" cy="25" r="1.5" className="fill-awc-fg-muted" />
    <path
      d="M20 29c1 .8 3 .8 4 0"
      className="stroke-awc-fg-muted"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

export default function AwcProjectTasksList({
  tasks,
  hasGit,
  hasActiveFilters,
  onOpen,
  onAssign,
  onClearFilters,
}: {
  readonly tasks: readonly ProjectTaskMeta[];
  readonly hasGit: boolean;
  readonly hasActiveFilters: boolean;
  readonly onOpen: (id: string) => void;
  readonly onAssign: () => void;
  readonly onClearFilters: () => void;
}) {
  if (tasks.length === 0) {
    const filtered = hasActiveFilters;
    return (
      <div className="px-4 py-12 text-center text-awc-fg-muted">
        <EmptyCat />
        <h3 className="mb-3 text-[15px] font-semibold text-awc-fg">
          {filtered ? C.emptyFiltered : C.empty}
        </h3>
        {filtered ? (
          <button
            type="button"
            className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
            onClick={onClearFilters}
          >
            {C.clearFilters}
          </button>
        ) : (
          <button
            type="button"
            className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
            onClick={onAssign}
          >
            {C.emptyAssign}
          </button>
        )}
      </div>
    );
  }
  return (
    <ul className={`${AWC_TASKS_LIST_CLASS} [&>li:last-child>button]:border-b-0`}>
      {tasks.map((task) => (
        <li key={task.id}>
          <button
            type="button"
            className={AWC_TASKS_ROW_CLASS}
            onClick={() => {
              onOpen(task.id);
            }}
          >
            <span className="min-w-0">
              <span className={AWC_TASKS_ROW_TITLE_CLASS}>{task.title}</span>
              <span className={AWC_TASKS_ROW_META_CLASS}>
                <span>{task.assistantName?.trim() || "Assistant"}</span>
                <AwcProjectTaskGitTags
                  show={hasGit}
                  branch={task.branch}
                  worktree={task.worktree}
                />
              </span>
            </span>
            <AwcProjectTaskStatusChip status={task.status} />
            <span className={AWC_TASKS_ROW_TIME_CLASS}>
              {formatWhen(task.updatedAt)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
