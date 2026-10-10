import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import {
  PROJECT_PAGE_TAB_IDS,
  DEFAULT_PROJECT_PAGE_TAB,
} from "@/features/projects/projectPageTabs.constant";
import {
  PROJECT_V5_TABLIST_CLASS,
  PROJECT_V5_TAB_ACTIVE_CLASS,
  PROJECT_V5_TAB_BASE_CLASS,
  PROJECT_V5_TAB_INACTIVE_CLASS,
} from "@/features/projects/projectPageV5ChromeClasses.constant";
import { PROJECT_PAGE_V5_TAB_LABELS } from "@/features/projects/projectPageV5Tabs.constant";
import { AwcListRowsSkeleton } from "@/features/shell/loading/public-api/presentation";
import { AwcSkeletonBar } from "@/features/shell/loading/public-api/presentation";
import { AwcSkeletonStatus } from "@/features/shell/loading/public-api/presentation";
import { AWC_SKELETON_CARD_CLASS } from "@/features/shell/loading/public-api/types";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/public-api/types";

/*
 * DF-016: these three class strings intentionally mirror (copy, not import)
 * AwcProjectDetailPanel's grid/primary column and AwcProjectMembersColumn's
 * RAIL_CLASS so the route skeleton lines up 1:1 without touching the live
 * panel files (right-rail redesign pending). Keep in sync if those change.
 */
const GRID_CLASS =
  "grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-0 xl:grid-cols-[minmax(0,1fr)_21.25rem]";
const PRIMARY_COLUMN_CLASS = "flex min-w-0 flex-col gap-5 lg:pr-5";
const RAIL_CLASS =
  "min-w-0 border-t border-awc-border/80 bg-awc-bg/70 px-1 py-4 dark:border-gray-800/80 dark:bg-white/[0.03] lg:border-l lg:border-t-0 lg:pl-2 lg:pr-1";

/**
 * DF-016 route skeleton for /projects/[id] — header, real tab track
 * (default tab selected, non-interactive), panel body, Members rail.
 * Covers the Tasks / Library / Settings tabs and Members rail, which all
 * live inside this route. Server-safe (no hooks).
 */
export default function AwcProjectDetailSkeleton() {
  const copy = PROJECT_PAGE_LAYOUT_V2_COPY;
  return (
    <div className={APP_PAGE_STACK_CLASS} aria-busy="true">
      <div className={GRID_CLASS} data-skeleton="project-detail">
        <div className={PRIMARY_COLUMN_CLASS}>
          <header className="flex min-w-0 flex-col gap-2">
            <AwcSkeletonBar className="h-4 w-40" />
            <div className="min-w-0 space-y-2">
              <AwcSkeletonBar className="h-8 w-64 max-w-full" />
              <div className="flex flex-wrap items-center gap-2">
                <AwcSkeletonBar accent className="h-6 w-28 rounded-full" />
                <AwcSkeletonBar className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </header>
          <div aria-hidden="true" className={PROJECT_V5_TABLIST_CLASS}>
            {PROJECT_PAGE_TAB_IDS.map((tabId) => (
              <span
                key={tabId}
                className={`${PROJECT_V5_TAB_BASE_CLASS} ${
                  tabId === DEFAULT_PROJECT_PAGE_TAB
                    ? PROJECT_V5_TAB_ACTIVE_CLASS
                    : PROJECT_V5_TAB_INACTIVE_CLASS
                }`}
              >
                {PROJECT_PAGE_V5_TAB_LABELS[tabId]}
              </span>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[0, 1].map((card) => (
              <div
                key={card}
                className={`${AWC_SKELETON_CARD_CLASS} space-y-3`}
              >
                <AwcSkeletonBar className="h-5 w-1/3" />
                <AwcSkeletonBar className="h-4 w-full" />
                <AwcSkeletonBar className="h-4 w-4/5" />
              </div>
            ))}
          </div>
          <div className={`${AWC_SKELETON_CARD_CLASS} space-y-3`}>
            <AwcSkeletonBar className="h-5 w-1/4" />
            <AwcSkeletonBar className="h-4 w-full" />
            <AwcSkeletonBar className="h-4 w-5/6" />
            <AwcSkeletonBar className="h-4 w-2/3" />
          </div>
        </div>
        <aside aria-hidden="true" className={RAIL_CLASS}>
          <h2 className="mb-3 px-3.5 text-[13px] font-semibold text-awc-fg-muted dark:text-gray-400">
            {copy.membersColumnLabel}
          </h2>
          <AwcListRowsSkeleton
            label={copy.membersColumnLabel}
            rows={4}
            variant="avatar"
            className="px-3.5"
          />
        </aside>
      </div>
      <AwcSkeletonStatus />
    </div>
  );
}
