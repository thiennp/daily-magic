import type {
  ProjectTaskPriority,
  ProjectTaskStage,
  ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

/** One project task record (Neon meta only — DF-024). */
export type ProjectTaskRecord = {
  readonly id: string;
  readonly projectId: string;
  readonly title: string;
  readonly description: string | null;
  readonly status: ProjectTaskStatus;
  readonly priority: ProjectTaskPriority | null;
  readonly stage: ProjectTaskStage | null;
  readonly tipSha: string | null;
  readonly dependsOn: readonly string[];
  readonly ownerMembershipId: string | null;
  readonly ownerDisplayName: string | null;
  readonly createdByUserId: string | null;
  readonly createdByMembershipId: string | null;
  /** Planned item this task was started from (same project). */
  readonly planItemId: string | null;
  readonly startedAt: string | null;
  readonly blockedAt: string | null;
  readonly doneAt: string | null;
  readonly cancelledAt: string | null;
  /** stageChangedAt per step: { design: iso, build: iso, … }. */
  readonly stageTimes: Readonly<Partial<Record<ProjectTaskStage, string>>>;
  readonly createdAt: string;
  readonly updatedAt: string;
};
