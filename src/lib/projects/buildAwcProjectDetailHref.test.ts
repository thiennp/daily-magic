import { describe, expect, it } from "vitest";

import buildAwcProjectDetailHref from "@/lib/projects/buildAwcProjectDetailHref";

describe("buildAwcProjectDetailHref", () => {
  it("builds detail path without query", () => {
    expect(buildAwcProjectDetailHref("abc-123")).toBe("/projects/abc-123");
  });

  it("adds rename query for rename action", () => {
    expect(buildAwcProjectDetailHref("abc-123", "rename")).toBe(
      "/projects/abc-123?rename=1",
    );
  });
});
