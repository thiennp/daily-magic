"use client";

import { APP_SURFACE_CTA_PRIMARY_LG_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectThisMacButton from "@/features/home/ConnectThisMacButton";
import HomeMacSettingsLink from "@/features/home/HomeMacSettingsLink";
import HomeMacStatusBanner from "@/features/home/HomeMacStatusBanner";
import useShouldShowConnectThisMac from "@/features/home/hooks/useShouldShowConnectThisMac";
import HomeRunningJobsPanel from "@/features/home/HomeRunningJobsPanel";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface HomeDashboardHeroProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

/**
 * Post-greeting actions + status (design keeps title in HomePageHead).
 * Preserves Connect this computer, settings link, running jobs.
 */
export default function HomeDashboardHero({
  installCommand,
  isWebSocketSupported,
  host,
}: HomeDashboardHeroProps) {
  const shouldShowConnectThisMac = useShouldShowConnectThisMac();

  return (
    <section aria-label="Home actions" className="space-y-4">
      <HomeMacStatusBanner
        shouldShowConnectThisMac={shouldShowConnectThisMac}
      />
      <div className="flex flex-wrap items-center gap-3">
        {shouldShowConnectThisMac ? (
          <ConnectThisMacButton
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
            className={APP_SURFACE_CTA_PRIMARY_LG_CLASS}
          />
        ) : null}
        <HomeMacSettingsLink />
      </div>
      <HomeRunningJobsPanel />
    </section>
  );
}
