"use client";

import Link from "next/link";

import {
  APP_SURFACE_SECTION_TITLE_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import HomeNewProjectButton from "@/features/home/HomeNewProjectButton";
import { selectHomeRecentProjects } from "@/features/home/utils/public-api/presentation";
import { AwcProjectsPanel } from "@/features/projects/public-api/presentation";

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
        <div className="flex items-center justify-between gap-3">
          <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Your projects</h2>
          <div className="flex shrink-0 items-center gap-3">
            <HomeNewProjectButton />
            <Link
              href="/projects"
              className={`text-sm ${APP_SURFACE_TEXT_LINK_CLASS}`}
            >
              All projects
            </Link>
          </div>
        </div>
      }
    />
  );
}
