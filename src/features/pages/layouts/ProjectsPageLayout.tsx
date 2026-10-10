import { Suspense } from "react";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import { AWC_PROJECTS_PAGE_COPY } from "@/features/projects/public-api/types";
import { AwcProjectsPanel } from "@/features/projects/public-api/presentation";
import {
  PROJECTS_V5_MUTED_TEXT_CLASS,
  PROJECTS_V5_PAGE_CLASS,
} from "@/features/projects/public-api/types";

export default function ProjectsPageLayout() {
  return (
    <div className={PROJECTS_V5_PAGE_CLASS}>
      <AppPageHeader
        title="Projects"
        description={AWC_PROJECTS_PAGE_COPY.pageDescription}
      />
      <Suspense
        fallback={
          <p className={PROJECTS_V5_MUTED_TEXT_CLASS}>
            {AWC_PROJECTS_PAGE_COPY.loading}
          </p>
        }
      >
        <AwcProjectsPanel />
      </Suspense>
    </div>
  );
}
