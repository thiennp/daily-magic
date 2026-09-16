import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const SEND_TASK_MODAL_CHROME_PATH = join(
  process.cwd(),
  "src/features/agent/SendTaskModalChrome.tsx",
);
const MARKETING_HEADER_NAV_PATH = join(
  process.cwd(),
  "src/features/marketing/MarketingHeaderNav.tsx",
);
const HOME_MARKETING_COPY_PATH = join(
  process.cwd(),
  "src/features/home/constants/homeMarketingLandingCopy.constant.ts",
);
const APP_BOTTOM_NAV_PATH = join(
  process.cwd(),
  "src/features/shell/appBottomNav.constant.ts",
);
const REPORTS_LIST_PATH = join(
  process.cwd(),
  "src/features/reports/AgentRunsList.tsx",
);
const SOLO_SURFACE_COPY_PATH = join(
  process.cwd(),
  "src/lib/copy/resolveSoloTeamSurfaceCopy.ts",
);
const SHOWCASE_ARTICLES_DIR = join(
  process.cwd(),
  "src/features/showcases/articles",
);
const PUBLIC_SHOWCASES_DIR = join(process.cwd(), "public/showcases");

/** Magi COPY-P1 — New task + Create free account vocab lock. */
describe("COPY-P1 product vocab", () => {
  it("New task modal chrome uses Magi title and close aria", () => {
    const source = readFileSync(SEND_TASK_MODAL_CHROME_PATH, "utf8");

    expect(source).toContain("New task");
    expect(source).toContain('aria-label="Close New task dialog"');
    expect(source).not.toContain("Send a task");
  });

  it("marketing header primary signup is Create free account", () => {
    const source = readFileSync(MARKETING_HEADER_NAV_PATH, "utf8");

    expect(source).toContain("Create free account");
    expect(source).not.toMatch(/>\s*Get started\s*</);
  });

  it("home marketing hero CTA is Create free account", () => {
    const source = readFileSync(HOME_MARKETING_COPY_PATH, "utf8");

    expect(source).toContain('cta: "Create free account"');
    expect(source).toContain('register: "Create free account"');
    expect(source).toContain('title: "Create free account"');
    expect(source).not.toContain("Create your free account");
    expect(source).not.toContain("Create a free account");
  });

  it("mobile bottom nav uses New task label", () => {
    const source = readFileSync(APP_BOTTOM_NAV_PATH, "utf8");

    expect(source).toContain('label: "New task"');
    expect(source).not.toContain('label: "Send"');
  });

  it("Reports empty states use New task not Send a task (Rity)", () => {
    const reportsList = readFileSync(REPORTS_LIST_PATH, "utf8");
    const soloCopy = readFileSync(SOLO_SURFACE_COPY_PATH, "utf8");

    expect(reportsList).toContain("New task");
    expect(reportsList).not.toMatch(/Send a task/i);
    expect(soloCopy).toContain("New task");
    expect(soloCopy).not.toMatch(/Send a task/i);
  });

  it("showcase article assets do not use Send a task user-visible copy", () => {
    const articleSources = readdirSync(SHOWCASE_ARTICLES_DIR)
      .filter((name) => name.endsWith(".ts"))
      .map((name) => readFileSync(join(SHOWCASE_ARTICLES_DIR, name), "utf8"));

    for (const source of articleSources) {
      expect(source).not.toMatch(/Send a task/i);
    }

    const collectSvg = (dir: string): string[] => {
      const entries = readdirSync(dir, { withFileTypes: true });
      return entries.flatMap((entry) => {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          return collectSvg(fullPath);
        }
        return entry.name.endsWith(".svg")
          ? [readFileSync(fullPath, "utf8")]
          : [];
      });
    };

    for (const svg of collectSvg(PUBLIC_SHOWCASES_DIR)) {
      expect(svg).not.toMatch(/Send a task/i);
    }
  });
});
