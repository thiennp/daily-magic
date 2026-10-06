"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

/**
 * Design "Needs your attention" card. Live cross-project feed is soft-deferred;
 * empty state matches design copy so the slot stays visible on Home.
 */
export default function HomeAttentionPanel() {
  return (
    <AppPanel as="section" aria-labelledby="home-attention-heading">
      <div className="flex items-start justify-between gap-3">
        <h2 id="home-attention-heading" className={APP_SURFACE_SECTION_TITLE_CLASS}>
          Needs your attention
        </h2>
      </div>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Nothing needs you right now.
      </p>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Bots waiting for confirmation, runs waiting for approval, and failed
        runs across all projects appear here.
      </p>
    </AppPanel>
  );
}
