import { describe, expect, it } from "vitest";

import { shouldLazyMountHomeSetupContent } from "@/features/home/utils/shouldLazyMountHomeSetupContent";

describe("shouldLazyMountHomeSetupContent", () => {
  it("HOME-021: keeps setup content unmounted until expanded", () => {
    expect(shouldLazyMountHomeSetupContent(false)).toBe(false);
    expect(shouldLazyMountHomeSetupContent(true)).toBe(true);
  });
});
