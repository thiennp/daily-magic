import { describe, expect, it } from "vitest";

import {
  APP_SHELL_DESKTOP_NAV_CLASS,
  APP_SHELL_NAV_LINK_ACTIVE_CLASSES,
  APP_SHELL_NAV_LINK_INACTIVE_CLASSES,
} from "@/features/shell/appShellNavClasses.constant";

describe("appShellNavClasses.constant", () => {
  it("SHELL-UI-001 uses brand active nav to match public design system", () => {
    expect(APP_SHELL_NAV_LINK_ACTIVE_CLASSES).toContain("bg-brand-50");
    expect(APP_SHELL_NAV_LINK_ACTIVE_CLASSES).toContain("text-brand-700");
    expect(APP_SHELL_NAV_LINK_INACTIVE_CLASSES).not.toContain("zinc");
  });

  it("styles desktop primary nav as a card panel, not a fixed left rail", () => {
    expect(APP_SHELL_DESKTOP_NAV_CLASS).toContain("rounded-2xl");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).toContain("border");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).toContain("bg-white");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).toContain("hidden");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).toContain("md:flex");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).not.toContain("fixed");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).not.toContain("inset-y-0");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).not.toContain("w-56");
  });
});
