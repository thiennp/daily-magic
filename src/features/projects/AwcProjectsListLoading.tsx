import { AWC_PROJECTS_PAGE_COPY } from "@/features/projects/awcProjectsPageCopy.constant";
import AwcSkeletonBar from "@/features/shell/loading/AwcSkeletonBar";

/** Six skeleton cards while the list loads (design: busy region + sr status). */
export default function AwcProjectsListLoading() {
  return (
    <div aria-busy="true">
      <p role="status" className="sr-only">
        {AWC_PROJECTS_PAGE_COPY.loading}
      </p>
      <ul
        aria-hidden="true"
        className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
        data-skeleton="projects-list"
      >
        {[0, 1, 2, 3, 4, 5].map((card) => (
          <li
            key={card}
            className="min-w-0 space-y-3 rounded-awc-card border border-awc-border/80 p-4 dark:border-gray-800"
          >
            <AwcSkeletonBar className="h-5 w-1/2" />
            <AwcSkeletonBar className="h-3.5 w-5/6" />
            <AwcSkeletonBar className="h-3.5 w-1/2" />
            <AwcSkeletonBar className="mt-2 h-3.5 w-3/4" />
          </li>
        ))}
      </ul>
    </div>
  );
}
