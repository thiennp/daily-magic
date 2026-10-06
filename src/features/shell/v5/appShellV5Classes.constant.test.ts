import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import * as V5_CLASSES from "@/features/shell/v5/appShellV5Classes.constant";

const SHELL = join(process.cwd(), "src/features/shell");
const read = (file: string): string => readFileSync(join(SHELL, file), "utf8");

describe("V5-2 Shell chrome classes", () => {
  it("light styles use only --awc-* tokens (no second scale)", () => {
    const light = Object.values(V5_CLASSES)
      .join(" ")
      .split(/\s+/)
      .filter((token) => !token.startsWith("dark:"));
    expect(light.some((token) => /gray-|brand-|zinc-|slate-/.test(token))).toBe(
      false,
    );
    expect(V5_CLASSES.APP_SHELL_V5_FONT_CLASS).toContain("--font-awc-sans");
  });

  it("topbar drops the AWL / build pill", () => {
    const header = read("AppShellHeader.tsx");
    const brand = read("v5/AppShellBrand.tsx");
    expect(header).not.toContain("AWL");
    expect(header).not.toContain("AGENT_WITCH_INSTALL_BUNDLE_VERSION");
    expect(brand).not.toContain("AWL");
  });

  it("mobile drawer carries logo + wordmark (I19)", () => {
    expect(read("AppShellMobileNavMenu.tsx")).toContain("<AppShellBrand />");
  });

  it("sidebar is one --awc-side-w width at every breakpoint (I3)", () => {
    const shell = read("AppShell.tsx");
    expect(shell).toContain("var(--awc-side-w)");
    expect(shell).not.toMatch(/grid-cols-\[1[56]rem_/);
  });

  it("ships no Dev corner in the shell (I5)", () => {
    for (const file of [
      "AppShellSidebar.tsx",
      "AppShell.tsx",
      "AppShellNav.tsx",
    ]) {
      expect(read(file)).not.toMatch(
        /S\.dev|Dev corner|Not part of the product/,
      );
    }
  });
});
