import Link from "next/link";

import { PROJECT_V5_BREADCRUMB_CLASS } from "@/features/projects/projectPageV5ChromeClasses.constant";
import { PROJECT_PAGE_V5_CHROME_COPY as C } from "@/features/projects/projectPageV5ChromeCopy.constant";

/** V5-3 breadcrumb: All projects › {project name}. */
export default function AwcProjectBreadcrumb({
  projectName,
}: {
  readonly projectName: string;
}) {
  return (
    <nav aria-label={C["header.breadcrumbAria"]} className="min-w-0">
      <ol className={PROJECT_V5_BREADCRUMB_CLASS}>
        <li className="shrink-0">
          <Link
            href="/projects"
            className="awc-focus-ring rounded-awc-chip-sm hover:text-awc-fg hover:underline dark:hover:text-white"
          >
            {C["header.breadcrumbAllProjects"]}
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0">
          ›
        </li>
        <li aria-current="page" className="min-w-0 truncate text-awc-fg dark:text-gray-200">
          {projectName}
        </li>
      </ol>
    </nav>
  );
}
