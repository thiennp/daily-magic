import { Suspense } from "react";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import AwcProjectsPanel from "@/features/projects/AwcProjectsPanel";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function ProjectsPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title="Projects"
        description="Cloud registry for membership and activity. Edit repos and composition in Agent Witch Local on your Mac."
      />
      <Suspense
        fallback={
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading projects…
          </p>
        }
      >
        <AwcProjectsPanel />
      </Suspense>
    </div>
  );
}
