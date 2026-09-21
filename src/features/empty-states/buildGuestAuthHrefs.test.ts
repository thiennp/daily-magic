import { describe, expect, it } from "vitest";

import {
  CREATE_FREE_ACCOUNT_HREF,
  buildMarketingGetStartedHref,
  buildSignInHref,
  buildSignInHrefForPostAuthReturn,
  buildSignInHrefFromPathAndSearchParams,
  buildSignInHrefFromSearchParams,
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

  it("buildSignInHrefForPostAuthReturn preserves preset capabilityId", () => {
    expect(
      buildSignInHrefForPostAuthReturn({
        next: "/marketplace",
        capabilityId: "preset:weekly-team-status",
      }),
    ).toBe(
      "/login?callbackUrl=%2Fmarketplace%3FcapabilityId%3Dpreset%253Aweekly-team-status",
    );
  });

  it("buildSignInHrefFromPathAndSearchParams keeps the current path and query", () => {
    expect(
      buildSignInHrefFromPathAndSearchParams(
        "/library",
        new URLSearchParams("sendTask=1&libraryCapabilityId=cap-1"),
      ),
    ).toBe(
      "/login?callbackUrl=%2Flibrary%3FsendTask%3D1%26libraryCapabilityId%3Dcap-1",
    );
  });

  it("buildSignInHrefFromSearchParams reads capabilityId from the page query", () => {
    expect(
      buildSignInHrefFromSearchParams(
        new URLSearchParams("capabilityId=preset%3Avibe-coding-app-feature"),
      ),
    ).toBe(
      "/login?callbackUrl=%2Fmarketplace%3FcapabilityId%3Dpreset%253Avibe-coding-app-feature",
    );
  });

  it("buildMarketingGetStartedHref adds capabilityId before #get-started", () => {
    expect(
      buildMarketingGetStartedHref(
        new URLSearchParams("capabilityId=preset%3Avibe-coding-app-feature"),
      ),
    ).toBe("/?capabilityId=preset%3Avibe-coding-app-feature#get-started");
  });

  it("links free-starters scroll target on marketplace", () => {
    expect(marketplaceFreeStartersSectionHref()).toBe("#free-starters");
  });
});
