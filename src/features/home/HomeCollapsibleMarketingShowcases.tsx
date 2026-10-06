"use client";

import { useState } from "react";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import HomeMarketingShowcases from "@/features/home/HomeMarketingShowcases";
import {
  APP_SURFACE_CTA_SECONDARY_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

/**
 * Design "What you can do" — collapsed by default once a computer is paired.
 */
export default function HomeCollapsibleMarketingShowcases() {
  const { devices, isLoading } = useMyMacDevices();
  const hasDevices = devices.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return null;
  }

  if (!hasDevices || isExpanded) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>What you can do</h2>
          {hasDevices ? (
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className={APP_SURFACE_CTA_SECONDARY_CLASS}
            >
              Hide
            </button>
          ) : null}
        </div>
        <HomeMarketingShowcases />
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-2">
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>What you can do</h2>
      <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">
        Short stories with real product screens — presets, automations, this
        computer setup, and team workflows.
      </p>
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className={`self-start ${APP_SURFACE_CTA_SECONDARY_CLASS}`}
      >
        Show
      </button>
    </div>
  );
}
