"use client";

import Link from "next/link";

import AgentWitchLogo from "@/components/branding/AgentWitchLogo";
import { APP_SURFACE_CTA_PRIMARY_ICON_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import AppIcon from "@/components/ui/icon/AppIcon";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import UserDropdown from "@/components/header/UserDropdown";
import useStyleguideNavAccess from "@/features/auth/hooks/useStyleguideNavAccess";
import AgentWitchServerReleaseBadge from "@/features/agent-witch/components/AgentWitchServerReleaseBadge";
import AppShellNav from "@/features/shell/AppShellNav";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { BoltIcon } from "@/icons";

export default function AppShellHeader() {
  const showStyleguide = useStyleguideNavAccess();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] dark:border-gray-800/80 dark:bg-gray-900/90 dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <Link href="/" aria-label="Agent Witch home">
            <AgentWitchLogo
              markClassName="h-6 w-6 text-gray-900 dark:text-zinc-100"
              textClassName="text-sm font-bold tracking-tight text-gray-900 dark:text-zinc-100"
            />
          </Link>
        </div>
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <AppShellNav />
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={buildAgentComposerHref()}
              aria-label="New task"
              title="New task"
              className={APP_SURFACE_CTA_PRIMARY_ICON_CLASS}
            >
              <AppIcon icon={BoltIcon} size="md" />
            </Link>
            <AgentWitchServerReleaseBadge />
            <ThemeToggleButton />
            <UserDropdown showStyleguide={showStyleguide} />
          </div>
        </div>
      </div>
    </header>
  );
}
