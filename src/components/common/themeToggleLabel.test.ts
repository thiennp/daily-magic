import { describe, expect, it } from "vitest";

import themeToggleLabel from "@/components/common/themeToggleLabel";

describe("themeToggleLabel", () => {
  it("names the destination theme for each current theme", () => {
    expect(themeToggleLabel("light")).toBe("Switch to dark theme");
    expect(themeToggleLabel("dark")).toBe("Switch to light theme");
  });
});
