"use client";

import Link from "next/link";

import AppIcon from "@/components/ui/icon/AppIcon";
import {
  APP_SURFACE_CTA_PRIMARY_LG_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { buildNavConsolidationNewTaskHref } from "@/lib/shell/buildNavConsolidationNewTaskHref";
import ConnectThisMacButton from "@/features/home/ConnectThisMacButton";
import HomeMacSettingsLink from "@/features/home/HomeMacSettingsLink";
import HomeMacStatusBanner from "@/features/home/HomeMacStatusBanner";
import useShouldShowConnectThisMac from "@/features/home/hooks/useShouldShowConnectThisMac";
import HomeRunningJobsPanel from "@/features/home/HomeRunningJobsPanel";
import type { GlobalRoleValue } from "@/lib/auth/roles";
import { BoltIcon } from "@/icons";

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
 * Preserves Connect this computer, New task, settings link, running jobs.
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
        <Link
          href={buildNavConsolidationNewTaskHref()}
          className={
            shouldShowConnectThisMac
              ? APP_SURFACE_CTA_SECONDARY_CLASS
              : `${APP_SURFACE_CTA_PRIMARY_LG_CLASS} gap-2`
          }
        >
          {shouldShowConnectThisMac ? null : (
            <AppIcon icon={BoltIcon} size="lg" />
          )}
          New task
        </Link>
        <HomeMacSettingsLink />
      </div>
      <HomeRunningJobsPanel />
    </section>
  );
}
