import { Suspense } from "react";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import AwcProjectsPanel from "@/features/projects/AwcProjectsPanel";
import {
  PROJECTS_V5_MUTED_TEXT_CLASS,
  PROJECTS_V5_PAGE_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";

export default function ProjectsPageLayout() {
  return (
    <div className={PROJECTS_V5_PAGE_CLASS}>
      <AppPageHeader
        title="Projects"
        description="Cloud registry for membership and activity. Edit repos and composition in AgentWitch Local on your computer."
      />
      <Suspense
        fallback={
          <p className={PROJECTS_V5_MUTED_TEXT_CLASS}>
            Loading projects…
          </p>
        }
      >
        <AwcProjectsPanel />
      </Suspense>
    </div>
  );
}
