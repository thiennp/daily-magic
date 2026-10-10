"use client";

import Link from "next/link";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import UserDropdown from "@/components/header/UserDropdown";
import { clearProjectSyncOnSignOut } from "@/features/projects/sync/public-api/presentation";
import useStyleguideNavAccess from "@/features/auth/hooks/useStyleguideNavAccess";
import AppShellMobileNavMenu from "@/features/shell/AppShellMobileNavMenu";
import { AppShellBrand } from "@/features/shell/v5/public-api/presentation";
import { APP_SHELL_V5_TOPBAR_CLASS } from "@/features/shell/v5/public-api/types";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

interface AppShellHeaderProps {
  readonly showDesktopBrand?: boolean;
}

/** V5-2 topbar: white bar + hairline, logo + wordmark, no build/version pill. */
export default function AppShellHeader({
  showDesktopBrand = false,
}: AppShellHeaderProps) {
  const showStyleguide = useStyleguideNavAccess();

  return (
    <header className={APP_SHELL_V5_TOPBAR_CLASS}>
      <div className="mx-auto flex h-[var(--awc-top-h)] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
        <div
          className={`min-w-0 ${showDesktopBrand ? "flex" : "flex md:hidden"}`}
        >
          <Link
            href="/"
            aria-label={`${AGENT_WITCH_PRODUCT_NAME} home`}
            className="awc-focus-ring flex min-w-0 items-center rounded-awc-chip"
          >
            <AppShellBrand />
          </Link>
        </div>
        <div
          className={`flex shrink-0 items-center gap-2 sm:gap-3 ${showDesktopBrand ? "" : "ml-auto"}`}
        >
          <div className="hidden md:block">
            <ThemeToggleButton />
          </div>
          <AppShellMobileNavMenu />
          <UserDropdown
            showStyleguide={showStyleguide}
            onBeforeSignOut={clearProjectSyncOnSignOut}
          />
        </div>
      </div>
    </header>
  );
}
