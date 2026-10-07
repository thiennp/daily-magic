"use client";

import {
  AWC_TASKS_CARD_CLASS,
  AWC_TASKS_LIST_CLASS,
  AWC_TASKS_PANEL_HEADING_CLASS,
  AWC_TASKS_ROW_META_CLASS,
  AWC_TASKS_ROW_TIME_CLASS,
  AWC_TASKS_ROW_TITLE_CLASS,
  AWC_TASKS_STATUS_CLASS,
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

const ROW_CLASS =
  "grid w-full grid-cols-[minmax(0,1fr)_auto_5.75rem] items-center gap-3 border-b border-awc-border px-3.5 py-2.5 last:border-b-0";

/** DF-024: compact task-record rows (status chip, owner, priority, stage, tip). */
export default function AwcProjectTaskRecordsList({
  records,
  loadFailed,
}: {
  readonly records: readonly ProjectTaskRecord[];
  readonly loadFailed: boolean;
}) {
  if (!loadFailed && records.length === 0) return null;
  return (
    <section aria-label={C.aria} className={AWC_TASKS_CARD_CLASS}>
      <h3 className={`px-3.5 pt-3 pb-1 ${AWC_TASKS_PANEL_HEADING_CLASS}`}>
        {C.heading}
      </h3>
      {loadFailed ? (
        <p className={`px-3.5 ${AWC_TASKS_STATUS_CLASS}`}>{C.loadError}</p>
      ) : (
        <ul className={AWC_TASKS_LIST_CLASS}>
          {records.map((task) => (
            <li
              key={task.id}
              className={ROW_CLASS}
              data-task-record-id={task.id}
            >
              <span className="min-w-0">
                <span className={AWC_TASKS_ROW_TITLE_CLASS}>{task.title}</span>
                <span className={AWC_TASKS_ROW_META_CLASS}>
                  <span>{task.ownerDisplayName ?? C.ownerFallback}</span>
                  {task.priority !== null ? (
                    <span>{PRIORITY[task.priority]}</span>
                  ) : null}
                  {task.stage !== null ? (
                    <span>{STAGE[task.stage]}</span>
                  ) : null}
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
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
