"use client";

import {
  PROJECT_LIBRARY_KIND_LABEL,
  PROJECT_LIBRARY_STATE_LABEL,
} from "@/features/projects/library/projectLibraryLabels.constant";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { ProjectLibraryItem } from "@/features/projects/library/utils/buildProjectLibraryItems";
import {
  PANEL_PILL_CLASS,
  PANEL_ROW_CLASS,
  PANEL_ROW_META_CLASS,
  PANEL_ROW_TITLE_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcProjectLibraryRowProps {
  readonly item: ProjectLibraryItem;
  readonly onOpen: (itemId: string) => void;
}

/** Name · kind · state · updated; whole row opens the item. */
export default function AwcProjectLibraryRow({
  item,
  onOpen,
}: AwcProjectLibraryRowProps) {
  return (
    <li className="border-t border-gray-200/80 first:border-t-0 dark:border-gray-800/80">
      <button
        type="button"
        aria-label={`${C["library.row.open"]}: ${item.name}`}
        className={PANEL_ROW_CLASS}
        onClick={() => {
          onOpen(item.id);
        }}
      >
        <span className="min-w-0">
          <span className={`block ${PANEL_ROW_TITLE_CLASS}`}>{item.name}</span>
          <span className={`block ${PANEL_ROW_META_CLASS}`}>
            {PROJECT_LIBRARY_KIND_LABEL[item.kind]}
            {" · "}
            <time dateTime={item.updatedAt}>
              {new Date(item.updatedAt).toLocaleDateString()}
            </time>
          </span>
        </span>
        <span className={PANEL_PILL_CLASS}>
          {PROJECT_LIBRARY_STATE_LABEL[item.state]}
        </span>
      </button>
    </li>
  );
}
