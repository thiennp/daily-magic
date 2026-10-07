"use client";

import { useState } from "react";

import useAwcProjectHashDeepLink from "@/features/projects/hooks/useAwcProjectHashDeepLink";
import { PANEL_STATUS_CLASS } from "@/features/projects/projectPagePanelChrome.constant";
import { AWC_TASKS_PRIMARY_BUTTON_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import AwcProjectTaskDetail from "@/features/projects/tasks/AwcProjectTaskDetail";
import AwcProjectTasksAssignDialog from "@/features/projects/tasks/AwcProjectTasksAssignDialog";
import AwcProjectTasksChatSettings from "@/features/projects/tasks/AwcProjectTasksChatSettings";
import AwcProjectTasksFilters from "@/features/projects/tasks/AwcProjectTasksFilters";
import AwcProjectTasksList from "@/features/projects/tasks/AwcProjectTasksList";
import AwcProjectTasksOfflineBanner from "@/features/projects/tasks/AwcProjectTasksOfflineBanner";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import useAwcProjectTasks from "@/features/projects/tasks/useAwcProjectTasks";
import { projectHasOwnerComputer } from "@/features/projects/utils/projectHasOwnerComputer";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/**
 * Tasks tab panel — screens A/B/D/E (EN PASS). No standalone New task page.
 * Presentation chrome only; data from agent_runs via Reports API + S1 status mapper.
 * Load older / full history stay Chat + project computer (no separate web History).
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

  return (
    <section aria-label={C.aria} className="flex min-w-0 flex-col gap-3">
      {tasks.offlineMessage !== null ? (
        <AwcProjectTasksOfflineBanner onRetry={tasks.reload} />
      ) : null}
      {tasks.planCounts !== null ? (
        <p className="text-[12px] text-awc-fg-muted dark:text-gray-400">
          {C.planCounts(tasks.planCounts.used, tasks.planCounts.max)}
        </p>
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
          onLoadOlder={tasks.reload}
        />
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <AwcProjectTasksFilters
              assistants={tasks.assistants}
              assistantId={tasks.assistantFilter}
              status={tasks.statusFilter}
              onAssistantChange={tasks.setAssistantFilter}
              onStatusChange={tasks.setStatusFilter}
            />
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
          {tasks.loadFailed ? (
            <div className="flex flex-col items-start gap-2 px-1">
              <p className={PANEL_STATUS_CLASS}>{C.loadError}</p>
              <button
                type="button"
                className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
                onClick={tasks.reload}
              >
                {C.offlineRetry}
              </button>
            </div>
          ) : tasks.loading && tasks.allTasks.length === 0 ? (
            <p className={PANEL_STATUS_CLASS}>{C.loading}</p>
          ) : (
            <AwcProjectTasksList
              tasks={tasks.tasks}
              hasGit={hasGit}
              onOpen={setTaskId}
              onAssign={() => {
                setAssignOpen(true);
              }}
            />
          )}
          <AwcProjectTasksChatSettings
            value={tasks.chatVisibility}
            onChange={tasks.setChatVisibility}
          />
        </>
      )}
      <AwcProjectTasksAssignDialog
        open={assignOpen}
        hasGit={hasGit}
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
