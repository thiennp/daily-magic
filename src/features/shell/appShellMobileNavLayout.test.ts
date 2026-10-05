import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { BOTTOM_NAV } from "@/features/shell/appBottomNav.constant";

describe("AppShell mobile nav layout (SHELL-005)", () => {
  it("relocates mobile destinations into a header Menu next to account", () => {
    const header = readFileSync(
      join(process.cwd(), "src/features/shell/AppShellHeader.tsx"),
      "utf8",
    );
    const shell = readFileSync(
      join(process.cwd(), "src/features/shell/AppShell.tsx"),
      "utf8",
    );
    const menu = readFileSync(
      join(process.cwd(), "src/features/shell/AppShellMobileNavMenu.tsx"),
      "utf8",
    );

    expect(header).toContain("AppShellMobileNavMenu");
    expect(header).toContain("UserDropdown");
    expect(header).toMatch(
      /AppShellMobileNavMenu[\s\S]*UserDropdown|UserDropdown[\s\S]*AppShellMobileNavMenu/,
    );
    expect(header).toMatch(
      /New task[\s\S]*hidden md:inline-flex|hidden md:inline-flex[\s\S]*New task/,
    );
    expect(header).toMatch(/ThemeToggleButton[\s\S]*hidden md:block|hidden md:block[\s\S]*ThemeToggleButton/);
    expect(menu).toContain("md:hidden");
    expect(menu).toContain('aria-label="Menu"');
    expect(menu).toContain("BOTTOM_NAV");
    expect(menu).toContain("toggleTheme");
    expect(shell).not.toContain("AppShellBottomNav");
    expect(shell).not.toMatch(/pb-16|pb-24/);
  });

  it("keeps BOTTOM_NAV destination labels for the mobile Menu", () => {
    expect(BOTTOM_NAV.map((item) => item.label)).toEqual([
      "Home",
      "Projects",
      "Library",
      "Marketplace",
      "New task",
      "Reports",
      "Prompt optimizer",
    ]);
  });
});
