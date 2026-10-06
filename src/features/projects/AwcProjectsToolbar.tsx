"use client";

import {
  PROJECTS_V5_ICON_BUTTON_CLASS,
  PROJECTS_V5_MUTED_TEXT_CLASS,
  PROJECTS_V5_SEARCH_FIELD_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";

interface AwcProjectsToolbarProps {
  readonly searchQuery: string;
  readonly onSearchQueryChange: (value: string) => void;
  readonly projectCount: number;
  readonly visibleCount: number;
}

export default function AwcProjectsToolbar({
  searchQuery,
  onSearchQueryChange,
  projectCount,
  visibleCount,
}: AwcProjectsToolbarProps) {
  const trimmedQuery = searchQuery.trim();
  const countLabel =
    trimmedQuery === ""
      ? `${projectCount} ${projectCount === 1 ? "project" : "projects"}`
      : `${visibleCount} of ${projectCount} projects`;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-awc-fg-subtle"
        >
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M17 17l-4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="Search projects…"
          aria-label="Search projects"
          className={`${PROJECTS_V5_SEARCH_FIELD_CLASS} pl-9 ${trimmedQuery === "" ? "" : "pr-9"}`}
        />
        {trimmedQuery !== "" ? (
          <button
            type="button"
            aria-label="Clear search"
            className={`absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 ${PROJECTS_V5_ICON_BUTTON_CLASS}`}
            onClick={() => {
              onSearchQueryChange("");
            }}
          >
            ×
          </button>
        ) : null}
      </div>
      <p className={PROJECTS_V5_MUTED_TEXT_CLASS}>{countLabel}</p>
    </div>
  );
}
