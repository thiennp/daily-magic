import { describe, expect, it } from "vitest";

import isTouchOnlyNarrowClient from "@/lib/mobile/isTouchOnlyNarrowClient";

const phone = {
  primaryPointerCoarse: true,
  anyPointerFine: false,
  maxTouchPoints: 5,
  viewportWidth: 390,
};

describe("isTouchOnlyNarrowClient", () => {
  it("flags a touch-only phone-width client", () => {
    expect(isTouchOnlyNarrowClient(phone)).toBe(true);
    expect(isTouchOnlyNarrowClient({ ...phone, viewportWidth: 767 })).toBe(
      true,
    );
  });

  it("never flags a touchscreen laptop that also has a trackpad/mouse", () => {
    expect(isTouchOnlyNarrowClient({ ...phone, anyPointerFine: true })).toBe(
      false,
    );
  });

  it("never flags a desktop (fine pointer, no touch)", () => {
    expect(
      isTouchOnlyNarrowClient({
        primaryPointerCoarse: false,
        anyPointerFine: true,
        maxTouchPoints: 0,
        viewportWidth: 500,
      }),
    ).toBe(false);
  });

  it("requires a narrow viewport and touch points", () => {
    expect(isTouchOnlyNarrowClient({ ...phone, viewportWidth: 1024 })).toBe(
      false,
    );
    expect(isTouchOnlyNarrowClient({ ...phone, viewportWidth: null })).toBe(
      false,
    );
    expect(isTouchOnlyNarrowClient({ ...phone, maxTouchPoints: 0 })).toBe(
      false,
    );
  });
});
