"use client";

import { useMemo, useState } from "react";

import AwcProjectLibraryEmptyOwner from "@/features/projects/library/AwcProjectLibraryEmptyOwner";
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
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_INTRO_CLASS,
  PANEL_LIST_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcProjectLibraryListProps {
  readonly library: AwcProjectLibraryState;
  readonly canEdit: boolean;
  /** Skills saved from an auto question get the "Auto" chip. */
  readonly autoSkillIds?: readonly string[];
  readonly onOpen: (itemId: string) => void;
  readonly onNew?: () => void;
  readonly onAddFrom?: () => void;
}

/** Chips + search + rows; HN-H3 empty card with New (primary) + Add from (secondary). */
export default function AwcProjectLibraryList({
  library,
  canEdit,
  autoSkillIds = [],
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
    return <AwcProjectLibraryEmptyOwner onNew={onNew} onAddFrom={onAddFrom} />;
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
            <AwcProjectLibraryRow
              key={item.id}
              item={item}
              isAuto={
                item.skillId !== null && autoSkillIds.includes(item.skillId)
              }
              onOpen={onOpen}
            />
          ))}
        </ul>
      )}
      {canEdit ? null : <p className={`px-1 ${PANEL_INTRO_CLASS}`}>{note}</p>}
    </>
  );
}
