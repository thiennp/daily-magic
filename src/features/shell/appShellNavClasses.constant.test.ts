import { describe, expect, it } from "vitest";

import {
  APP_SHELL_DESKTOP_NAV_CLASS,
  APP_SHELL_NAV_LINK_ACTIVE_CLASSES,
  APP_SHELL_NAV_LINK_BASE_CLASSES,
  APP_SHELL_NAV_LINK_INACTIVE_CLASSES,
} from "@/features/shell/appShellNavClasses.constant";

const lightClasses = (classes: string): string[] =>
  classes.split(" ").filter((token) => !token.startsWith("dark:"));

describe("appShellNavClasses.constant", () => {
  it("V5-2: active nav is tonal accent-soft + awc blue-700", () => {
    expect(APP_SHELL_NAV_LINK_ACTIVE_CLASSES).toContain("bg-awc-accent-soft");
    expect(APP_SHELL_NAV_LINK_ACTIVE_CLASSES).toContain("text-awc-blue-700");
    expect(APP_SHELL_NAV_LINK_INACTIVE_CLASSES).not.toContain("zinc");
  });

  it("V5-2: light nav styles use only --awc-* tokens (no gray/brand scale)", () => {
    const light = [
      APP_SHELL_NAV_LINK_BASE_CLASSES,
      APP_SHELL_NAV_LINK_ACTIVE_CLASSES,
      APP_SHELL_NAV_LINK_INACTIVE_CLASSES,
    ].flatMap(lightClasses);
    expect(light.some((token) => /gray-|brand-|zinc-/.test(token))).toBe(false);
  });

  it("P0-SHELL: desktop primary nav is a left rail column (not an in-content card)", () => {
    expect(APP_SHELL_DESKTOP_NAV_CLASS).toContain("hidden");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).toContain("md:flex");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).not.toContain("rounded-2xl");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).not.toContain("border-gray");
  });
});
