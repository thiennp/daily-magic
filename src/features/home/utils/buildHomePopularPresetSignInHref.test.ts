import { describe, expect, it } from "vitest";

import { buildHomePopularPresetMarketplaceCallbackPath } from "@/features/home/utils/buildHomePopularPresetMarketplaceCallbackPath";
import { buildHomePopularPresetSignInHref } from "@/features/home/utils/buildHomePopularPresetSignInHref";

describe("BUG-005 / HOME-036 — homepage preset sign-in callback", () => {
  it("buildHomePopularPresetMarketplaceCallbackPath encodes preset capabilityId", () => {
    expect(
      buildHomePopularPresetMarketplaceCallbackPath("vibe-coding-app-feature"),
    ).toBe("/marketplace?capabilityId=preset%3Avibe-coding-app-feature");
  });

  it("buildHomePopularPresetSignInHref wraps marketplace callback for login", () => {
    const href = buildHomePopularPresetSignInHref("vibe-coding-app-feature");

    expect(href).toBe(
      "/login?callbackUrl=%2Fmarketplace%3FcapabilityId%3Dpreset%253Avibe-coding-app-feature",
    );

    const callbackUrl = new URL(
      href,
      "https://www.agentwitch.com",
    ).searchParams.get("callbackUrl");

    expect(callbackUrl).toBe(
      "/marketplace?capabilityId=preset%3Avibe-coding-app-feature",
    );
  });
});
