import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";
import {
  AWC_TASKS_INPUT_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";

const STATUSES: readonly (ProjectTaskUiStatus | "all")[] = [
  "all",
  "queued",
  "running",
  "done",
  "failed",
  "cancelled",
];

const STATUS_LABEL: Record<ProjectTaskUiStatus | "all", string> = {
  all: C.filterAllStatus,
  queued: C.statusQueued,
  running: C.statusRunning,
  done: C.statusDone,
  failed: C.statusFailed,
  cancelled: C.statusCancelled,
};

export type AwcProjectTasksFiltersProps = {
  readonly assistants: readonly { readonly id: string; readonly name: string }[];
  readonly assistantId: string | "all";
  readonly status: ProjectTaskUiStatus | "all";
  readonly onAssistantChange: (id: string | "all") => void;
  readonly onStatusChange: (status: ProjectTaskUiStatus | "all") => void;
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
