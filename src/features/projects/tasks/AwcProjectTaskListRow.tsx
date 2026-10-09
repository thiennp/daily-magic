"use client";

import AwcProjectTaskStalledActions from "@/features/projects/tasks/AwcProjectTaskStalledActions";
import AwcProjectTaskGitTags from "@/features/projects/tasks/AwcProjectTaskGitTags";
import AwcProjectTaskStatusChip from "@/features/projects/tasks/AwcProjectTaskStatusChip";
import {
  AWC_TASKS_ROW_CLASS,
  AWC_TASKS_ROW_META_CLASS,
  AWC_TASKS_ROW_TIME_CLASS,
  AWC_TASKS_ROW_TITLE_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";

const formatWhen = (iso: string): string => {
  const relative = formatRelativeTimeAgo(iso);
  if (relative !== null) return relative;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
};

/** One Tasks tab row: title, summary, assistant, git tags, status, time. */
export default function AwcProjectTaskListRow({
  task,
  hasGit,
  onOpen,
}: {
  readonly task: ProjectTaskMeta;
  readonly hasGit: boolean;
  readonly onOpen: (id: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        className={AWC_TASKS_ROW_CLASS}
        onClick={() => {
          onOpen(task.id);
        }}
      >
        <span className="min-w-0">
          <span className={AWC_TASKS_ROW_TITLE_CLASS}>{task.title}</span>
          {task.statusReason || task.summaryLine ? (
            <span className="mb-1 block whitespace-normal break-words text-[13px] text-awc-fg-muted">
              {task.statusReason || task.summaryLine}
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
      {task.status === "stalled" ? (
        <AwcProjectTaskStalledActions task={task} />
      ) : null}
    </li>
  );
}
