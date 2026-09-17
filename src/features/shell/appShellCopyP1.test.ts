import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { BOTTOM_NAV } from "@/features/shell/appBottomNav.constant";
import { PRIMARY_NAV } from "@/features/shell/appNav.constant";
import { resolveMarketingFooterProductLinks } from "@/features/marketing/resolveMarketingFooterNav";
import { LOGIN_PAGE_COPY } from "@/features/auth/loginPageCopy.constant";

describe("COPY-P1 shell and auth labels", () => {
  it("uses Projects, Library, Reports, Marketplace, and New task in primary nav", () => {
    const labels = PRIMARY_NAV.map((item) => item.label);
    expect(labels).toContain("Projects");
    expect(labels).toContain("Library");
    expect(labels).toContain("Reports");
    expect(labels).toContain("New task");
    expect(labels).not.toContain("Playbooks");
    expect(labels).not.toContain("Runs");
  });

  it("uses aligned labels in mobile bottom nav", () => {
    const labels = BOTTOM_NAV.map((item) => item.label);
    expect(labels).toEqual([
      "Home",
      "Projects",
      "Library",
      "Marketplace",
      "New task",
      "Reports",
    ]);
  });

  it("uses New task in marketing footer product links", () => {
    const productLinks = resolveMarketingFooterProductLinks(false);
    const sendLink = productLinks.find((link) => link.label === "New task");
    expect(sendLink?.href).toContain("sendTask");
    expect(productLinks.some((link) => link.label === "Send a task")).toBe(
      false,
    );
  });

  it("polishes login page title away from autopilot line", () => {
    expect(LOGIN_PAGE_COPY.title).toBe("Sign in to Agent Witch");
    expect(LOGIN_PAGE_COPY.title.includes("autopilot")).toBe(false);
  });

  it("uses New task aria on app shell header CTA", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/shell/AppShellHeader.tsx"),
      "utf8",
    );
    expect(source.includes('aria-label="New task"')).toBe(true);
    expect(source.includes("Send a task")).toBe(false);
  });
});
