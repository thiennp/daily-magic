import { beforeEach, describe, expect, it } from "vitest";

import {
  allowMagicLinkRequest,
  resetMagicLinkRateLimitForTests,
} from "@/lib/auth/magicLinkRateLimit";

describe("allowMagicLinkRequest", () => {
  beforeEach(resetMagicLinkRateLimitForTests);

  it("allows five an hour per address, whatever the case", () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 5; i += 1) {
      expect(allowMagicLinkRequest("Victim@Example.org", t0 + i)).toBe(true);
    }
    expect(allowMagicLinkRequest("victim@example.org", t0 + 10)).toBe(false);
    expect(allowMagicLinkRequest("other@example.org", t0 + 10)).toBe(true);
  });

  it("lets the address try again after the hour", () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 5; i += 1) allowMagicLinkRequest("a@b.org", t0);
    expect(allowMagicLinkRequest("a@b.org", t0 + 61 * 60 * 1000)).toBe(true);
  });
});
