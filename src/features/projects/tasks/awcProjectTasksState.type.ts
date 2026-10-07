import type {
  ProjectSyncConnectionState,
  ProjectTaskUiStatus,
} from "@/features/projects/sync/projectSync.types";
import type {
  ProjectTaskMeta,
  ProjectTaskPlanCounts,
  ProjectTasksChatVisibility,
} from "@/features/projects/tasks/projectTask.type";

/** What the Tasks tab reads from useAwcProjectTasks. */
export type AwcProjectTasksState = {
  readonly tasks: readonly ProjectTaskMeta[];
  readonly allTasks: readonly ProjectTaskMeta[];
  readonly connection: ProjectSyncConnectionState;
  readonly offlineMessage: string | null;
  readonly idbSoftDegraded: boolean;
  readonly planCounts: ProjectTaskPlanCounts | null;
  readonly assistantFilter: string | "all";
  readonly statusFilter: ProjectTaskUiStatus | "all";
  readonly chatVisibility: ProjectTasksChatVisibility;
  readonly loading: boolean;
  readonly loadFailed: boolean;
  readonly setAssistantFilter: (id: string | "all") => void;
  readonly setStatusFilter: (s: ProjectTaskUiStatus | "all") => void;
  readonly setChatVisibility: (v: ProjectTasksChatVisibility) => void;
  readonly reload: () => void;
  readonly assistants: readonly { readonly id: string; readonly name: string }[];
};
