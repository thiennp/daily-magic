"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import HomeDashboardSkeleton from "@/features/home/HomeDashboardSkeleton";
import AppShell from "@/features/shell/AppShell";
import AwcPageSkeleton from "@/features/shell/loading/AwcPageSkeleton";

/** Signed-in shell routes without their own loading.tsx → generic page skeleton. */
const SHELL_ROUTE_PREFIXES = [
  "/prompt-optimizer",
  "/marketplace",
  "/automations",
  "/notifications",
  "/account",
] as const;

/**
 * DF-016 `(app)/loading.tsx` body. Home ("/") gets the dashboard skeleton;
 * known shell routes get a generic page skeleton. Signed-out visitors
 * (marketing landing, /login, legal pages) get a plain sand canvas so no
 * app chrome flashes before a non-shell page.
 */
export default function AwcAppRouteLoading() {
  const { status } = useSession();
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const isShellRoute = SHELL_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  if (status !== "authenticated" || (!isHome && !isShellRoute)) {
    return (
      <div
        className="min-h-screen bg-awc-bg dark:bg-gray-900"
        aria-busy="true"
      />
    );
  }
  return (
    <AppShell>{isHome ? <HomeDashboardSkeleton /> : <AwcPageSkeleton />}</AppShell>
  );
}
