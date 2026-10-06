"use client";

import { useId } from "react";

import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { ProjectLibraryFilter } from "@/features/projects/library/utils/buildProjectLibraryItems";
import {
  PITFALL_CHIP_ACTIVE_CLASS,
  PITFALL_CHIP_IDLE_CLASS,
  PITFALL_SEARCH_INPUT_CLASS,
} from "@/features/projects/pitfalls/pitfallsChrome.constant";

/** Locked chip order + labels (Product: All / Playbooks / Workflows / Skills). */
const CHIPS: readonly {
  readonly id: ProjectLibraryFilter;
  readonly label: string;
}[] = [
  { id: "all", label: C["library.filter.all"] },
  { id: "playbook", label: C["library.filter.playbooks"] },
  { id: "workflow", label: C["library.filter.workflows"] },
  { id: "skill", label: C["library.filter.skills"] },
];

interface AwcProjectLibraryToolbarProps {
  readonly counts: Readonly<Record<ProjectLibraryFilter, number>>;
  readonly filter: ProjectLibraryFilter;
  readonly query: string;
  readonly onFilterChange: (filter: ProjectLibraryFilter) => void;
  readonly onQueryChange: (query: string) => void;
}

export default function AwcProjectLibraryToolbar({
  counts,
  filter,
  query,
  onFilterChange,
  onQueryChange,
}: AwcProjectLibraryToolbarProps) {
  const searchId = useId();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        role="group"
        aria-label={C["library.filter.aria"]}
        className="flex flex-wrap items-center gap-2"
      >
        {CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            aria-pressed={filter === chip.id}
            className={
              filter === chip.id
                ? PITFALL_CHIP_ACTIVE_CLASS
                : PITFALL_CHIP_IDLE_CLASS
            }
            onClick={() => {
              onFilterChange(chip.id);
            }}
          >
            {chip.label}
            <span className="tabular-nums opacity-70">{counts[chip.id]}</span>
          </button>
        ))}
      </div>
      <label htmlFor={searchId} className="sr-only">
        {C["library.search.sr"]}
      </label>
      <input
        id={searchId}
        type="search"
        value={query}
        placeholder={C["library.search.placeholder"]}
        className={PITFALL_SEARCH_INPUT_CLASS}
        onChange={(event) => {
          onQueryChange(event.target.value);
        }}
      />
    </div>
  );
}
