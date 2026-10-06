import { describe, expect, it } from "vitest";

import type AppNavItem from "@/lib/shell/AppNavItem.type";
import { filterAppNavForShellContext } from "@/lib/shell/filterAppNavForShellContext";

const navItem = (href: string, label: string): AppNavItem => ({
  href,
  label,
  isActive: () => false,
});

describe("filterAppNavForShellContext", () => {
  const items = [
    navItem("/", "Home"),
    navItem("/marketplace", "Marketplace"),
    navItem("/automations", "Automations"),
    navItem("/admin/groups", "Admin"),
  ];

  it("keeps Marketplace and Automations for solo users; hides admin only", () => {
    const filtered = filterAppNavForShellContext(items, {
      teamNavEnabled: false,
      showAdminNav: false,
    });

    expect(filtered.map((item) => item.href)).toEqual([
      "/",
      "/marketplace",
      "/automations",
    ]);
  });

  it("shows admin when allowed", () => {
    const filtered = filterAppNavForShellContext(items, {
      teamNavEnabled: true,
      showAdminNav: true,
    });

    expect(filtered.map((item) => item.href)).toEqual([
      "/",
      "/marketplace",
      "/automations",
      "/admin/groups",
    ]);
  });
});
