import { describe, expect, it } from "vitest";

import { startsWithAny } from "@/features/project-skill-share/internal/core/skillQueryWords";

describe("startsWithAny (word matching)", () => {
  it("short words match the same word or its plural only", () => {
    expect(startsWithAny(["hooks"], "hook")).toBe(true);
    expect(startsWithAny(["pager"], "page")).toBe(false);
    expect(startsWithAny(["pages"], "page")).toBe(true);
    expect(startsWithAny(["awl"], "aw")).toBe(false);
    expect(startsWithAny(["ui"], "ui")).toBe(true);
  });

  it("longer words match as a prefix in either direction", () => {
    expect(startsWithAny(["component"], "components")).toBe(true);
    expect(startsWithAny(["components"], "component")).toBe(true);
    expect(startsWithAny(["history"], "histor")).toBe(true);
    expect(startsWithAny(["deploy"], "kubernetes")).toBe(false);
  });
});
