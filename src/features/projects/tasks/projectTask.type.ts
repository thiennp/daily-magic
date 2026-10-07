import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";
import type {
  ProjectTaskIdbRecord,
  ProjectTaskLocalRecord,
  ProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/projectTasksAdapter";

export type { ProjectTaskUiStatus, ProjectTaskIdbRecord, ProjectTaskLocalRecord, ProjectTaskNeonMeta };

/** UI list/detail row — Neon/IDB meta (+ optional assistant display name, UI-only). */
export type ProjectTaskMeta = ProjectTaskNeonMeta & {
  readonly assistantName?: string | null;
};

export type ProjectTaskPlanCounts = {
  readonly used: number;
  readonly max: number;
};

export type ProjectTasksChatVisibility =
  | "show_in_chat"
  | "tasks_tab_only"
  | "compact_chips";
