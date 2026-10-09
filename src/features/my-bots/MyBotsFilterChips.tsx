"use client";

import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import type { MyBotsProjectFilter } from "@/features/my-bots/utils/filterMyBotsByProject";

const FILTERS: readonly {
  readonly id: MyBotsProjectFilter;
  readonly label: string;
}[] = [
  { id: "all", label: MY_BOTS_COPY.filterAll },
  { id: "in_project", label: MY_BOTS_COPY.filterInProject },
  { id: "not_in_project", label: MY_BOTS_COPY.filterNotInProject },
];

interface MyBotsFilterChipsProps {
  readonly filter: MyBotsProjectFilter;
  readonly counts: Readonly<Record<MyBotsProjectFilter, number>>;
  readonly onFilter: (next: MyBotsProjectFilter) => void;
}

/** Chips All · In a project · Not in a project, with counts. */
export default function MyBotsFilterChips({
  filter,
  counts,
  onFilter,
}: MyBotsFilterChipsProps) {
  return (
    <div
      role="group"
      aria-label={MY_BOTS_COPY.filterLabel}
      className="flex flex-wrap gap-1.5"
    >
      {FILTERS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          aria-pressed={filter === id}
          onClick={() => onFilter(id)}
          className={`rounded-full border px-2.5 py-1 text-[13px] font-medium ${
            filter === id
              ? "border-awc-fg bg-awc-fg text-awc-surface"
              : "border-awc-border-strong bg-awc-surface text-awc-fg-muted hover:bg-awc-tile"
          }`}
        >
          {label} <span className="tabular-nums">{counts[id]}</span>
        </button>
      ))}
    </div>
  );
}
