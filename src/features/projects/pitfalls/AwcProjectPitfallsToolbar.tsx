"use client";

import { useId } from "react";

import { AWC_PROJECT_PITFALLS_COPY as C } from "@/features/projects/pitfalls/awcProjectPitfallsCopy.constant";
import type {
  AwcPitfallSeverityCounts,
  AwcPitfallSeverityFilter,
} from "@/features/projects/pitfalls/filterAwcProjectPitfallRows";
import {
  PITFALL_CHIP_ACTIVE_CLASS,
  PITFALL_CHIP_IDLE_CLASS,
  PITFALL_SEARCH_INPUT_CLASS,
} from "@/features/projects/pitfalls/pitfallsChrome.constant";

interface AwcProjectPitfallsToolbarProps {
  readonly counts: AwcPitfallSeverityCounts;
  readonly filter: AwcPitfallSeverityFilter;
  readonly query: string;
  readonly onFilterChange: (filter: AwcPitfallSeverityFilter) => void;
  readonly onQueryChange: (query: string) => void;
}

/** Artifact chips: All / Important / Warning (info rows stay under All). */
const CHIP_ORDER: readonly AwcPitfallSeverityFilter[] = [
  "all",
  "block",
  "warn",
];

const chipLabel = (filter: AwcPitfallSeverityFilter): string =>
  filter === "all" ? C.filterAll : C.severity[filter];

export default function AwcProjectPitfallsToolbar({
  counts,
  filter,
  query,
  onFilterChange,
  onQueryChange,
}: AwcProjectPitfallsToolbarProps) {
  const searchId = useId();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        role="group"
        aria-label={C.filterGroupLabel}
        className="flex flex-wrap items-center gap-2"
      >
        {CHIP_ORDER.map((chip) => (
          <button
            key={chip}
            type="button"
            aria-pressed={filter === chip}
            className={
              filter === chip ? PITFALL_CHIP_ACTIVE_CLASS : PITFALL_CHIP_IDLE_CLASS
            }
            onClick={() => {
              onFilterChange(chip);
            }}
          >
            {chipLabel(chip)}
            <span className="tabular-nums opacity-70">{counts[chip]}</span>
          </button>
        ))}
      </div>
      <label htmlFor={searchId} className="sr-only">
        {C.searchLabel}
      </label>
      <input
        id={searchId}
        type="search"
        value={query}
        placeholder={C.searchPlaceholder}
        className={PITFALL_SEARCH_INPUT_CLASS}
        onChange={(event) => {
          onQueryChange(event.target.value);
        }}
      />
    </div>
  );
}
