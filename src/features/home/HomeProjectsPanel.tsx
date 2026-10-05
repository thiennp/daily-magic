"use client";

import Link from "next/link";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import selectHomeRecentProjects from "@/features/home/utils/selectHomeRecentProjects";
import AwcProjectsPanel from "@/features/projects/AwcProjectsPanel";

/**
 * Signed-in home Projects section. Reuses the /projects panel (same component,
 * same `useUserProjects` data) and shows only the 3 most recently active.
 */
export default function HomeProjectsPanel() {
  return (
    <AwcProjectsPanel
      selectProjects={selectHomeRecentProjects}
      showManageControls={false}
      header={
        <>
          <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Your projects</h2>
          <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
            Your 3 most recently active projects. See all on the{" "}
            <Link
              href="/projects"
              className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              Projects
            </Link>{" "}
            page.
          </p>
        </>
      }
    />
  );
}
