import { describe, expect, it } from "vitest";

import { resolvePostAuthReturnFromSearchParams } from "@/lib/auth/resolvePostAuthReturnFromSearchParams";

describe("resolvePostAuthReturnFromSearchParams", () => {
  it("uses explicit callbackUrl when safe", () => {
    expect(
      resolvePostAuthReturnFromSearchParams(
        new URLSearchParams(
          "callbackUrl=%2Fmarketplace%3FcapabilityId%3Dpreset%253Ax",
        ),
      ),
    ).toBe("/marketplace?capabilityId=preset%3Ax");
  });

  it("rejects open-redirect callbackUrl values", () => {
    expect(
      resolvePostAuthReturnFromSearchParams(
        new URLSearchParams("callbackUrl=https%3A%2F%2Fevil.test"),
      ),
    ).toBe("/");
  });

  it("maps homepage capabilityId to marketplace install handoff (BUG-005)", () => {
    expect(
      resolvePostAuthReturnFromSearchParams(
        new URLSearchParams("capabilityId=preset%3Avibe-coding-app-feature"),
      ),
    ).toBe("/marketplace?capabilityId=preset%3Avibe-coding-app-feature");
  });

  it("preserves sendTask without capabilityId", () => {
    expect(
      resolvePostAuthReturnFromSearchParams(new URLSearchParams("sendTask=1")),
    ).toBe("/?sendTask=1");
  });

  it("defaults to home when no intent params", () => {
    expect(resolvePostAuthReturnFromSearchParams(new URLSearchParams())).toBe(
      "/",
    );
  });
});
