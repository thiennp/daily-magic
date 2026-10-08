import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";
import type { ProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";
import type {
  ProjectTaskIdbRecord,
  ProjectTaskLocalRecord,
  ProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/projectTasksAdapter";

export type {
  ProjectTaskUiStatus,
  ProjectTaskIdbRecord,
  ProjectTaskLocalRecord,
  ProjectTaskNeonMeta,
};

/**
 * UI list/detail row — Neon/IDB meta (+ optional assistant display name, UI-only).
 * `status` widens to the display status so denied / timed-out runs keep their label.
 */
export type ProjectTaskMeta = Omit<ProjectTaskNeonMeta, "status"> & {
  readonly status: ProjectTaskDisplayStatus;
  readonly assistantName?: string | null;
  readonly statusReason?: string | null;
  readonly resultOutput?: string | null;
  /** Host report summary (c1731750), e.g. the killed-process reason. */
  readonly reportSummary?: string | null;
  readonly writerAgent?: string | null;
  readonly denialReason?: string | null;
};

export type ProjectTaskPlanCounts = {
  readonly used: number;
  readonly max: number;
};

export type ProjectTasksChatVisibility =
  "show_in_chat" | "tasks_tab_only" | "compact_chips";
