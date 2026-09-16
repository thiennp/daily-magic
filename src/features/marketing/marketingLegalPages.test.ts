import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { FOOTER_LEGAL_LINKS } from "@/features/marketing/resolveMarketingFooterNav";

/** COPY-LEGAL-1 */
describe("marketing legal pages", () => {
  it("defines privacy and terms app routes", () => {
    expect(existsSync(join(process.cwd(), "src/app/privacy/page.tsx"))).toBe(
      true,
    );
    expect(existsSync(join(process.cwd(), "src/app/terms/page.tsx"))).toBe(
      true,
    );
  });

  it("exposes Privacy and Terms in the public marketing footer", () => {
    const footerSource = readFileSync(
      join(process.cwd(), "src/features/marketing/MarketingFooter.tsx"),
      "utf8",
    );
    const legalBarSource = readFileSync(
      join(process.cwd(), "src/features/marketing/MarketingFooterLegalBar.tsx"),
      "utf8",
    );

    expect(FOOTER_LEGAL_LINKS.map((link) => link.href)).toEqual([
      "/privacy",
      "/terms",
    ]);
    expect(footerSource.includes("MarketingFooterLegalBar")).toBe(true);
    expect(legalBarSource.includes("FOOTER_LEGAL_LINKS")).toBe(true);
  });
});
