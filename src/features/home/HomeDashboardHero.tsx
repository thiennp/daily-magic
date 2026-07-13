"use client";

import Link from "next/link";

import AppHero from "@/components/surfaces/AppHero";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
  APP_SURFACE_TEXT_LINK_MUTED_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { useAppPath } from "@/features/demo/DemoPreviewContext";
import { COMPANY_RULES_NAV_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import formatGlobalRole from "@/lib/auth/formatGlobalRole";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface HomeDashboardHeroProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
}

export default function HomeDashboardHero({ user }: HomeDashboardHeroProps) {
  const displayName = user.name ?? user.email;
  const appPath = useAppPath();

  return (
    <AppHero variant="neutral">
      <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>Your home</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        Welcome back, {displayName}
      </h1>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Send tasks from your browser, share setup files with teammates who are
        online, and read what happened in Reports. Signed in as {user.email} (
        {formatGlobalRole(user.globalRole)}).
      </p>
      <div className="mt-6">
        <Link
          href={appPath("/agent")}
          className={APP_SURFACE_CTA_PRIMARY_CLASS}
        >
          Send a task
        </Link>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link
            href={appPath("/marketplace")}
            className={APP_SURFACE_TEXT_LINK_CLASS}
          >
            Browse marketplace →
          </Link>
          <Link
            href={appPath("/reports")}
            className={APP_SURFACE_TEXT_LINK_MUTED_CLASS}
          >
            View job history →
          </Link>
          <Link
            href={appPath("/admin/groups")}
            className={APP_SURFACE_TEXT_LINK_MUTED_CLASS}
          >
            {COMPANY_RULES_NAV_LABEL}
          </Link>
        </div>
      </div>
    </AppHero>
  );
}
