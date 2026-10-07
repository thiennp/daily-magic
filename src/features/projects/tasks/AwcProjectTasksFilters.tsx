import {
  AWC_TASKS_INPUT_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import {
  PROJECT_PAGE_TASKS_COPY as C,
  PROJECT_TASK_STATUS_LABEL,
} from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";

const STATUSES: readonly (ProjectTaskDisplayStatus | "all")[] = [
  "all",
  "queued",
  "running",
  "done",
  "failed",
  "cancelled",
  "denied",
  "timed_out",
];

const STATUS_LABEL: Record<ProjectTaskDisplayStatus | "all", string> = {
  all: C.filterAllStatus,
  ...PROJECT_TASK_STATUS_LABEL,
};

export type AwcProjectTasksFiltersProps = {
  readonly assistants: readonly { readonly id: string; readonly name: string }[];
  readonly assistantId: string | "all";
  readonly status: ProjectTaskDisplayStatus | "all";
  readonly onAssistantChange: (id: string | "all") => void;
  readonly onStatusChange: (status: ProjectTaskDisplayStatus | "all") => void;
};

export default function AwcProjectTasksFilters(p: AwcProjectTasksFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <label className="sr-only" htmlFor="awc-tasks-assistant">
        {C.filterAllAssistants}
      </label>
      <select
        id="awc-tasks-assistant"
        className={`${AWC_TASKS_INPUT_CLASS} w-auto max-w-[14rem]`}
        value={p.assistantId}
        onChange={(e) => {
          p.onAssistantChange(e.target.value === "all" ? "all" : e.target.value);
        }}
      >
        <option value="all">{C.filterAllAssistants}</option>
        {p.assistants.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={C.filterAllStatus}>
        {STATUSES.map((s) => {
          const selected = p.status === s;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={selected}
              className={`rounded-full border px-2.5 py-1 text-[13px] font-medium ${
                selected
                  ? "border-awc-fg bg-awc-fg text-awc-surface"
                  : "border-awc-border-strong bg-awc-surface text-awc-fg-muted hover:bg-awc-tile"
              }`}
              onClick={() => {
                p.onStatusChange(s);
              }}
            >
              {STATUS_LABEL[s]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
