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
    navItem("/marketplace", "Team playbooks"),
    navItem("/automations", "Automations"),
    navItem("/admin/groups", "Admin"),
  ];

  it("hides team and admin items for solo users", () => {
    const filtered = filterAppNavForShellContext(items, {
      teamNavEnabled: false,
      showAdminNav: false,
    });

    expect(filtered.map((item) => item.href)).toEqual(["/"]);
  });

  it("shows team items when the user has group membership", () => {
    const filtered = filterAppNavForShellContext(items, {
      teamNavEnabled: true,
      showAdminNav: false,
    });

    expect(filtered.map((item) => item.href)).toEqual([
      "/",
      "/marketplace",
      "/automations",
    ]);
  });
});
