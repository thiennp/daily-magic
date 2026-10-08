"use client";

import {
  PROJECT_TASK_RECORD_STATUS_LABEL as STATUS,
  PROJECT_TASK_RECORDS_COPY as C,
} from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import {
  PROJECT_TASK_RECORD_TABS,
  type ProjectTaskRecordTab,
} from "@/features/projects/tasks/utils/projectTaskRecordView";

const label = (tab: ProjectTaskRecordTab): string =>
  tab === "all" ? C.tabAll : STATUS[tab];

/** Status tabs with counts; arrow keys move between tabs. */
export default function AwcProjectTaskRecordTabs({
  tab,
  counts,
  onChange,
}: {
  readonly tab: ProjectTaskRecordTab;
  readonly counts: Record<ProjectTaskRecordTab, number>;
  readonly onChange: (tab: ProjectTaskRecordTab) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label={C.tabsAria}
      className="flex min-w-0 flex-wrap gap-1.5"
      onKeyDown={(e) => {
        const step =
          e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (step === 0) return;
        const i = PROJECT_TASK_RECORD_TABS.indexOf(tab);
        const next =
          PROJECT_TASK_RECORD_TABS[
            (i + step + PROJECT_TASK_RECORD_TABS.length) %
              PROJECT_TASK_RECORD_TABS.length
          ];
        if (next !== undefined) onChange(next);
      }}
    >
      {PROJECT_TASK_RECORD_TABS.map((t) => {
        const selected = t === tab;
        return (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            data-task-record-tab={t}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[13px] font-medium ${
              selected
                ? "border-awc-fg bg-awc-fg text-awc-surface"
                : "border-awc-border-strong bg-awc-surface text-awc-fg-muted hover:bg-awc-tile"
            }`}
            onClick={() => {
              onChange(t);
            }}
          >
            {label(t)}
            <span className="tabular-nums opacity-75">{counts[t]}</span>
          </button>
        );
      })}
    </div>
  );
}
