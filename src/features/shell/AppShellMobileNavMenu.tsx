"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState } from "react";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import AppIcon from "@/components/ui/icon/AppIcon";
import { useTheme } from "@/context/ThemeContext";
import { BOTTOM_NAV } from "@/features/shell/appBottomNav.constant";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import AppShellBrand from "@/features/shell/v5/AppShellBrand";
import { APP_SHELL_V5_FONT_CLASS } from "@/features/shell/v5/appShellV5Classes.constant";
import { ListIcon } from "@/icons";
import { filterAppNavForShellContext } from "@/lib/shell/filterAppNavForShellContext";

/**
 * Mobile primary destinations + theme (replaces fixed bottom nav + header
 * New-task/theme chrome). Shown only below `md`, next to the account menu.
 */
export default function AppShellMobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const shellNav = useShellNavContext();
  const navItems = filterAppNavForShellContext(BOTTOM_NAV, shellNav);
  const { theme, toggleTheme } = useTheme();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  return (
    <div className="relative shrink-0 md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-label="Menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        className="dropdown-toggle inline-flex h-11 w-11 items-center justify-center rounded-full border border-awc-border bg-white text-awc-fg-muted transition-colors hover:bg-awc-tile hover:text-awc-fg dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <AppIcon icon={ListIcon} size="md" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeMenu}
        toggleRef={toggleRef}
        className={`w-56 py-1 ${APP_SHELL_V5_FONT_CLASS} dark:bg-gray-dark`}
      >
        {/* I19: drawer carries logo + wordmark, not an unlabeled list. */}
        <div className="border-b border-awc-border px-4 pb-2.5 pt-2 dark:border-gray-800">
          <AppShellBrand />
        </div>
        <ul id={menuId} role="menu" aria-label="Menu">
          {navItems.map((item) => {
            const isActive = item.isActive(pathname);

            return (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                  className={`block w-full px-4 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-awc-accent-soft text-awc-blue-700 dark:bg-brand-500/10 dark:text-brand-300"
                      : "text-awc-fg-muted hover:bg-awc-tile dark:text-gray-300 dark:hover:bg-white/5"
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="block w-full px-4 py-2.5 text-left text-sm font-medium text-awc-fg hover:bg-awc-tile dark:text-gray-300 dark:hover:bg-white/5"
              onClick={() => {
                toggleTheme();
                closeMenu();
              }}
            >
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}
