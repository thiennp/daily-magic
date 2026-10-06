import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("AppShell sidebar layout", () => {
  it("renders sticky primary nav in the left column for standard and admin shells", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/shell/AppShell.tsx"),
      "utf8",
    );

    expect(source).toContain("const primaryNavAside = renderPrimaryNav");
    expect(source).toContain(
      "<AppShellSidebar showDevicesRail={showDevicesRail} />",
    );
    expect(source).toMatch(
      /sidebar \? \([\s\S]*\{primaryNavAside\}[\s\S]*\{sidebar\}[\s\S]*\{children\}/,
    );
    expect(source).not.toContain('placement="embedded"');
  });

  it("SHELL-004: renders Your Devices on mobile outside the hidden desktop sidebar", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/shell/AppShell.tsx"),
      "utf8",
    );

    expect(source).toContain("const mobileDevicesRail =");
    expect(source).toContain("<AppShellDevicesPanel />");
    expect(source).toMatch(/mobileDevicesRail[\s\S]*md:hidden/);
    expect(source).toMatch(/\{mobileDevicesRail\}[\s\S]*\{pageBody\}/);
  });

  it("pins Your Devices at the bottom of the desktop sidebar", () => {
    const sidebarSource = readFileSync(
      join(process.cwd(), "src/features/shell/AppShellSidebar.tsx"),
      "utf8",
    );

    expect(sidebarSource).toContain("AppShellNav");
    expect(sidebarSource).toContain("AppShellDevicesPanel");
    expect(sidebarSource).toContain("mt-auto");
    expect(sidebarSource).toContain("flex-col");
  });
});
