"use client";

import AwcProjectTaskDetailInfoList from "@/features/projects/tasks/AwcProjectTaskDetailInfoList";
import AwcProjectTaskGitTags from "@/features/projects/tasks/AwcProjectTaskGitTags";
import AwcProjectTaskResultBlock from "@/features/projects/tasks/AwcProjectTaskResultBlock";
import AwcProjectTaskStatusChip from "@/features/projects/tasks/AwcProjectTaskStatusChip";
import AwcProjectTaskTimeline from "@/features/projects/tasks/AwcProjectTaskTimeline";
import AwcProjectTasksOfflineBanner from "@/features/projects/tasks/AwcProjectTasksOfflineBanner";
import {
  AWC_TASKS_CARD_CLASS,
  AWC_TASKS_GHOST_BUTTON_CLASS,
  AWC_TASKS_LINK_CLASS,
  AWC_TASKS_PANEL_HEADING_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import { shouldShowTaskOpenReport } from "@/features/projects/tasks/utils/shouldShowTaskOpenReport";
import { buildProjectTabHash } from "@/lib/shell/buildNavConsolidationRedirect";
import { useSendTaskModal } from "@/features/agent/SendTaskModalProvider";
import { resolveTaskLiveViewAction } from "@/features/projects/tasks/utils/resolveTaskLiveViewAction";

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

  const { expandRunningSendTask } = useSendTaskModal();
  const liveAction = resolveTaskLiveViewAction({
    status: task.status,
    agentRunId: task.agentRunId,
  });

  return (
    <section className="flex min-w-0 flex-col gap-4" aria-label={task.title}>
      <button
        type="button"
        className={`${AWC_TASKS_GHOST_BUTTON_CLASS} self-start`}
        onClick={onBack}
      >
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
        <AwcProjectTaskGitTags
          show={hasGit}
          branch={task.branch}
          worktree={task.worktree}
        />
      </div>
      {showOffline ? <AwcProjectTasksOfflineBanner onRetry={onRetry} /> : null}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className={`${AWC_TASKS_CARD_CLASS} p-4`}>
          <h3
            className={`${AWC_TASKS_PANEL_HEADING_CLASS} mb-3 flex items-center gap-2`}
          >
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
          <AwcProjectTaskDetailInfoList task={task} hasGit={hasGit} />
          <AwcProjectTaskResultBlock task={task} />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[12px] text-awc-fg-muted">
              {C.fromComputer}
            </span>
            {liveAction !== null ? (
              <button
                type="button"
                className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
                onClick={() => expandRunningSendTask(liveAction.runId)}
              >
                {liveAction.label}
              </button>
            ) : null}
            <button type="button" className={AWC_TASKS_SECONDARY_BUTTON_CLASS}>
              {C.openHistory}
            </button>
            {reportHref !== null && shouldShowTaskOpenReport(task.status) ? (
              <a href={reportHref} className={AWC_TASKS_LINK_CLASS}>
                {C.openReport}
              </a>
            ) : null}
          </div>
        </div>
        <AwcProjectTaskTimeline status={task.status} />
      </div>
    </section>
  );
}
