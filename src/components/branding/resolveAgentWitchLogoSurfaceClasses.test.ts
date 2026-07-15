import { describe, expect, it } from "vitest";

import { resolveAgentWitchLogoSurfaceClasses } from "@/components/branding/resolveAgentWitchLogoSurfaceClasses";

describe("resolveAgentWitchLogoSurfaceClasses", () => {
  it("MARKETING-001 keeps logo text dark on light marketing surfaces", () => {
    const classes = resolveAgentWitchLogoSurfaceClasses("light");

    expect(classes.text).toContain("text-zinc-900");
    expect(classes.text).not.toContain("dark:");
    expect(classes.root).not.toContain("dark:");
    expect(classes.markCross).not.toContain("dark:");
  });

  it("adaptive surface keeps dark-mode logo colors for app shell", () => {
    const classes = resolveAgentWitchLogoSurfaceClasses("adaptive");

    expect(classes.text).toContain("dark:text-zinc-100");
    expect(classes.markCross).toContain("dark:stroke-zinc-100");
  });
});
