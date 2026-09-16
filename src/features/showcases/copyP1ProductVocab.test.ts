import { readFileSync } from "node:fs";
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
  });

  it("mobile bottom nav uses New task label", () => {
    const source = readFileSync(APP_BOTTOM_NAV_PATH, "utf8");

    expect(source).toContain('label: "New task"');
    expect(source).not.toContain('label: "Send"');
  });
});
