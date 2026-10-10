import AppPageHeader from "@/components/surfaces/AppPageHeader";
import { AWC_PROJECTS_PAGE_COPY } from "@/features/projects/awcProjectsPageCopy.constant";
import AppPanel from "@/components/surfaces/AppPanel";
import {
  PROJECTS_V5_PAGE_CLASS,
  PROJECTS_V5_PANEL_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";
import { AwcSkeletonBar } from "@/features/shell/loading/public-api/presentation";
import { AwcSkeletonStatus } from "@/features/shell/loading/public-api/presentation";

/**
 * DF-016 route skeleton for /projects — same page header + panel as
 * ProjectsPageLayout, with the 2-col card grid of AwcProjectsListBody.
 */
export default function AwcProjectsListSkeleton() {
  return (
    <div className={PROJECTS_V5_PAGE_CLASS} aria-busy="true">
      <AppPageHeader
        title="Projects"
        description={AWC_PROJECTS_PAGE_COPY.pageDescription}
      />
      <AppPanel embedded className={PROJECTS_V5_PANEL_CLASS}>
        <AwcSkeletonBar className="h-9 w-full rounded-lg" />
        <ul
          aria-hidden="true"
          className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
          data-skeleton="projects-list"
        >
          {[0, 1, 2, 3].map((card) => (
            <li
              key={card}
              className="min-w-0 space-y-3 rounded-xl border border-awc-border/80 p-4 dark:border-gray-800"
            >
              <AwcSkeletonBar className="h-5 w-2/3" />
              <AwcSkeletonBar className="h-3.5 w-1/2" />
              <div className="flex gap-2 pt-1">
                <AwcSkeletonBar accent className="h-5 w-20 rounded-full" />
                <AwcSkeletonBar className="h-5 w-14 rounded-full" />
              </div>
            </li>
          ))}
        </ul>
      </AppPanel>
      <AwcSkeletonStatus label="Loading projects…" />
    </div>
  );
}
