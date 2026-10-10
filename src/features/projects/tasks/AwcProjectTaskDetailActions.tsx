"use client";

import { useRetryRunInComposer } from "@/features/agent/hooks/public-api/presentation";
import { useSendTaskModal } from "@/features/agent/SendTaskModalProvider";
import {
  AWC_TASKS_LINK_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { useAwcProjectTasksReadOnly } from "@/features/projects/tasks/AwcProjectTasksReadOnlyContext";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import { resolveTaskLiveViewAction } from "@/features/projects/tasks/utils/resolveTaskLiveViewAction";
import { shouldShowTaskOpenReport } from "@/features/projects/tasks/utils/shouldShowTaskOpenReport";
import { buildProjectTabHash } from "@/lib/shell/buildNavConsolidationRedirect";

/** Task detail actions: live view or Retry, Open history, Open report. */
export default function AwcProjectTaskDetailActions({
  task,
}: {
  readonly task: ProjectTaskMeta;
}) {
  const { expandRunningSendTask } = useSendTaskModal();
  const retryRun = useRetryRunInComposer();
  const readOnly = useAwcProjectTasksReadOnly();
  const liveAction = resolveTaskLiveViewAction({
    status: task.status,
    agentRunId: task.agentRunId,
  });
  const reportHref =
    task.agentRunId !== null
      ? buildProjectTabHash("reports", { report: task.agentRunId })
      : null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="text-[12px] text-awc-fg-muted">{C.fromComputer}</span>
      {liveAction !== null && !(readOnly && liveAction.label === "Retry") ? (
        <button
          type="button"
          className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
          onClick={() =>
            liveAction.label === "Retry"
              ? retryRun(liveAction.runId)
              : expandRunningSendTask(liveAction.runId)
          }
        >
          {liveAction.label}
        </button>
      ) : null}
      <button
        type="button"
        className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
        disabled={task.agentRunId === null}
        onClick={() => {
          if (task.agentRunId !== null) {
            expandRunningSendTask(task.agentRunId);
          }
        }}
      >
        {C.openHistory}
      </button>
      {reportHref !== null && shouldShowTaskOpenReport(task.status) ? (
        <a href={reportHref} className={AWC_TASKS_LINK_CLASS}>
          {C.openReport}
        </a>
      ) : null}
    </div>
  );
}
