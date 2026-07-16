"use client";

import Link from "next/link";

import AgentWitchLogo from "@/components/branding/AgentWitchLogo";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import UserDropdown from "@/components/header/UserDropdown";
import SendTaskComposerPlayIcon from "@/features/agent/SendTaskComposerPlayIcon";
import useStyleguideNavAccess from "@/features/auth/hooks/useStyleguideNavAccess";
import AppShellNav from "@/features/shell/AppShellNav";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export default function AppShellHeader() {
  const showStyleguide = useStyleguideNavAccess();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-800/95">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <Link href="/" aria-label="Agent Witch home">
            <AgentWitchLogo
              markClassName="h-6 w-6 text-zinc-900 dark:text-zinc-100"
              textClassName="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
            />
          </Link>
        </div>
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <AppShellNav />
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={buildAgentComposerHref()}
              aria-label="Send a task"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-theme-xs transition-colors hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              <SendTaskComposerPlayIcon className="h-5 w-5" />
            </Link>
            <ThemeToggleButton />
            <UserDropdown showStyleguide={showStyleguide} />
          </div>
        </div>
      </div>
    </header>
  );
}
