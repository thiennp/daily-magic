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
  back: "Back to planned work",
  noDescription: "No description.",
  kvOwner: "Owner",
  kvPriority: "Priority",
  kvStage: "Stage",
  kvTip: "Tip",
  kvDepends: "Waits on",
  noneLabel: "None",
  unknownTask: "Unknown task",
  timelineHeading: "Timeline",
  timelineCreated: "Created",
  timelineStarted: "Started",
  timelineBlocked: "Blocked",
  timelineDone: "Done",
  timelineCancelled: "Cancelled",
  timelineUpdated: "Last updated",
  controlsHeading: "Change",
  controlStatus: "Status",
  controlPriority: "Priority",
  controlAssignee: "Assignee",
  noPriority: "No priority",
  outcomeHeading: "Outcome",
  unassigned: "Unassigned",
  seatsLoading: "Loading people…",
  hintAgent: "Coding agent",
  hintAssistant: "Assistant",
  saving: "Saving…",
  stopWarning: "The agent working on it will be told to stop.",
  confirmApply: "Yes, change it",
  confirmCancel: "Keep as is",
  conflictError: "Someone else changed this task — reloaded.",
  forbiddenError: "You cannot edit tasks in this project.",
  ownerNotMemberError:
    "That person is no longer an active member, so the task was not reassigned.",
  genericError: "Could not save the change.",
} as const;

export const PROJECT_TASK_RECORD_STATUS_LABEL: Record<
  ProjectTaskStatus,
  string
> = {
  queued: "To do",
  planned: "Planned",
  in_progress: "In progress",
  blocked: "Blocked",
  done: "Done",
  cancelled: "Cancelled",
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
