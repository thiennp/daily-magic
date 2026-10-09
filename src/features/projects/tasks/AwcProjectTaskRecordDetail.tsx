"use client";

import AwcProjectTaskRecordControls from "@/features/projects/tasks/AwcProjectTaskRecordControls";
import {
  AWC_TASKS_CARD_CLASS,
  AWC_TASKS_GHOST_BUTTON_CLASS,
  AWC_TASKS_PANEL_HEADING_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import {
  PROJECT_TASK_RECORD_PRIORITY_LABEL as PRIORITY,
  PROJECT_TASK_RECORD_STAGE_LABEL as STAGE,
  PROJECT_TASK_RECORD_STATUS_LABEL as STATUS,
  PROJECT_TASK_RECORDS_COPY as C,
} from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import { buildProjectTaskRecordTimeline } from "@/features/projects/tasks/utils/buildProjectTaskRecordTimeline";
import { formatProjectTaskMetaTime } from "@/features/projects/tasks/utils/projectTaskTimeline";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/** DF-024: one task record — facts, timeline, and edit controls. */
export default function AwcProjectTaskRecordDetail({
  projectId,
  task,
  records,
  reload,
  onBack,
}: {
  readonly projectId: string;
  readonly task: ProjectTaskRecord;
  readonly records: readonly ProjectTaskRecord[];
  readonly reload: () => void;
  readonly onBack: () => void;
}) {
  const titleOf = (id: string): string =>
    records.find((r) => r.id === id)?.title ?? C.unknownTask;
  const rows: readonly (readonly [string, string])[] = [
    [C.kvOwner, task.ownerDisplayName ?? C.ownerFallback],
    [C.controlStatus, STATUS[task.status]],
    [
      C.kvPriority,
      task.priority === null ? C.noneLabel : PRIORITY[task.priority],
    ],
    [C.kvStage, task.stage === null ? C.noneLabel : STAGE[task.stage]],
    [C.kvTip, task.tipSha?.slice(0, 8) ?? C.noneLabel],
    [C.kvDepends, task.dependsOn.map(titleOf).join(", ") || C.noneLabel],
  ];
  return (
    <section
      className="flex min-w-0 flex-col gap-3 p-3.5"
      aria-label={task.title}
    >
      <button
        type="button"
        className={`${AWC_TASKS_GHOST_BUTTON_CLASS} self-start`}
        onClick={onBack}
      >
        {C.back}
      </button>
      <h2 className="m-0 text-[20px] font-semibold tracking-tight text-awc-fg">
        {task.title}
      </h2>
      <p className="m-0 text-[13.5px] text-awc-fg-muted">
        {task.description ?? C.noDescription}
      </p>
      {task.resultSummary !== null ? (
        <div className={`${AWC_TASKS_CARD_CLASS} p-4`}>
          <h3 className={`${AWC_TASKS_PANEL_HEADING_CLASS} mb-1.5`}>
            {C.outcomeHeading}
          </h3>
          <p className="m-0 whitespace-pre-wrap break-words text-[13.5px] text-awc-fg">
            {task.resultSummary}
          </p>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex min-w-0 flex-col gap-4">
          <dl className="m-0 grid grid-cols-[7rem_minmax(0,1fr)] gap-x-3 gap-y-2 text-[13.5px]">
            {rows.map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-awc-fg-muted">{label}</dt>
                <dd className="m-0 min-w-0 break-words text-awc-fg">{value}</dd>
              </div>
            ))}
          </dl>
          <div className={`${AWC_TASKS_CARD_CLASS} p-4`}>
            <h3 className={`${AWC_TASKS_PANEL_HEADING_CLASS} mb-2`}>
              {C.timelineHeading}
            </h3>
            <ol className="m-0 flex list-none flex-col gap-1.5 p-0 text-[13px]">
              {buildProjectTaskRecordTimeline(task).map((e) => (
                <li
                  key={`${e.label}-${e.at}`}
                  className="flex justify-between gap-3"
                >
                  <span className="text-awc-fg">{e.label}</span>
                  <span className="text-awc-fg-muted">
                    {formatProjectTaskMetaTime(e.at)}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <AwcProjectTaskRecordControls
          projectId={projectId}
          task={task}
          reload={reload}
        />
      </div>
    </section>
  );
}
