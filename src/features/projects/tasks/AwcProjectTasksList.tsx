"use client";

import AwcProjectTaskGitTags from "@/features/projects/tasks/AwcProjectTaskGitTags";
import AwcProjectTaskStatusChip from "@/features/projects/tasks/AwcProjectTaskStatusChip";
import { AWC_TASKS_PRIMARY_BUTTON_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import {
  PANEL_LIST_CLASS,
  PANEL_ROW_CLASS,
  PANEL_ROW_META_CLASS,
  PANEL_ROW_TITLE_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

const formatWhen = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
};

export default function AwcProjectTasksList({
  tasks,
  hasGit,
  onOpen,
  onAssign,
}: {
  readonly tasks: readonly ProjectTaskMeta[];
  readonly hasGit: boolean;
  readonly onOpen: (id: string) => void;
  readonly onAssign: () => void;
}) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-awc-border bg-awc-surface-2 px-4 py-10 text-center dark:border-gray-700 dark:bg-white/[0.03]">
        <h3 className="text-[15px] font-semibold text-awc-fg dark:text-white">
          {C.empty}
        </h3>
        <button type="button" className={AWC_TASKS_PRIMARY_BUTTON_CLASS} onClick={onAssign}>
          {C.emptyAssign}
        </button>
      </div>
    );
  }
  return (
    <ul className={PANEL_LIST_CLASS}>
      {tasks.map((task) => (
        <li key={task.id}>
          <button
            type="button"
            className={PANEL_ROW_CLASS}
            onClick={() => {
              onOpen(task.id);
            }}
          >
            <span className="min-w-0">
              <span className={`block ${PANEL_ROW_TITLE_CLASS}`}>{task.title}</span>
              <span className={`block ${PANEL_ROW_META_CLASS}`}>
                {task.assistantName?.trim() || "Assistant"}
                {" · "}
                {formatWhen(task.updatedAt)}
              </span>
              <span className="mt-1 flex flex-wrap items-center gap-2">
                <AwcProjectTaskStatusChip status={task.status} />
                <AwcProjectTaskGitTags
                  show={hasGit}
                  branch={task.branch}
                  worktree={task.worktree}
                />
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
