import { describe, expect, it } from "vitest";

import { isDocumentMouseDownOutsideDropdown } from "@/components/ui/dropdown/isDocumentMouseDownOutsideDropdown.util";

const mockElement = (contains: (target: Node) => boolean): HTMLElement =>
  ({
    contains,
  }) as HTMLElement;

describe("isDocumentMouseDownOutsideDropdown", () => {
  it("PROJ-UI-001 ignores only this dropdown toggle, not sibling toggles", () => {
    const targetA = {} as Node;
    const targetB = {} as Node;
    const dropdownA = mockElement((target) => target === targetA);
    const toggleA = mockElement((target) => target === targetA);

    expect(
      isDocumentMouseDownOutsideDropdown(targetB, dropdownA, toggleA),
    ).toBe(true);
    expect(
      isDocumentMouseDownOutsideDropdown(targetA, dropdownA, toggleA),
    ).toBe(false);
  });

  it("keeps legacy global dropdown-toggle exclusion when no toggle ref", () => {
    const dropdown = mockElement(() => false);
    const toggle = {
      closest: (selector: string) =>
        selector === ".dropdown-toggle" ? toggle : null,
    } as unknown as HTMLElement;

    expect(
      isDocumentMouseDownOutsideDropdown(toggle, dropdown, undefined),
    ).toBe(false);
  });
});
