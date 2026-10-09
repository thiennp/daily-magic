"use client";

import { useState } from "react";

import useAwcProjectHashDeepLink from "@/features/projects/hooks/useAwcProjectHashDeepLink";
import {
  AWC_TASKS_CARD_CLASS,
  AWC_TASKS_PRIMARY_BUTTON_CLASS,
  AWC_TASKS_STATUS_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import AwcProjectTaskDetail from "@/features/projects/tasks/AwcProjectTaskDetail";
import AwcProjectTasksList from "@/features/projects/tasks/AwcProjectTasksList";
import AwcProjectTasksToolbar from "@/features/projects/tasks/AwcProjectTasksToolbar";
import AwcProjectTasksOfflineBanner from "@/features/projects/tasks/AwcProjectTasksOfflineBanner";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import useAwcProjectTasks from "@/features/projects/tasks/useAwcProjectTasks";
import { projectHasOwnerComputer } from "@/features/projects/utils/projectHasOwnerComputer";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/**
 * Tasks tab panel — screens A/B/D (EN PASS). Screen E lives in project Settings.
 * No standalone New task page. Load older stays in Chat (not Tasks).
 * Tasks are created from the Planned work board ("Create task") or in chat.
 * With no assistant runs the panel stays out of the way (no empty box).
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
  const [groupByAssistant, setGroupByAssistant] = useState(false);
  const selected =
    taskId === null
      ? null
      : (tasks.allTasks.find((t) => t.id === taskId) ?? null);
  const hasActiveFilters =
    tasks.assistantFilter !== "all" || tasks.statusFilter !== "all";

  if (
    selected === null &&
    !tasks.loading &&
    !tasks.loadFailed &&
    tasks.allTasks.length === 0 &&
    tasks.offlineMessage === null
  ) {
    return null;
  }

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
          <AwcProjectTasksToolbar
            tasks={tasks}
            groupByAssistant={groupByAssistant}
            onGroupByAssistant={setGroupByAssistant}
          />
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
                groupByAssistant={groupByAssistant}
                onOpen={setTaskId}
                onClearFilters={() => {
                  tasks.setAssistantFilter("all");
                  tasks.setStatusFilter("all");
                }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
