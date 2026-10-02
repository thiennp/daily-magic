import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_SECONDARY_APP_PAGE_ENTRIES } from "@/utils/storybook/awc/entries/awcSecondaryAppPages";

const chromeSource = readFileSync(
  path.join(process.cwd(), "src/utils/storybook/AwcStorybookChrome.tsx"),
  "utf8",
);

describe("AwcStorybookChrome", () => {
  it("wraps admin shell stories in AdminShell (AppShell + admin sidebar)", () => {
    expect(chromeSource).toMatch(/case "admin":[\s\S]*<AdminShell>/);
    expect(chromeSource).not.toMatch(/case "admin":\s*return children;/);
  });

  it("uses app shell for connection lab stories", () => {
    const connectionLab = AWC_SECONDARY_APP_PAGE_ENTRIES.find(
      (entry) => entry.id === "connection-lab",
    );
    expect(connectionLab?.shell).toBe("app");
  });

  it("keeps admin users and groups on shell admin", () => {
    const adminEntries = AWC_SECONDARY_APP_PAGE_ENTRIES.filter((entry) =>
      entry.id.startsWith("admin-"),
    );
    expect(adminEntries.map((entry) => entry.id).sort()).toEqual([
      "admin-groups",
      "admin-users",
    ]);
    expect(adminEntries.every((entry) => entry.shell === "admin")).toBe(true);
  });
});
