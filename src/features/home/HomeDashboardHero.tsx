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
import { COMPANY_RULES_NAV_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import formatGlobalRole from "@/lib/auth/formatGlobalRole";
import type { GlobalRoleValue } from "@/lib/auth/roles";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
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

  return (
    <AppHero variant="neutral">
      <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>Your home</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        Welcome back, {displayName}
      </h1>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Start agent tasks here and review results when they finish. Signed in as{" "}
        {user.email} ({formatGlobalRole(user.globalRole)}).
      </p>
      <div className="mt-6">
        <Link
          href={buildAgentComposerHref()}
          className={`${APP_SURFACE_CTA_PRIMARY_LG_CLASS} gap-2`}
        >
          <AppIcon icon={BoltIcon} size="lg" />
          Start
        </Link>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/library" className={APP_SURFACE_TEXT_LINK_CLASS}>
            Browse library →
          </Link>
          <Link href="/automations" className={APP_SURFACE_TEXT_LINK_CLASS}>
            Automations →
          </Link>
          <Link href="/reports" className={APP_SURFACE_TEXT_LINK_MUTED_CLASS}>
            View job history →
          </Link>
          <Link
            href="/admin/groups"
            className={APP_SURFACE_TEXT_LINK_MUTED_CLASS}
          >
            {COMPANY_RULES_NAV_LABEL}
          </Link>
        </div>
      </div>
    </AppHero>
  );
}
