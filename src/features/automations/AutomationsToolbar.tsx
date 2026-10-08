import type {
  AutomationSort,
  AutomationStatusFilter,
} from "@/features/automations/automationsListView";

const FIELD_CLASS =
  "rounded-lg border border-awc-border px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800";

const FILTERS: readonly { value: AutomationStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "enabled", label: "Enabled" },
  { value: "paused", label: "Paused" },
  { value: "error", label: "Error" },
];

interface AutomationsToolbarProps {
  readonly query: string;
  readonly sort: AutomationSort;
  readonly filter: AutomationStatusFilter;
  readonly counts: Readonly<Record<AutomationStatusFilter, number>>;
  readonly onQueryChange: (value: string) => void;
  readonly onSortChange: (value: AutomationSort) => void;
  readonly onFilterChange: (value: AutomationStatusFilter) => void;
}

export default function AutomationsToolbar(props: AutomationsToolbarProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="automations-search">
          Search automations
        </label>
        <input
          id="automations-search"
          type="search"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search automations…"
          value={props.query}
          onChange={(event) => props.onQueryChange(event.target.value)}
          className={`${FIELD_CLASS} min-w-[16rem] flex-1 sm:flex-none`}
        />
        <label
          className="text-sm font-medium text-awc-fg dark:text-white/90"
          htmlFor="automations-sort"
        >
          Sort
        </label>
        <select
          id="automations-sort"
          value={props.sort}
          onChange={(event) =>
            props.onSortChange(event.target.value as AutomationSort)
          }
          className={FIELD_CLASS}
        >
          <option value="next">Next run</option>
          <option value="last">Last run</option>
          <option value="name">Name A to Z</option>
        </select>
      </div>
      <div role="group" aria-label="Status" className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={props.filter === item.value}
            onClick={() => props.onFilterChange(item.value)}
            className="rounded-full border border-awc-border px-3 py-1 text-sm text-awc-fg-muted aria-pressed:border-brand-600 aria-pressed:bg-brand-50 aria-pressed:font-semibold aria-pressed:text-brand-700 dark:border-gray-700 dark:text-gray-300"
          >
            {item.label}{" "}
            <span className="tabular-nums">{props.counts[item.value]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
