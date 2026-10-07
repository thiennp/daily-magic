"use client";

import AwcProjectTaskGitTags from "@/features/projects/tasks/AwcProjectTaskGitTags";
import AwcProjectTaskStatusChip from "@/features/projects/tasks/AwcProjectTaskStatusChip";
import AwcProjectTasksOfflineBanner from "@/features/projects/tasks/AwcProjectTasksOfflineBanner";
import {
  AWC_TASKS_CARD_CLASS,
  AWC_TASKS_GHOST_BUTTON_CLASS,
  AWC_TASKS_LINK_CLASS,
  AWC_TASKS_PANEL_HEADING_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import {
  PROJECT_PAGE_TASKS_COPY as C,
  PROJECT_TASK_STATUS_LABEL,
} from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";
import { buildProjectTabHash } from "@/lib/shell/buildNavConsolidationRedirect";

const formatMetaTime = (iso: string | null): string => {
  if (iso === null || iso.trim().length === 0) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/** Design timeline: queued → running → terminal (done|failed|cancelled). */
const buildTimelineSteps = (
  status: ProjectTaskUiStatus,
): readonly ProjectTaskUiStatus[] => {
  const end: ProjectTaskUiStatus =
    status === "done" || status === "failed" || status === "cancelled"
      ? status
      : "done";
  return ["queued", "running", end];
};

const stepClass = (
  step: ProjectTaskUiStatus,
  current: ProjectTaskUiStatus,
): "ok" | "cur" | "pend" | "end-failed" | "end-cancelled" => {
  if (step === current && (step === "queued" || step === "running")) return "cur";
  if (step === current && step === "failed") return "end-failed";
  if (step === current && step === "cancelled") return "end-cancelled";
  if (current === "done" || current === "failed" || current === "cancelled") {
    if (step === "queued" || step === "running") return "ok";
    if (step === current && step === "done") return "ok";
  }
  if (current === "running" && step === "queued") return "ok";
  return "pend";
};

export default function AwcProjectTaskDetail({
  task,
  hasGit,
  showOffline,
  onBack,
  onRetry,
}: {
  readonly task: ProjectTaskMeta;
  readonly hasGit: boolean;
  readonly showOffline: boolean;
  readonly onBack: () => void;
  readonly onRetry?: () => void;
}) {
  const reportHref =
    task.agentRunId !== null
      ? buildProjectTabHash("reports", { report: task.agentRunId })
      : null;
  const steps = buildTimelineSteps(task.status);

  return (
    <section className="flex min-w-0 flex-col gap-4" aria-label={task.title}>
      <button type="button" className={`${AWC_TASKS_GHOST_BUTTON_CLASS} self-start`} onClick={onBack}>
        {C.backToList}
      </button>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="basis-full text-[20px] font-semibold tracking-tight text-awc-fg">
          {task.title}
        </h2>
        <AwcProjectTaskStatusChip status={task.status} />
        <span className="text-[13px] text-awc-fg-muted">
          {task.assistantName?.trim() || "Assistant"}
        </span>
        <AwcProjectTaskGitTags show={hasGit} branch={task.branch} worktree={task.worktree} />
      </div>
      {showOffline ? <AwcProjectTasksOfflineBanner onRetry={onRetry} /> : null}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className={`${AWC_TASKS_CARD_CLASS} p-4`}>
          <h3 className={`${AWC_TASKS_PANEL_HEADING_CLASS} mb-3 flex items-center gap-2`}>
            {C.taskInfo}
            <span className="flex-1" />
            <span
              className="inline-grid h-[18px] w-[18px] place-items-center rounded-full border border-awc-border-strong bg-awc-surface text-[11px] font-bold text-awc-fg-muted"
              title={C.taskInfoTip}
              aria-label={C.taskInfoTip}
            >
              i
            </span>
          </h3>
          <dl className="m-0 grid grid-cols-[7rem_minmax(0,1fr)] gap-x-3 gap-y-2 text-[13.5px]">
            <dt className="text-awc-fg-muted">{C.kvTask}</dt>
            <dd className="m-0 min-w-0 break-all text-awc-fg">{task.id}</dd>
            <dt className="text-awc-fg-muted">{C.kvAssistant}</dt>
            <dd className="m-0 text-awc-fg">{task.assistantName?.trim() || "Assistant"}</dd>
            <dt className="text-awc-fg-muted">{C.kvStatus}</dt>
            <dd className="m-0 text-awc-fg">{PROJECT_TASK_STATUS_LABEL[task.status]}</dd>
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
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[12px] text-awc-fg-muted">{C.fromComputer}</span>
            <button type="button" className={AWC_TASKS_SECONDARY_BUTTON_CLASS}>
              {C.openHistory}
            </button>
            {reportHref !== null && task.status === "done" ? (
              <a href={reportHref} className={AWC_TASKS_LINK_CLASS}>
                {C.openReport}
              </a>
            ) : null}
          </div>
        </div>
        <div className={`${AWC_TASKS_CARD_CLASS} p-4`}>
          <h3 className={`${AWC_TASKS_PANEL_HEADING_CLASS} mb-3`}>{C.statusTimeline}</h3>
          <ol className="m-0 flex list-none flex-col p-0">
            {steps.map((s, idx) => {
              const cls = stepClass(s, task.status);
              const node =
                cls === "ok"
                  ? "✓"
                  : cls === "end-failed"
                    ? "!"
                    : cls === "end-cancelled"
                      ? "–"
                      : "";
              const nodeTone =
                cls === "ok"
                  ? "border-awc-fg bg-awc-fg text-awc-surface"
                  : cls === "cur"
                    ? "border-awc-fg bg-awc-info-soft"
                    : cls === "end-failed"
                      ? "border-awc-fg bg-awc-surface text-awc-fg"
                      : cls === "end-cancelled"
                        ? "border-awc-control-border bg-awc-fill text-awc-fg-subtle"
                        : "border-awc-border-strong bg-awc-surface text-awc-fg-subtle";
              const labelTone =
                cls === "pend" ? "font-medium text-awc-fg-subtle" : "font-semibold text-awc-fg";
              const isLast = idx === steps.length - 1;
              return (
                <li
                  key={`${s}-${idx}`}
                  className={`relative grid grid-cols-[22px_1fr] items-center gap-2.5 ${isLast ? "" : "pb-4"}`}
                >
                  {!isLast ? (
                    <span
                      className={`absolute bottom-0.5 left-[10px] top-[22px] w-0.5 ${
                        cls === "ok" ? "bg-awc-fg" : "bg-awc-border-strong"
                      }`}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span
                    className={`relative z-[1] inline-grid h-[22px] w-[22px] place-items-center rounded-full border-2 text-[11px] font-extrabold ${nodeTone}`}
                    aria-hidden="true"
                  >
                    {node}
                  </span>
                  <span className={`text-[13px] ${labelTone}`}>
                    {PROJECT_TASK_STATUS_LABEL[s]}
                    {cls === "cur" ? <span className="sr-only"> (now)</span> : null}
                    {cls === "pend" ? <span className="sr-only"> (not yet)</span> : null}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
