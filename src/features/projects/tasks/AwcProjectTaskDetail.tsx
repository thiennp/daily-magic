"use client";

import AwcProjectTaskGitTags from "@/features/projects/tasks/AwcProjectTaskGitTags";
import AwcProjectTaskStatusChip from "@/features/projects/tasks/AwcProjectTaskStatusChip";
import AwcProjectTasksOfflineBanner from "@/features/projects/tasks/AwcProjectTasksOfflineBanner";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import { PROJECT_TASK_STATUS_LABEL } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";
import {
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_HEADING_CLASS,
  PANEL_LINK_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";
import { buildProjectTabHash } from "@/lib/shell/buildNavConsolidationRedirect";

const TIMELINE: readonly ProjectTaskUiStatus[] = [
  "queued",
  "running",
  "done",
  "failed",
  "cancelled",
];

export default function AwcProjectTaskDetail({
  task,
  hasGit,
  showOffline,
  onBack,
  onRetry,
  onLoadOlder,
}: {
  readonly task: ProjectTaskMeta;
  readonly hasGit: boolean;
  readonly showOffline: boolean;
  readonly onBack: () => void;
  readonly onRetry?: () => void;
  readonly onLoadOlder?: () => void;
}) {
  const reportHref =
    task.agentRunId !== null
      ? buildProjectTabHash("reports", { report: task.agentRunId })
      : null;
  const reached = new Set<ProjectTaskUiStatus>([task.status]);
  if (task.status === "done" || task.status === "failed" || task.status === "cancelled") {
    reached.add("queued");
    reached.add("running");
  } else if (task.status === "running") {
    reached.add("queued");
  }

  return (
    <section className="flex min-w-0 flex-col gap-3" aria-label={task.title}>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={PANEL_LINK_CLASS} onClick={onBack}>
          {C.backToList}
        </button>
        <h3 className={PANEL_HEADING_CLASS}>{task.title}</h3>
        <AwcProjectTaskStatusChip status={task.status} />
        <span className="text-[13px] text-awc-fg-muted dark:text-gray-400">
          {task.assistantName?.trim() || "Assistant"}
        </span>
      </div>
      <AwcProjectTaskGitTags show={hasGit} branch={task.branch} worktree={task.worktree} />
      {showOffline ? <AwcProjectTasksOfflineBanner onRetry={onRetry} /> : null}
      <div className="rounded-xl border border-awc-border bg-awc-surface px-3 py-2.5 dark:border-gray-700 dark:bg-white/[0.03]">
        <h4 className="flex items-center gap-2 text-[13px] font-semibold text-awc-fg dark:text-white">
          {C.taskInfo}
          <span
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-awc-border text-[10px] text-awc-fg-muted"
            title={C.taskInfoTip}
            aria-label={C.taskInfoTip}
          >
            i
          </span>
        </h4>
        <p className="mt-1 text-[12px] text-awc-fg-muted dark:text-gray-400">
          {C.taskInfoTip}
        </p>
      </div>
      <div>
        <h4 className="mb-2 text-[13px] font-semibold text-awc-fg dark:text-white">
          {C.statusTimeline}
        </h4>
        <ol className="flex flex-col gap-1.5">
          {TIMELINE.filter((s) => s === "queued" || s === "running" || reached.has(s)).map(
            (s) => (
              <li
                key={s}
                className={`text-[13px] ${
                  reached.has(s)
                    ? "font-medium text-awc-fg dark:text-white"
                    : "text-awc-fg-subtle dark:text-gray-500"
                }`}
              >
                {PROJECT_TASK_STATUS_LABEL[s]}
              </li>
            ),
          )}
        </ol>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-[12px] text-awc-fg-muted">{C.fromComputer}</span>
        <button type="button" className={PANEL_BUTTON_SECONDARY_CLASS}>
          {C.openHistory}
        </button>
        <button
          type="button"
          className={PANEL_BUTTON_SECONDARY_CLASS}
          onClick={onLoadOlder}
        >
          {C.loadOlder}
        </button>
        {reportHref !== null && task.status === "done" ? (
          <a href={reportHref} className={PANEL_LINK_CLASS}>
            {C.openReport}
          </a>
        ) : null}
      </div>
    </section>
  );
}
