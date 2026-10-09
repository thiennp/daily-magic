import { projectTaskRecordTone } from "@/features/projects/tasks/projectTaskRecordTone";
import {
  PROJECT_TASK_RECORD_PRIORITY_LABEL as PRIORITY,
  PROJECT_TASK_RECORDS_COPY as C,
} from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import { PROJECT_TASK_TONE_CLASS } from "@/features/projects/tasks/projectTaskStatusTone";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/** One draggable card; click opens the task, drag moves it to another column. */
export default function AwcProjectTaskBoardCard({
  task,
  onOpen,
  onDragStart,
  onDragEnd,
}: {
  readonly task: ProjectTaskRecord;
  readonly onOpen: (id: string) => void;
  readonly onDragStart: (task: ProjectTaskRecord) => void;
  readonly onDragEnd: () => void;
}) {
  return (
    <li
      draggable
      data-task-record-id={task.id}
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", task.id);
        event.dataTransfer.effectAllowed = "move";
        onDragStart(task);
      }}
      onDragEnd={onDragEnd}
      className="cursor-grab list-none rounded-lg border border-awc-border bg-awc-surface p-2.5 shadow-sm active:cursor-grabbing"
    >
      <button
        type="button"
        className="block w-full min-w-0 text-left"
        onClick={() => onOpen(task.id)}
      >
        <span className="block break-words text-[13.5px] font-medium text-awc-fg">
          {task.title}
        </span>
        <span className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[12px] text-awc-fg-muted">
          <span>{task.ownerDisplayName ?? C.ownerFallback}</span>
          {task.priority !== null ? (
            <span
              className={`rounded-full border px-1.5 py-px ${PROJECT_TASK_TONE_CLASS[projectTaskRecordTone(task.status)]}`}
            >
              {PRIORITY[task.priority]}
            </span>
          ) : null}
        </span>
        {task.resultSummary !== null ? (
          <span className="mt-1 line-clamp-2 block text-[12px] text-awc-fg-subtle">
            {task.resultSummary}
          </span>
        ) : null}
      </button>
    </li>
  );
}
