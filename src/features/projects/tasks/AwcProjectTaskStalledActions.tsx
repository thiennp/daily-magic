"use client";

import { useRetryRunInComposer } from "@/features/agent/hooks/useRetryRunInComposer";
import {
  AWC_TASKS_LINK_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import { buildProjectTabHash } from "@/lib/shell/buildNavConsolidationRedirect";

/** 41888ea3: a Stalled row offers Retry and Open report right in the list. */
export default function AwcProjectTaskStalledActions({
  task,
}: {
  readonly task: Pick<ProjectTaskMeta, "agentRunId" | "title">;
}) {
  const retryRun = useRetryRunInComposer();
  const runId = task.agentRunId?.trim() ?? "";
  if (runId.length === 0) {
    return null;
  }
  return (
    <div className="flex items-center gap-2 px-4 pb-3">
      <button
        type="button"
        className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
        onClick={() => retryRun(runId)}
      >
        Retry<span className="sr-only"> {task.title}</span>
      </button>
      <a
        href={buildProjectTabHash("reports", { report: runId })}
        className={AWC_TASKS_LINK_CLASS}
      >
        {C.openReport}
        <span className="sr-only"> {task.title}</span>
      </a>
    </div>
  );
}
