import { describe, expect, it } from "vitest";

import {
  pushModal,
  removeModal,
  isTopModal,
  isAnyModalOpen,
} from "@/components/ui/modal/modalEscapeStack";

describe("modalEscapeStack", () => {
  it("manages a stack of open modals", () => {
    const modal1 = Symbol("modal1");
    const modal2 = Symbol("modal2");

    expect(isAnyModalOpen()).toBe(false);
    expect(isTopModal(modal1)).toBe(false);

    pushModal(modal1);
    expect(isAnyModalOpen()).toBe(true);
    expect(isTopModal(modal1)).toBe(true);

    pushModal(modal2);
    expect(isTopModal(modal1)).toBe(false);
    expect(isTopModal(modal2)).toBe(true);

    removeModal(modal1);
    expect(isTopModal(modal2)).toBe(true);

    removeModal(modal2);
    expect(isAnyModalOpen()).toBe(false);
  });
});
