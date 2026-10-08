import {
  PROJECT_PAGE_TASKS_COPY as C,
  PROJECT_TASK_STATUS_LABEL,
} from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import { formatProjectTaskMetaTime as formatMetaTime } from "@/features/projects/tasks/utils/projectTaskTimeline";

/** Task detail key/value list (status line carries the failure reason). */
export default function AwcProjectTaskDetailInfoList({
  task,
  hasGit,
}: {
  readonly task: ProjectTaskMeta;
  readonly hasGit: boolean;
}) {
  return (
    <dl className="m-0 grid grid-cols-[7rem_minmax(0,1fr)] gap-x-3 gap-y-2 text-[13.5px]">
      <dt className="text-awc-fg-muted">{C.kvTask}</dt>
      <dd className="m-0 min-w-0 break-all text-awc-fg">{task.id}</dd>
      <dt className="text-awc-fg-muted">{C.kvAssistant}</dt>
      <dd className="m-0 text-awc-fg">
        {task.assistantName?.trim() || "Assistant"}
      </dd>
      <dt className="text-awc-fg-muted">{C.kvStatus}</dt>
      <dd className="m-0 text-awc-fg">
        {PROJECT_TASK_STATUS_LABEL[task.status]}
        {task.statusReason ? (
          <span className="ml-2 text-awc-fg-muted">— {task.statusReason}</span>
        ) : null}
      </dd>
      <dt className="text-awc-fg-muted">{C.kvCreated}</dt>
      <dd className="m-0 text-awc-fg">{formatMetaTime(task.createdAt)}</dd>
      <dt className="text-awc-fg-muted">{C.kvUpdated}</dt>
      <dd className="m-0 text-awc-fg">{formatMetaTime(task.updatedAt)}</dd>
      {hasGit ? (
        <>
          <dt className="text-awc-fg-muted">{C.branch}</dt>
          <dd className="m-0 text-awc-fg">{task.branch?.trim() || "—"}</dd>
          <dt className="text-awc-fg-muted">{C.worktree}</dt>
          <dd className="m-0 text-awc-fg">
            {task.worktree?.trim() || C.worktreeProjectFolder}
          </dd>
        </>
      ) : null}
    </dl>
  );
}
