"use client";

import { useMemo, useState } from "react";

import AwcProjectLibraryRow from "@/features/projects/library/AwcProjectLibraryRow";
import AwcProjectLibraryToolbar from "@/features/projects/library/AwcProjectLibraryToolbar";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { AwcProjectLibraryState } from "@/features/projects/library/useAwcProjectLibrary";
import {
  countProjectLibraryItems,
  filterProjectLibraryItems,
  type ProjectLibraryFilter,
} from "@/features/projects/library/utils/buildProjectLibraryItems";
import {
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_INTRO_CLASS,
  PANEL_LIST_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcProjectLibraryListProps {
  readonly library: AwcProjectLibraryState;
  readonly canEdit: boolean;
  readonly onOpen: (itemId: string) => void;
}

/** Chips + search + rows; role-aware empty + visibility / read-only note. */
export default function AwcProjectLibraryList({
  library,
  canEdit,
  onOpen,
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
  const note = canEdit
    ? C["library.visibilityHint"]
    : C["library.readOnlyNote"];

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
    return (
      <>
        <p className={PANEL_STATUS_CLASS}>
          {canEdit ? C["library.empty.owner"] : C["library.empty.member"]}
        </p>
        <p className={`px-1 ${PANEL_INTRO_CLASS}`}>{note}</p>
      </>
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
      <p className={`px-1 ${PANEL_INTRO_CLASS}`}>{note}</p>
    </>
  );
}
