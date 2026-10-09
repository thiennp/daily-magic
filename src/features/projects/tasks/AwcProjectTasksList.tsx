"use client";

import AwcProjectTasksEmptyCat from "@/features/projects/tasks/AwcProjectTasksEmptyCat";
import AwcProjectTaskListRow from "@/features/projects/tasks/AwcProjectTaskListRow";
import {
  AWC_TASKS_LIST_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import { groupProjectTasksByAssistant } from "@/features/projects/tasks/utils/groupProjectTasks";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";

export default function AwcProjectTasksList({
  tasks,
  hasGit,
  hasActiveFilters,
  groupByAssistant = false,
  onOpen,
  onClearFilters,
}: {
  readonly tasks: readonly ProjectTaskMeta[];
  readonly hasGit: boolean;
  readonly hasActiveFilters: boolean;
  readonly groupByAssistant?: boolean;
  readonly onOpen: (id: string) => void;
  readonly onClearFilters: () => void;
}) {
  if (tasks.length === 0) {
    const filtered = hasActiveFilters;
    return (
      <div className="px-4 py-12 text-center text-awc-fg-muted">
        <AwcProjectTasksEmptyCat />
        <h3 className="mb-3 text-[15px] font-semibold text-awc-fg">
          {filtered ? C.emptyFiltered : C.empty}
        </h3>
        {filtered ? (
          <button
            type="button"
            className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
            onClick={onClearFilters}
          >
            {C.clearFilters}
          </button>
        ) : null}
      </div>
    );
  }
  const groups = groupByAssistant
    ? groupProjectTasksByAssistant(tasks)
    : [{ name: "", tasks }];
  return (
    <div>
      {groups.map((group) => (
        <section key={group.name} aria-label={group.name || undefined}>
          {groupByAssistant ? (
            <h4 className="m-0 flex items-baseline gap-2 border-b border-awc-border bg-awc-tile/60 px-3.5 py-2 text-[13px] font-semibold text-awc-fg">
              {group.name}
              <span className="font-normal text-awc-fg-subtle">
                {C.groupCount(group.tasks.length)}
              </span>
            </h4>
          ) : null}
          <ul
            className={`${AWC_TASKS_LIST_CLASS} [&>li:last-child>button]:border-b-0`}
          >
            {group.tasks.map((task) => (
              <AwcProjectTaskListRow
                key={task.id}
                task={task}
                hasGit={hasGit}
                onOpen={onOpen}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
