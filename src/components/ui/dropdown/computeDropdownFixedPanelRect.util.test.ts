import { describe, expect, it } from "vitest";

import { computeDropdownFixedPanelRect } from "@/components/ui/dropdown/computeDropdownFixedPanelRect.util";

describe("computeDropdownFixedPanelRect", () => {
  it("aligns panel to toggle right edge with margin below", () => {
    const toggleRect = {
      bottom: 100,
      right: 300,
    } as DOMRect;

    expect(computeDropdownFixedPanelRect(toggleRect, 208, 1440)).toEqual({
      top: 108,
      left: 92,
    });
  });

  it("clamps panel inside the viewport", () => {
    const toggleRect = {
      bottom: 50,
      right: 20,
    } as DOMRect;

    expect(computeDropdownFixedPanelRect(toggleRect, 208, 400).left).toBe(8);
  });
});
