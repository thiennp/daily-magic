import { describe, expect, it } from "vitest";

import {
  signProjectConnectionOAuthState,
  verifyProjectConnectionOAuthState,
} from "@/lib/projects/connections/projectConnectionOAuthState";

describe("project connection oauth state", () => {
  it("round-trips a signed state", () => {
    const state = signProjectConnectionOAuthState(
      { projectId: "p1", provider: "github", userId: "u1" },
      "secret",
      1_000_000,
    );
    const payload = verifyProjectConnectionOAuthState(state, "secret", 1_000_000);
    expect(payload).not.toBeNull();
    expect(payload?.projectId).toBe("p1");
    expect(payload?.provider).toBe("github");
    expect(payload?.userId).toBe("u1");
  });

  it("rejects tampered or expired state", () => {
    const state = signProjectConnectionOAuthState(
      { projectId: "p1", provider: "slack", userId: "u1" },
      "secret",
      1_000_000,
    );
    expect(verifyProjectConnectionOAuthState(state + "x", "secret", 1_000_000)).toBeNull();
    expect(verifyProjectConnectionOAuthState(state, "other", 1_000_000)).toBeNull();
    expect(
      verifyProjectConnectionOAuthState(state, "secret", 1_000_000 + 20 * 60 * 1000),
    ).toBeNull();
  });
});
