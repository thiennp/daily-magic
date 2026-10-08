import {
  AWC_TASKS_ROW_CLASS,
  AWC_TASKS_ROW_META_CLASS,
  AWC_TASKS_ROW_TIME_CLASS,
  AWC_TASKS_ROW_TITLE_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import {
  PROJECT_TASK_RECORD_PRIORITY_LABEL as PRIORITY,
  PROJECT_TASK_RECORD_STAGE_LABEL as STAGE,
  PROJECT_TASK_RECORD_STATUS_LABEL as STATUS,
  PROJECT_TASK_RECORDS_COPY as C,
} from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import { projectTaskRecordTone } from "@/features/projects/tasks/projectTaskRecordTone";
import { PROJECT_TASK_TONE_CLASS } from "@/features/projects/tasks/projectTaskStatusTone";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";

/** DF-024: compact task-record row (status chip, owner, priority, stage, tip). */
export default function AwcProjectTaskRecordRow({
  task,
  onOpen,
}: {
  readonly task: ProjectTaskRecord;
  readonly onOpen: (id: string) => void;
}) {
  return (
    <li data-task-record-id={task.id}>
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
            <span>{task.ownerDisplayName ?? C.ownerFallback}</span>
            {task.priority !== null ? (
              <span>{PRIORITY[task.priority]}</span>
            ) : null}
            {task.stage !== null ? <span>{STAGE[task.stage]}</span> : null}
            {task.tipSha !== null ? (
              <code className="font-mono text-[12px]">
                {task.tipSha.slice(0, 8)}
              </code>
            ) : null}
            {task.dependsOn.length > 0 ? (
              <span>{C.dependsOn(task.dependsOn.length)}</span>
            ) : null}
          </span>
          {task.description !== null ? (
            <span className="mt-0.5 block truncate text-[12.5px] text-awc-fg-subtle">
              {task.description}
            </span>
          ) : null}
        </span>
        <span
          className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${PROJECT_TASK_TONE_CLASS[projectTaskRecordTone(task.status)]}`}
        >
          {STATUS[task.status]}
        </span>
        <span className={AWC_TASKS_ROW_TIME_CLASS}>
          {formatRelativeTimeAgo(task.updatedAt) ?? ""}
        </span>
      </button>
    </li>
  );
}
