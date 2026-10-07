"use client";

import { useMemo, useState } from "react";

import AwcProjectLibraryRow from "@/features/projects/library/AwcProjectLibraryRow";
import AwcProjectLibraryToolbar from "@/features/projects/library/AwcProjectLibraryToolbar";
import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { AwcProjectLibraryState } from "@/features/projects/library/useAwcProjectLibrary";
import {
  countProjectLibraryItems,
  filterProjectLibraryItems,
  type ProjectLibraryFilter,
} from "@/features/projects/library/utils/buildProjectLibraryItems";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_INTRO_CLASS,
  PANEL_LIST_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcProjectLibraryListProps {
  readonly library: AwcProjectLibraryState;
  readonly canEdit: boolean;
  readonly onOpen: (itemId: string) => void;
  readonly onNew?: () => void;
  readonly onAddFrom?: () => void;
}

const LIB_ICON = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10v16H5.5A1.5 1.5 0 0 1 4 18.5z" />
    <path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14z" />
  </svg>
);

/** Chips + search + rows; HN-H3 empty card with New (primary) + Add from (secondary). */
export default function AwcProjectLibraryList({
  library,
  canEdit,
  onOpen,
  onNew,
  onAddFrom,
}: AwcProjectLibraryListProps) {
  const [filter, setFilter] = useState<ProjectLibraryFilter>("all");
  const [query, setQuery] = useState("");
  const counts = useMemo(
    () => countProjectLibraryItems(library.items),
    [library.items],
  );
  const visible = useMemo(
    () => filterProjectLibraryItems(library.items, filter, query),
    [library.items, filter, query],
  );
  const note = C["library.readOnlyNote"];

  if (library.loadFailed && library.items.length === 0) {
    return (
      <div className="flex flex-col items-start gap-2 px-1">
        <p className={PANEL_STATUS_CLASS}>{C["library.error"]}</p>
        <button
          type="button"
          className={PANEL_BUTTON_SECONDARY_CLASS}
          onClick={library.reload}
        >
          {C["library.error.retry"]}
        </button>
      </div>
    );
  }
  if (library.isLoading && library.items.length === 0) {
    return <p className={PANEL_STATUS_CLASS}>{C["library.loading"]}</p>;
  }
  if (library.items.length === 0) {
    if (!canEdit) {
      return (
        <>
          <p className={PANEL_STATUS_CLASS}>{C["library.empty.member"]}</p>
          <p className={`px-1 ${PANEL_INTRO_CLASS}`}>{note}</p>
        </>
      );
    }
    return (
      <div className="rounded-[14px] border border-dashed border-awc-border-strong bg-awc-tile px-6 py-10 text-center dark:border-gray-700 dark:bg-white/[0.03]">
        <div className="mx-auto mb-3 grid size-11 place-items-center rounded-xl bg-awc-accent-soft text-brand-600 dark:bg-white/10 dark:text-brand-400">
          {LIB_ICON}
        </div>
        <h2 className="text-[17px] font-semibold text-awc-fg dark:text-white">
          {C["library.empty.owner.title"]}
        </h2>
        <p className="mx-auto mt-1 max-w-[380px] text-sm text-awc-fg-muted dark:text-gray-400">
          {C["library.empty.owner.body"]}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            className={PANEL_BUTTON_PRIMARY_CLASS}
            onClick={onNew}
          >
            {A["library.new"]}
          </button>
          <button
            type="button"
            className={PANEL_BUTTON_SECONDARY_CLASS}
            onClick={onAddFrom}
          >
            {A["library.add_from"]}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <AwcProjectLibraryToolbar
        counts={counts}
        filter={filter}
        query={query}
        onFilterChange={setFilter}
        onQueryChange={setQuery}
        showVisibilityInfo={canEdit}
      />
      {visible.length === 0 ? (
        <p className={PANEL_STATUS_CLASS}>{C["library.filter.empty"]}</p>
      ) : (
        <ul className={PANEL_LIST_CLASS}>
          {visible.map((item) => (
            <AwcProjectLibraryRow key={item.id} item={item} onOpen={onOpen} />
          ))}
        </ul>
      )}
      {canEdit ? null : <p className={`px-1 ${PANEL_INTRO_CLASS}`}>{note}</p>}
    </>
  );
}
