import { describe, expect, it } from "vitest";

import {
  FOOTER_ADMIN_LINKS,
  FOOTER_LEGAL_LINKS,
  resolveMarketingFooterProductLinks,
  shouldShowMarketingFooterAdmin,
} from "@/features/marketing/resolveMarketingFooterNav";

describe("resolveMarketingFooterNav (UX-P0c)", () => {
  it("omits Styleguide from product links for anonymous visitors", () => {
    const links = resolveMarketingFooterProductLinks(false);
    const labels = links.map((link) => link.label);

    expect(labels).toContain("Real examples");
    expect(labels).not.toContain("Styleguide");
  });

  it("includes Styleguide for staff", () => {
    const links = resolveMarketingFooterProductLinks(true);
    const labels = links.map((link) => link.label);

    expect(labels).toContain("Styleguide");
  });

  it("hides admin column for anonymous visitors", () => {
    expect(shouldShowMarketingFooterAdmin(false)).toBe(false);
    expect(FOOTER_ADMIN_LINKS.map((link) => link.label)).toEqual([
      "Companies",
      "Users",
    ]);
  });

  it("shows admin column for staff", () => {
    expect(shouldShowMarketingFooterAdmin(true)).toBe(true);
  });

  it("exposes Privacy and Terms for all visitors", () => {
    expect(FOOTER_LEGAL_LINKS.map((link) => link.href)).toEqual([
      "/privacy",
      "/terms",
    ]);
  });
});
