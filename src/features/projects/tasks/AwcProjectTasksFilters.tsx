import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import { PANEL_INPUT_CLASS } from "@/features/projects/projectPagePanelChrome.constant";

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
    <div className="flex flex-wrap items-center gap-2">
      <label className="sr-only" htmlFor="awc-tasks-assistant">
        {C.filterAllAssistants}
      </label>
      <select
        id="awc-tasks-assistant"
        className={`${PANEL_INPUT_CLASS} max-w-[14rem]`}
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
      <div className="flex flex-wrap gap-1" role="group" aria-label={C.filterAllStatus}>
        {STATUSES.map((s) => {
          const selected = p.status === s;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={selected}
              className={`rounded-full border px-2.5 py-1 text-[12px] font-medium ${
                selected
                  ? "border-awc-control-border bg-awc-fill text-awc-fg dark:border-gray-500 dark:bg-white/10 dark:text-white"
                  : "border-awc-border bg-awc-surface text-awc-fg-muted hover:bg-awc-tile dark:border-gray-700 dark:bg-transparent dark:text-gray-300"
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
