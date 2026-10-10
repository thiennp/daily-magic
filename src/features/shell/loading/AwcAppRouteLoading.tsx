"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import HomeDashboardSkeleton from "@/features/home/HomeDashboardSkeleton";
import { AwcProjectDetailSkeleton } from "@/features/projects/public-api/presentation";
import { AwcProjectsListSkeleton } from "@/features/projects/public-api/presentation";
import AppShell from "@/features/shell/AppShell";
import { APP_SHELL_NARROW_CONTENT_CLASS } from "@/features/shell/appShellContentWidth.constant";
import AwcPageSkeleton from "@/features/shell/loading/AwcPageSkeleton";
import { resolveAwcRouteSkeleton } from "@/features/shell/loading/resolveAwcRouteSkeleton";

/**
 * DF-016 body for every `loading.tsx` under `(app)`. Skeleton follows the
 * target pathname (see resolveAwcRouteSkeleton). Signed-out visitors and
 * non-shell routes (marketing landing, /login, legal) get a plain sand
 * canvas so no app chrome flashes before a non-shell page.
 *
 * In-project tab switches use `history.replaceState` (hash only) and rail
 * actions use fetch + local state, so neither hits this boundary.
 */
export default function AwcAppRouteLoading() {
  const { status } = useSession();
  const kind = resolveAwcRouteSkeleton(usePathname() ?? "/");
  if (status !== "authenticated" || kind === "none") {
    return (
      <div
        className="min-h-screen bg-awc-bg dark:bg-gray-900"
        aria-busy="true"
      />
    );
  }
  if (kind === "projects") {
    return (
      <AppShell contentClassName={APP_SHELL_NARROW_CONTENT_CLASS}>
        <AwcProjectsListSkeleton />
      </AppShell>
    );
  }
  return (
    <AppShell>
      {kind === "home" ? <HomeDashboardSkeleton /> : null}
      {kind === "project" ? <AwcProjectDetailSkeleton /> : null}
      {kind === "page" ? <AwcPageSkeleton /> : null}
    </AppShell>
  );
}
