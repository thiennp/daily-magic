"use client";

import { useState } from "react";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import HomeMarketingShowcases from "@/features/home/HomeMarketingShowcases";
import { APP_SURFACE_CTA_SECONDARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

/**
 * The full showcase section is five sections of onboarding/marketing story
 * cards — useful on a first visit, but it buries the actual dashboard for a
 * returning user with a Mac already paired. Collapse it by default once the
 * user has connected at least one Mac. A manual toggle reopens it.
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
      <div>
        {hasDevices ? (
          <p className="mt-16 text-center">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className={APP_SURFACE_CTA_SECONDARY_CLASS}
            >
              Hide onboarding examples
            </button>
          </p>
        ) : null}
        <HomeMarketingShowcases />
      </div>
    );
  }

  return (
    <div className="mt-16 flex flex-col items-center gap-2 text-center">
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        New to AI agents?
      </p>
      <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">
        See short stories with real product screens — presets, automations, Mac
        setup, and team workflows.
      </p>
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className={APP_SURFACE_CTA_SECONDARY_CLASS}
      >
        Show onboarding examples
      </button>
    </div>
  );
}
