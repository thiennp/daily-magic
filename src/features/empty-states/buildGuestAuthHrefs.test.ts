import { describe, expect, it } from "vitest";

import {
  CREATE_FREE_ACCOUNT_HREF,
  buildSignInHref,
  marketplaceFreeStartersSectionHref,
} from "@/features/empty-states/buildGuestAuthHrefs";

describe("buildGuestAuthHrefs", () => {
  it("uses marketing get-started entry for create account", () => {
    expect(CREATE_FREE_ACCOUNT_HREF).toBe("/#get-started");
  });

  it("builds login callback URLs for app routes", () => {
    expect(buildSignInHref("/library")).toBe("/login?callbackUrl=%2Flibrary");
    expect(buildSignInHref("/marketplace")).toBe(
      "/login?callbackUrl=%2Fmarketplace",
    );
  });

  it("links free-starters scroll target on marketplace", () => {
    expect(marketplaceFreeStartersSectionHref()).toBe("#free-starters");
  });
});
