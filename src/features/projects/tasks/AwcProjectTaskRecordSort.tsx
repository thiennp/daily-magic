"use client";

import {
  AWC_TASKS_GHOST_BUTTON_CLASS,
  AWC_TASKS_INPUT_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import {
  PROJECT_TASK_RECORD_SORT_KEYS,
  type ProjectTaskRecordSortDir,
  type ProjectTaskRecordSortKey,
} from "@/features/projects/tasks/utils/projectTaskRecordView";

/** Sort key select + ascending/descending toggle. */
export default function AwcProjectTaskRecordSort({
  sortKey,
  sortDir,
  onKeyChange,
  onToggleDir,
}: {
  readonly sortKey: ProjectTaskRecordSortKey;
  readonly sortDir: ProjectTaskRecordSortDir;
  readonly onKeyChange: (key: ProjectTaskRecordSortKey) => void;
  readonly onToggleDir: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <label className="sr-only" htmlFor="awc-task-records-sort">
        {C.sortAria}
      </label>
      <select
        id="awc-task-records-sort"
        className={`${AWC_TASKS_INPUT_CLASS} w-auto`}
        value={sortKey}
        onChange={(e) => {
          onKeyChange(e.target.value as ProjectTaskRecordSortKey);
        }}
      >
        {PROJECT_TASK_RECORD_SORT_KEYS.map((k) => (
          <option key={k} value={k}>
            {C.sortLabel[k]}
          </option>
        ))}
      </select>
      <button
        type="button"
        className={AWC_TASKS_GHOST_BUTTON_CLASS}
        aria-label={sortDir === "asc" ? C.sortAscAria : C.sortDescAria}
        title={sortDir === "asc" ? C.sortAscAria : C.sortDescAria}
        data-sort-dir={sortDir}
        onClick={onToggleDir}
      >
        {sortDir === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
}
