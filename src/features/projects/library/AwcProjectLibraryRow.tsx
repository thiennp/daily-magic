"use client";

import {
  PROJECT_LIBRARY_KIND_LABEL,
  PROJECT_LIBRARY_STATE_LABEL,
} from "@/features/projects/library/projectLibraryLabels.constant";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import type { ProjectLibraryItem } from "@/features/projects/library/utils/buildProjectLibraryItems";
import { formatSkillUsage } from "@/features/projects/library/utils/formatSkillUsage";
import type { SkillImpactRow } from "@/lib/knowledge/knowledgeImpactView.type";
import {
  PANEL_PILL_CLASS,
  PANEL_ROW_CLASS,
  PANEL_ROW_META_CLASS,
  PANEL_ROW_TITLE_CLASS,
} from "@/features/projects/public-api/types";

interface AwcProjectLibraryRowProps {
  readonly item: ProjectLibraryItem;
  /** Calls, tokens saved and script flag from the Reports data. */
  readonly stats?: SkillImpactRow;
  readonly isAuto?: boolean;
  readonly onOpen: (itemId: string) => void;
}

/** Name · kind · state · updated; whole row opens the item. */
export default function AwcProjectLibraryRow({
  item,
  stats,
  isAuto = false,
  onOpen,
}: AwcProjectLibraryRowProps) {
  const usage = formatSkillUsage(stats);
  return (
    <li className="border-t border-awc-border/80 first:border-t-0 dark:border-gray-800/80">
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
            {usage !== null ? ` · ${usage}` : ""}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          {isAuto ? (
            <span className="rounded-full bg-awc-accent-soft px-2 py-0.5 text-[11.5px] font-medium text-brand-600 dark:bg-white/10 dark:text-brand-400">
              Auto
            </span>
          ) : null}
          {stats?.hasScripts === true && stats.scriptCount > 0 ? (
            <span className={PANEL_PILL_CLASS}>
              {stats.scriptCount}{" "}
              {stats.scriptCount === 1 ? "script" : "scripts"}
            </span>
          ) : null}
          <span className={PANEL_PILL_CLASS}>
            {PROJECT_LIBRARY_STATE_LABEL[item.state]}
          </span>
        </span>
      </button>
    </li>
  );
}
