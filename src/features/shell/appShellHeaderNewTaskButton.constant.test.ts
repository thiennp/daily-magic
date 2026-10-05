import { describe, expect, it } from "vitest";

import { APP_SURFACE_CTA_PRIMARY_ICON_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { APP_SHELL_HEADER_NEW_TASK_BUTTON_CLASS } from "@/features/shell/appShellHeaderNewTaskButton.constant";

describe("APP_SHELL_HEADER_NEW_TASK_BUTTON_CLASS", () => {
  it("shrinks the header New task CTA from 44px to ~60% (26px)", () => {
    expect(APP_SURFACE_CTA_PRIMARY_ICON_CLASS).toContain("h-11 w-11");
    expect(APP_SHELL_HEADER_NEW_TASK_BUTTON_CLASS).toContain("size-6.5");
    expect(APP_SHELL_HEADER_NEW_TASK_BUTTON_CLASS).not.toContain("h-11");
    expect(APP_SHELL_HEADER_NEW_TASK_BUTTON_CLASS).not.toContain("w-11");
  });

  it("keeps the focus ring and primary styling", () => {
    expect(APP_SHELL_HEADER_NEW_TASK_BUTTON_CLASS).toContain(
      "focus-visible:ring-2",
    );
    expect(APP_SHELL_HEADER_NEW_TASK_BUTTON_CLASS).toContain("bg-brand-600");
  });
});
