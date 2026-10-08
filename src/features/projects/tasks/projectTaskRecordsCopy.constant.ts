import type {
  ProjectTaskPriority,
  ProjectTaskStage,
  ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

/** DF-024 task records section (Tasks tab, next to assistant runs). */
export const PROJECT_TASK_RECORDS_COPY = {
  heading: "Planned work",
  aria: "Project task records",
  loadError: "Could not load planned work.",
  ownerFallback: "Unassigned",
  tabsAria: "Filter planned work by status",
  tabAll: "All",
  tabEmpty: "Nothing here yet.",
  sortAria: "Sort planned work",
  sortAscAria: "Ascending — switch to descending",
  sortDescAria: "Descending — switch to ascending",
  sortLabel: {
    updated: "Last updated",
    created: "Date created",
    priority: "Priority",
    status: "Status",
    title: "Title",
  },
  dependsOn: (n: number) =>
    n === 1 ? "Waits on 1 task" : `Waits on ${n} tasks`,
} as const;

export const PROJECT_TASK_RECORD_STATUS_LABEL: Record<
  ProjectTaskStatus,
  string
> = {
  queued: "Queued",
  planned: "Planned",
  in_progress: "In progress",
  blocked: "Blocked",
  done: "Done",
};

export const PROJECT_TASK_RECORD_PRIORITY_LABEL: Record<
  ProjectTaskPriority,
  string
> = {
  p0: "Urgent",
  p1: "High",
  p2: "Normal",
  p3: "Low",
};

export const PROJECT_TASK_RECORD_STAGE_LABEL: Record<ProjectTaskStage, string> =
  {
    design: "Design",
    en: "EN",
    build: "Build",
    ready: "Ready",
    live: "Live",
  };
