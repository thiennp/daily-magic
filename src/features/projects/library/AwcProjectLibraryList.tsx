"use client";

import { useMemo, useState } from "react";

import type { SkillImpactRow } from "@/lib/knowledge/knowledgeImpactView.type";
import AwcProjectLibraryEmptyOwner from "@/features/projects/library/AwcProjectLibraryEmptyOwner";
import AwcProjectLibraryRow from "@/features/projects/library/AwcProjectLibraryRow";
import AwcProjectLibraryToolbar from "@/features/projects/library/AwcProjectLibraryToolbar";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { AwcProjectLibraryState } from "@/features/projects/library/useAwcProjectLibrary";
import { resolveProjectLibraryListFooterNote } from "@/features/projects/library/resolveProjectLibraryListFooterNote";
import {
  countProjectLibraryItems,
  filterProjectLibraryItems,
  type ProjectLibraryFilter,
} from "@/features/projects/library/utils/buildProjectLibraryItems";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import {
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_INTRO_CLASS,
  PANEL_LIST_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcProjectLibraryListProps {
  readonly library: AwcProjectLibraryState;
  readonly canEdit: boolean;
  readonly pageActorRole: ProjectPageActorRole;
  /** Skills saved from an auto question get the "Auto" chip. */
  readonly autoSkillIds?: readonly string[];
  /** Per-skill calls and tokens saved (Reports data), for the row meta. */
  readonly skillStats?: readonly SkillImpactRow[];
  readonly onOpen: (itemId: string) => void;
  readonly onNew?: () => void;
  readonly onAddFrom?: () => void;
}

/** Chips + search + rows; HN-H3 empty card with New (primary) + Add from (secondary). */
export default function AwcProjectLibraryList({
  library,
  canEdit,
  pageActorRole,
  autoSkillIds = [],
  skillStats = [],
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
  const footerNote = resolveProjectLibraryListFooterNote(pageActorRole);

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
          <p className={`px-1 ${PANEL_INTRO_CLASS}`}>
            {C["library.readOnlyNote"]}
          </p>
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
              stats={skillStats.find((s) => s.skillId === item.skillId)}
              onOpen={onOpen}
            />
          ))}
        </ul>
      )}
      {footerNote !== null ? (
        <p className={`px-1 ${PANEL_INTRO_CLASS}`}>{footerNote}</p>
      ) : null}
    </>
  );
}
