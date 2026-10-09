import type { ProjectTaskSeat } from "@/features/projects/tasks/utils/buildProjectTaskSeats";
import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/** "" = anyone; this value = tasks nobody owns. */
export const PROJECT_TASK_UNASSIGNED = "none";

export type ProjectTaskPeopleFilter = {
  readonly creatorId: string;
  readonly assigneeId: string;
};

export type ProjectTaskPersonOption = {
  readonly id: string;
  readonly label: string;
};

export const filterProjectTaskRecordsByPeople = (
  records: readonly ProjectTaskRecord[],
  { creatorId, assigneeId }: ProjectTaskPeopleFilter,
): readonly ProjectTaskRecord[] =>
  records.filter((r) => {
    if (creatorId !== "" && r.createdByMembershipId !== creatorId) return false;
    if (assigneeId === "") return true;
    return assigneeId === PROJECT_TASK_UNASSIGNED
      ? r.ownerMembershipId === null
      : r.ownerMembershipId === assigneeId;
  });

const uniqueIds = (ids: readonly (string | null)[]): readonly string[] => [
  ...new Set(ids.filter((id): id is string => id !== null)),
];

/** People who appear on the tasks, named from the project seats (fallback to the task's own name). */
export const buildProjectTaskPeopleOptions = (
  records: readonly ProjectTaskRecord[],
  seats: readonly ProjectTaskSeat[],
): {
  readonly creators: readonly ProjectTaskPersonOption[];
  readonly assignees: readonly ProjectTaskPersonOption[];
} => {
  const seatLabel = new Map(seats.map((s) => [s.id, s.label]));
  const ownerName = new Map(
    records.flatMap((r) =>
      r.ownerMembershipId !== null && r.ownerDisplayName
        ? [[r.ownerMembershipId, r.ownerDisplayName] as const]
        : [],
    ),
  );
  const toOption = (id: string): ProjectTaskPersonOption => ({
    id,
    label: seatLabel.get(id) ?? ownerName.get(id) ?? C.filterFormerMember,
  });
  const byLabel = (a: ProjectTaskPersonOption, b: ProjectTaskPersonOption) =>
    a.label.localeCompare(b.label);
  return {
    creators: uniqueIds(records.map((r) => r.createdByMembershipId))
      .map(toOption)
      .sort(byLabel),
    assignees: uniqueIds(records.map((r) => r.ownerMembershipId))
      .map(toOption)
      .sort(byLabel),
  };
};
