"use client";

import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import type { useProjectTaskPeopleFilter } from "@/features/projects/tasks/useProjectTaskPeopleFilter";
import { PROJECT_TASK_UNASSIGNED } from "@/features/projects/tasks/utils/projectTaskPeopleFilter";

const SELECT_CLASS =
  "awc-focus-ring h-8 max-w-[14rem] rounded-full border border-awc-border-strong bg-awc-surface px-3 text-[13px] font-medium text-awc-fg hover:bg-awc-tile";

/** Creator and Assignee dropdowns above the board / list. */
export default function AwcProjectTaskPeopleFilters({
  filter,
}: {
  readonly filter: ReturnType<typeof useProjectTaskPeopleFilter>;
}) {
  const { creators, assignees } = filter.options;
  return (
    <div className="flex flex-wrap items-center gap-2 px-3.5 pb-1 text-[13px] text-awc-fg-muted">
      <label className="flex items-center gap-1.5">
        {C.filterCreator}
        <select
          className={SELECT_CLASS}
          value={filter.creatorId}
          onChange={(e) => filter.setCreatorId(e.target.value)}
        >
          <option value="">{C.filterAnyone}</option>
          {creators.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-1.5">
        {C.filterAssignee}
        <select
          className={SELECT_CLASS}
          value={filter.assigneeId}
          onChange={(e) => filter.setAssigneeId(e.target.value)}
        >
          <option value="">{C.filterAnyone}</option>
          <option value={PROJECT_TASK_UNASSIGNED}>{C.unassigned}</option>
          {assignees.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
