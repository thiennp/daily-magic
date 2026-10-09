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

  it("never returns a callback that can leave the site", () => {
    for (const evil of [
      "/\\evil.com",
      "/%5Cevil.com",
      "//evil.com",
      "/%2f%2fevil.com",
      "/a\nb",
    ]) {
      const result = resolvePostAuthReturnFromSearchParams(
        new URLSearchParams({ callbackUrl: evil }),
      );
      expect(result).not.toBe(evil);
    }
    expect(
      resolvePostAuthReturnFromSearchParams(
        new URLSearchParams({ callbackUrl: "/projects/p1?tab=tasks" }),
      ),
    ).toBe("/projects/p1?tab=tasks");
  });
});
