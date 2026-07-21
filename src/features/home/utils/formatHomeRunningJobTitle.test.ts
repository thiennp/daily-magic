import { describe, expect, it } from "vitest";

import { formatHomeRunningJobTitle } from "@/features/home/utils/formatHomeRunningJobTitle";

describe("formatHomeRunningJobTitle (HOME-034)", () => {
  it("truncates long prompts for the Home running list", () => {
    const title = formatHomeRunningJobTitle(`Run workflow: ${"x".repeat(100)}`);
    expect(title.endsWith("…")).toBe(true);
    expect(title.length).toBeLessThanOrEqual(72);
  });

  it("returns Untitled task for blank prompts", () => {
    expect(formatHomeRunningJobTitle("   ")).toBe("Untitled task");
  });
});
