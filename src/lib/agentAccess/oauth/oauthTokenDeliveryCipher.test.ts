import { afterEach, describe, expect, it } from "vitest";

import {
  openOauthDeliveryToken,
  sealOauthDeliveryToken,
} from "@/lib/agentAccess/oauth/oauthTokenDeliveryCipher";

const original = process.env.AUTH_SECRET;

describe("oauthTokenDeliveryCipher", () => {
  afterEach(() => {
    process.env.AUTH_SECRET = original;
  });

  it("seals a token so the stored value is not the token, and opens it back", () => {
    process.env.AUTH_SECRET = "test-secret";
    const sealed = sealOauthDeliveryToken("aw_live_token");
    expect(sealed).not.toContain("aw_live_token");
    expect(openOauthDeliveryToken(sealed)).toBe("aw_live_token");
  });

  it("still reads a legacy plaintext row and rejects a tampered one", () => {
    process.env.AUTH_SECRET = "test-secret";
    expect(openOauthDeliveryToken("aw_plain")).toBe("aw_plain");
    const sealed = sealOauthDeliveryToken("aw_live_token");
    const tampered = sealed.slice(0, -4) + "AAAA";
    expect(() => openOauthDeliveryToken(tampered)).toThrow();
  });
});
