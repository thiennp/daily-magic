"use client";

import AwcProjectTasksFilters from "@/features/projects/tasks/AwcProjectTasksFilters";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { AwcProjectTasksState } from "@/features/projects/tasks/awcProjectTasksState.type";

/** Tasks tab toolbar: filters, group switch, and plan counts. */
export default function AwcProjectTasksToolbar({
  tasks,
  groupByAssistant,
  onGroupByAssistant,
}: {
  readonly tasks: AwcProjectTasksState;
  readonly groupByAssistant: boolean;
  readonly onGroupByAssistant: (value: boolean) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5 border-b border-awc-border px-3.5 py-3">
      <AwcProjectTasksFilters
        assistants={tasks.assistants}
        assistantId={tasks.assistantFilter}
        status={tasks.statusFilter}
        onAssistantChange={tasks.setAssistantFilter}
        onStatusChange={tasks.setStatusFilter}
      />
      <label className="inline-flex items-center gap-1.5 text-[13px] text-awc-fg-muted">
        <input
          type="checkbox"
          checked={groupByAssistant}
          onChange={(e) => {
            onGroupByAssistant(e.target.checked);
          }}
        />
        {C.groupByAssistant}
      </label>
      <span className="min-w-0 flex-1" />
      {tasks.planCounts !== null ? (
        <span
          className="inline-flex items-center gap-1.5 text-[12px] whitespace-nowrap text-awc-fg-subtle"
          title={C.planTip}
        >
          {C.planCounts(tasks.planCounts.used, tasks.planCounts.max)}
          <span
            className="inline-grid h-[18px] w-[18px] place-items-center rounded-full border border-awc-border-strong bg-awc-surface text-[11px] font-bold text-awc-fg-muted"
            aria-label={C.planTip}
          >
            i
          </span>
        </span>
      ) : null}
    </div>
  );
}
