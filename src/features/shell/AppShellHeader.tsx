"use client";

import Link from "next/link";

import AgentWitchLogoMark from "@/components/branding/AgentWitchLogoMark";
import AppIcon from "@/components/ui/icon/AppIcon";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import UserDropdown from "@/components/header/UserDropdown";
import useStyleguideNavAccess from "@/features/auth/hooks/useStyleguideNavAccess";
import AppShellMobileNavMenu from "@/features/shell/AppShellMobileNavMenu";
import { APP_SHELL_HEADER_NEW_TASK_BUTTON_CLASS } from "@/features/shell/appShellHeaderNewTaskButton.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { BoltIcon } from "@/icons";

interface AppShellHeaderProps {
  readonly showDesktopBrand?: boolean;
}

export default function AppShellHeader({
  showDesktopBrand = false,
}: AppShellHeaderProps) {
  const showStyleguide = useStyleguideNavAccess();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] dark:border-gray-800/80 dark:bg-gray-900/90 dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div
          className={`min-w-0 ${showDesktopBrand ? "flex" : "flex md:hidden"}`}
        >
          <Link
            href="/"
            aria-label="Agent Witch home"
            className="flex min-w-0 items-center gap-2"
          >
            <AgentWitchLogoMark className="h-6 w-6 shrink-0 text-gray-900 dark:text-zinc-100" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-zinc-100">
                {AGENT_WITCH_PRODUCT_NAME}
              </span>
              <span className="text-[10px] font-medium tracking-wide text-gray-500 dark:text-zinc-400">
                AWL {AGENT_WITCH_INSTALL_BUNDLE_VERSION}
              </span>
            </span>
          </Link>
        </div>
        <div
          className={`flex shrink-0 items-center gap-2 sm:gap-3 ${showDesktopBrand ? "" : "ml-auto"}`}
        >
          <Link
            href={buildAgentComposerHref()}
            aria-label="New task"
            title="New task"
            className={`${APP_SHELL_HEADER_NEW_TASK_BUTTON_CLASS} hidden md:inline-flex`}
          >
            <AppIcon icon={BoltIcon} size="xs" />
          </Link>
          <div className="hidden md:block">
            <ThemeToggleButton />
          </div>
          <AppShellMobileNavMenu />
          <UserDropdown showStyleguide={showStyleguide} />
        </div>
      </div>
    </header>
  );
}
