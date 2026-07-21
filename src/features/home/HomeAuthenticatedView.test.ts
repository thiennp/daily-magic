import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("HomeAuthenticatedView showcases", () => {
  it("includes marketing showcase articles like the guest landing", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeAuthenticatedView.tsx",
      ),
      "utf8",
    );

    expect(source).toContain('from "@/features/home/HomeMarketingShowcases"');
    expect(source).toContain("<HomeMarketingShowcases");
  });

  it("HOME-048: shows projects panel in the dashboard main column", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeAuthenticatedView.tsx",
      ),
      "utf8",
    );

    expect(source).toContain('from "@/features/home/HomeProjectsPanel"');
    expect(source).toMatch(/HOME_MAIN_COLUMN_CLASS[\s\S]*<HomeProjectsPanel/);
  });

  it("HOME-023: keeps showcases in the main center column, not full shell width", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeAuthenticatedView.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("HOME_DASHBOARD_GRID_CLASS");
    expect(source).toContain("HOME_MAIN_COLUMN_CLASS");
    expect(source).toMatch(
      /HOME_DASHBOARD_GRID_CLASS[\s\S]*HOME_MAIN_COLUMN_CLASS[\s\S]*HomeMarketingShowcases/,
    );
  });
});
