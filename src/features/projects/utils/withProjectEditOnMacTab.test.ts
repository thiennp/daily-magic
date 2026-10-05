import { describe, expect, it } from "vitest";

import withProjectEditOnMacTab from "@/features/projects/utils/withProjectEditOnMacTab";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

describe("withProjectEditOnMacTab", () => {
  it("rewrites only the href when Edit on Mac is enabled", () => {
    const enabled: ProjectEditOnMacCta = {
      state: "enabled",
      buttonLabel: "Edit on this Mac →",
      helperText: null,
      href: "http://127.0.0.1:43347/project?id=proj-1",
    };
    expect(withProjectEditOnMacTab(enabled, "proj-1", "pitfalls")).toEqual({
      ...enabled,
      href: "http://127.0.0.1:43347/project?id=proj-1&tab=pitfalls",
    });
  });

  it("leaves offline CTAs unchanged", () => {
    const offline: ProjectEditOnMacCta = {
      state: "offline",
      buttonLabel: "Edit on this Mac",
      helperText: "Office Mac is offline right now.",
      href: null,
    };
    expect(withProjectEditOnMacTab(offline, "proj-1", "pitfalls")).toBe(
      offline,
    );
  });
});
