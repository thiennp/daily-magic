"use client";

import AwcProjectTasksEmptyCat from "@/features/projects/tasks/AwcProjectTasksEmptyCat";
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
        <AwcProjectTasksEmptyCat />
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
    <ul
      className={`${AWC_TASKS_LIST_CLASS} [&>li:last-child>button]:border-b-0`}
    >
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
              {task.statusReason ? (
                <span className="mb-1 block truncate text-[13px] text-awc-fg-muted">
                  {task.statusReason}
                </span>
              ) : null}
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
