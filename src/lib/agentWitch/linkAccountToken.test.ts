import { describe, expect, it, beforeEach, afterEach } from "vitest";

import {
  createLinkAccountToken,
  verifyLinkAccountToken,
} from "@/lib/agentWitch/linkAccountToken";

describe("linkAccountToken", () => {
  const previousAuthSecret = process.env.AUTH_SECRET;

  beforeEach(() => {
    process.env.AUTH_SECRET = "test-link-account-secret";
  });

  afterEach(() => {
    process.env.AUTH_SECRET = previousAuthSecret;
  });

  it("creates and verifies a link token for a user", () => {
    const token = createLinkAccountToken("user-1", "User@Example.com");
    expect(token).not.toBeNull();

    const verified = verifyLinkAccountToken(token ?? "");
    expect(verified).toEqual({
      userId: "user-1",
      email: "user@example.com",
    });
  });

  it("rejects tampered link tokens", () => {
    const token = createLinkAccountToken("user-1", "user@example.com");
    const verified = verifyLinkAccountToken(`${token ?? ""}tampered`);

    expect(verified).toBeNull();
  });
});
