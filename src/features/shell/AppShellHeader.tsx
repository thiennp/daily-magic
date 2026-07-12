"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import UserDropdown from "@/components/header/UserDropdown";
import {
  normalizeAppPathname,
  useAppPath,
} from "@/features/demo/DemoPreviewContext";
import { COMPANY_RULES_NAV_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import AppShellNav from "@/features/shell/AppShellNav";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

interface AppShellHeaderProps {
  readonly sectionTitle?: string;
}

export default function AppShellHeader({ sectionTitle }: AppShellHeaderProps) {
  const pathname = usePathname();
  const appPath = useAppPath();
  const normalizedPath = normalizeAppPathname(pathname);
  const resolvedTitle =
    sectionTitle ??
    (normalizedPath.startsWith("/admin")
      ? COMPANY_RULES_NAV_LABEL
      : normalizedPath.startsWith("/agent") ||
          normalizedPath.startsWith("/ws-test")
        ? "Send a task"
        : normalizedPath.startsWith("/reports")
          ? "Job history"
          : "Home");

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <Link
            href={appPath("/")}
            className="text-xs font-medium uppercase tracking-wide text-brand-500"
          >
            {AGENT_WITCH_PRODUCT_NAME}
          </Link>
          <h1 className="truncate text-xl font-semibold text-gray-800 dark:text-white/90">
            {resolvedTitle}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <AppShellNav />
          <ThemeToggleButton />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
