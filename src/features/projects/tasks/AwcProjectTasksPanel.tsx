"use client";

import { useState } from "react";

import useAwcProjectHashDeepLink from "@/features/projects/hooks/useAwcProjectHashDeepLink";
import {
  AWC_TASKS_CARD_CLASS,
  AWC_TASKS_PRIMARY_BUTTON_CLASS,
  AWC_TASKS_STATUS_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import AwcProjectTaskDetail from "@/features/projects/tasks/AwcProjectTaskDetail";
import AwcProjectTasksAssignDialog from "@/features/projects/tasks/AwcProjectTasksAssignDialog";
import AwcProjectTasksFilters from "@/features/projects/tasks/AwcProjectTasksFilters";
import AwcProjectTasksList from "@/features/projects/tasks/AwcProjectTasksList";
import AwcProjectTasksOfflineBanner from "@/features/projects/tasks/AwcProjectTasksOfflineBanner";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import useAwcProjectTasks from "@/features/projects/tasks/useAwcProjectTasks";
import { projectHasOwnerComputer } from "@/features/projects/utils/projectHasOwnerComputer";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/**
 * Tasks tab panel — screens A/B/D (EN PASS). Screen E lives in project Settings.
 * No standalone New task page. Load older stays in Chat (not Tasks).
 */
export default function AwcProjectTasksPanel({
  project,
}: {
  readonly project: UserProjectRecord;
}) {
  const hasGit = (project.repoUrls?.length ?? 0) > 0;
  const tasks = useAwcProjectTasks(project.id, {
    hasOwnerComputer: projectHasOwnerComputer(project),
  });
  const [taskId, setTaskId] = useAwcProjectHashDeepLink("tasks", "task");
  const [assignOpen, setAssignOpen] = useState(false);
  const selected =
    taskId === null
      ? null
      : (tasks.allTasks.find((t) => t.id === taskId) ?? null);
  const hasActiveFilters =
    tasks.assistantFilter !== "all" || tasks.statusFilter !== "all";

  return (
    <section aria-label={C.aria} className="flex min-w-0 flex-col gap-3.5">
      {tasks.offlineMessage !== null ? (
        <AwcProjectTasksOfflineBanner onRetry={tasks.reload} />
      ) : null}
      {selected !== null ? (
        <AwcProjectTaskDetail
          task={selected}
          hasGit={hasGit}
          showOffline={tasks.offlineMessage !== null}
          onBack={() => {
            setTaskId(null);
          }}
          onRetry={tasks.reload}
        />
      ) : (
        <div className={AWC_TASKS_CARD_CLASS}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5 border-b border-awc-border px-3.5 py-3">
            <AwcProjectTasksFilters
              assistants={tasks.assistants}
              assistantId={tasks.assistantFilter}
              status={tasks.statusFilter}
              onAssistantChange={tasks.setAssistantFilter}
              onStatusChange={tasks.setStatusFilter}
            />
            <span className="min-w-0 flex-1" />
            {tasks.planCounts !== null ? (
              <span
                className="inline-flex items-center gap-1.5 text-[12px] whitespace-nowrap text-awc-fg-subtle"
                title={C.planTip}
              >
                {C.planCounts(tasks.planCounts.used, tasks.planCounts.max)}
                <span
                  className="inline-grid h-[18px] w-[18px] place-items-center rounded-full border border-awc-border-strong bg-awc-surface text-[11px] font-bold text-awc-fg-muted"
                  aria-label={C.planTip}
                >
                  i
                </span>
              </span>
            ) : null}
            <button
              type="button"
              className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
              onClick={() => {
                setAssignOpen(true);
              }}
            >
              {C.emptyAssign}
            </button>
          </div>
          <div className="min-w-0">
            {tasks.loadFailed ? (
              <div className="flex flex-col items-start gap-2 px-3.5 py-3">
                <p className={AWC_TASKS_STATUS_CLASS}>{C.loadError}</p>
                <button
                  type="button"
                  className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
                  onClick={tasks.reload}
                >
                  {C.offlineRetry}
                </button>
              </div>
            ) : tasks.loading && tasks.allTasks.length === 0 ? (
              <p className={AWC_TASKS_STATUS_CLASS}>{C.loading}</p>
            ) : (
              <AwcProjectTasksList
                tasks={tasks.tasks}
                hasGit={hasGit}
                hasActiveFilters={hasActiveFilters}
                onOpen={setTaskId}
                onAssign={() => {
                  setAssignOpen(true);
                }}
                onClearFilters={() => {
                  tasks.setAssistantFilter("all");
                  tasks.setStatusFilter("all");
                }}
              />
            )}
          </div>
        </div>
      )}
      <AwcProjectTasksAssignDialog
        open={assignOpen}
        hasGit={hasGit}
        defaultBranch={project.defaultBranch ?? null}
        assistants={
          tasks.assistants.length > 0
            ? tasks.assistants
            : [{ id: "assistant", name: "Assistant" }]
        }
        onClose={() => {
          setAssignOpen(false);
        }}
        onAssign={() => {
          /* Assign lands via existing chat composer path; dialog is UI only. */
        }}
      />
    </section>
  );
}
