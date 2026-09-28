import { describe, expect, it } from "vitest";

import {
  APP_SHELL_DESKTOP_NAV_CLASS,
  APP_SHELL_DESKTOP_NAV_OFFSET_CLASS,
  APP_SHELL_NAV_LINK_ACTIVE_CLASSES,
  APP_SHELL_NAV_LINK_INACTIVE_CLASSES,
} from "@/features/shell/appShellNavClasses.constant";

describe("appShellNavClasses.constant", () => {
  it("SHELL-UI-001 uses brand active nav to match public design system", () => {
    expect(APP_SHELL_NAV_LINK_ACTIVE_CLASSES).toContain("bg-brand-50");
    expect(APP_SHELL_NAV_LINK_ACTIVE_CLASSES).toContain("text-brand-700");
    expect(APP_SHELL_NAV_LINK_INACTIVE_CLASSES).not.toContain("zinc");
  });

  it("places desktop primary nav in a top-left rail and offsets page content", () => {
    expect(APP_SHELL_DESKTOP_NAV_CLASS).toContain("fixed");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).toContain("left-0");
    expect(APP_SHELL_DESKTOP_NAV_CLASS).toContain("md:flex");
    expect(APP_SHELL_DESKTOP_NAV_OFFSET_CLASS).toBe("md:pl-56");
  });
});
