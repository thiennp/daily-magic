"use client";

import Link from "next/link";

import AppHero from "@/components/surfaces/AppHero";
import AppIcon from "@/components/ui/icon/AppIcon";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_LG_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
  APP_SURFACE_TEXT_LINK_MUTED_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { useSendTaskModal } from "@/features/agent/SendTaskModalProvider";
import HomeMacSettingsLink from "@/features/home/HomeMacSettingsLink";
import HomeMacStatusBanner from "@/features/home/HomeMacStatusBanner";
import HomeOpenLocalConsoleWhenOnline from "@/features/home/HomeOpenLocalConsoleWhenOnline";
import HomeRunningJobsPanel from "@/features/home/HomeRunningJobsPanel";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import { COMPANY_RULES_NAV_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import formatGlobalRole from "@/lib/auth/formatGlobalRole";
import type { GlobalRoleValue } from "@/lib/auth/roles";
import { BoltIcon } from "@/icons";

interface HomeDashboardHeroProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
}

export default function HomeDashboardHero({ user }: HomeDashboardHeroProps) {
  const displayName = user.name ?? user.email;
  const { openSendTaskModal } = useSendTaskModal();
  const { teamNavEnabled, showAdminNav } = useShellNavContext();

  return (
    <AppHero variant="neutral">
      <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>Your home</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        Welcome back, {displayName}
      </h1>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Run agents on your Mac from here. Signed in as {user.email} (
        {formatGlobalRole(user.globalRole)}).
      </p>
      <HomeMacStatusBanner />
      <div className="mt-6">
        <button
          type="button"
          onClick={() => {
            openSendTaskModal();
          }}
          className={`${APP_SURFACE_CTA_PRIMARY_LG_CLASS} gap-2`}
        >
          <AppIcon icon={BoltIcon} size="lg" />
          New task
        </button>
        <HomeOpenLocalConsoleWhenOnline />
        <HomeRunningJobsPanel />
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Link
            href={buildAgentComposerHref({ customTask: true })}
            className={APP_SURFACE_TEXT_LINK_CLASS}
          >
            Open task composer →
          </Link>
          <Link href="/library" className={APP_SURFACE_TEXT_LINK_CLASS}>
            Playbooks →
          </Link>
          <Link href="/reports" className={APP_SURFACE_TEXT_LINK_MUTED_CLASS}>
            Runs →
          </Link>
          <HomeMacSettingsLink />
          {teamNavEnabled ? (
            <Link
              href="/automations"
              className={APP_SURFACE_TEXT_LINK_MUTED_CLASS}
            >
              Automations →
            </Link>
          ) : null}
          {showAdminNav ? (
            <Link
              href="/admin/groups"
              className={APP_SURFACE_TEXT_LINK_MUTED_CLASS}
            >
              {COMPANY_RULES_NAV_LABEL} →
            </Link>
          ) : null}
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Having trouble? Expand <strong>Your setup</strong> below or open Mac
          settings.
        </p>
      </div>
    </AppHero>
  );
}
