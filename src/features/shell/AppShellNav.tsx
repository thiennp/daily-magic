"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AgentWitchLogoMark from "@/components/branding/AgentWitchLogoMark";
import {
  APP_SHELL_DESKTOP_NAV_CLASS,
  APP_SHELL_EMBEDDED_NAV_CLASS,
  APP_SHELL_NAV_LINK_ACTIVE_CLASSES,
  APP_SHELL_NAV_LINK_BASE_CLASSES,
  APP_SHELL_NAV_LINK_INACTIVE_CLASSES,
} from "@/features/shell/appShellNavClasses.constant";
import {
  APP_SURFACE_PANEL_CLASS,
  APP_SURFACE_PANEL_PADDING_COMPACT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import { PRIMARY_NAV } from "@/features/shell/appNav.constant";
import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { filterAppNavForShellContext } from "@/lib/shell/filterAppNavForShellContext";

export type AppShellNavPlacement = "sidebar" | "embedded";

interface AppShellNavProps {
  readonly placement?: AppShellNavPlacement;
}

export default function AppShellNav({
  placement = "embedded",
}: AppShellNavProps) {
  const pathname = usePathname();
  const shellNav = useShellNavContext();
  const navItems = filterAppNavForShellContext(PRIMARY_NAV, shellNav);

  const navClassName =
    placement === "sidebar"
      ? APP_SHELL_DESKTOP_NAV_CLASS
      : [
          APP_SURFACE_PANEL_CLASS,
          APP_SURFACE_PANEL_PADDING_COMPACT_CLASS,
          APP_SHELL_EMBEDDED_NAV_CLASS,
        ].join(" ");

  const showBrandInNav = placement === "embedded";

  return (
    <nav aria-label="Primary" className={navClassName}>
      {showBrandInNav ? (
        <Link
          href="/"
          aria-label="Agent Witch home"
          className="flex items-center gap-2 px-1"
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
      ) : null}
      <div className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = item.isActive(pathname);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`${APP_SHELL_NAV_LINK_BASE_CLASSES} ${
                isActive
                  ? APP_SHELL_NAV_LINK_ACTIVE_CLASSES
                  : APP_SHELL_NAV_LINK_INACTIVE_CLASSES
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
