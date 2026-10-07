import { describe, expect, it } from "vitest";

import withProjectEditOnMacTab from "@/features/projects/utils/withProjectEditOnMacTab";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

describe("withProjectEditOnMacTab", () => {
  it("rewrites only the href when Edit on computer is enabled", () => {
    const enabled: ProjectEditOnMacCta = {
      state: "enabled",
      buttonLabel: "Edit on this computer",
      helperText: null,
      href: "agentwitch-local://status?project=proj-1",
    };
    expect(withProjectEditOnMacTab(enabled, "proj-1", "pitfalls")).toEqual({
      ...enabled,
      href: "agentwitch-local://status?project=proj-1&tab=pitfalls",
    });
  });

  it("leaves offline Connect CTAs unchanged", () => {
    const offline: ProjectEditOnMacCta = {
      state: "offline",
      buttonLabel: "Connect this computer",
      helperText: null,
      href: "/#awc-connect",
    };
    expect(withProjectEditOnMacTab(offline, "proj-1", "pitfalls")).toBe(
      offline,
    );
  });
});
