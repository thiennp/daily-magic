"use client";

import { useMemo, useState } from "react";

import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import {
  filterProjectTasks,
  listProjectTaskAssistants,
} from "@/features/projects/tasks/utils/projectTaskListView";

/** Tasks tab filters (assistant + status) and the filtered list. */
export const useProjectTaskFilters = (allTasks: readonly ProjectTaskMeta[]) => {
  const [assistantFilter, setAssistantFilter] = useState<string | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ProjectTaskUiStatus | "all">("all");
  const assistants = useMemo(() => listProjectTaskAssistants(allTasks), [allTasks]);
  const tasks = useMemo(
    () => filterProjectTasks(allTasks, assistantFilter, statusFilter),
    [allTasks, assistantFilter, statusFilter],
  );
  return {
    tasks,
    assistants,
    assistantFilter,
    statusFilter,
    setAssistantFilter,
    setStatusFilter,
  };
};
