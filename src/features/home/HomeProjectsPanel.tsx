"use client";

import Link from "next/link";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import selectHomeRecentProjects from "@/features/home/utils/selectHomeRecentProjects";
import AwcProjectsPanel from "@/features/projects/AwcProjectsPanel";

/**
 * Signed-in home Projects section. Reuses the /projects panel (same component,
 * same `useUserProjects` data) and shows only the 4 most recently active.
 * Cards link to /projects/[id] via AwcProjectCard; no Edit on home.
 */
export default function HomeProjectsPanel() {
  return (
    <AwcProjectsPanel
      selectProjects={selectHomeRecentProjects}
      showManageControls={false}
      header={
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Your projects</h2>
            <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
              Your 4 most recently active projects. Open a card for details.
            </p>
          </div>
          <Link
            href="/projects"
            className={`shrink-0 text-sm ${APP_SURFACE_TEXT_LINK_CLASS}`}
          >
            View all
          </Link>
        </div>
      }
    />
  );
}
