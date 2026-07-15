import { describe, expect, it } from "vitest";

import parseEmailSignInFeedback from "./parseEmailSignInFeedback";

describe("parseEmailSignInFeedback", () => {
  it("returns success feedback when sign-in succeeds", () => {
    const feedback = parseEmailSignInFeedback({ ok: true, error: null });

    expect(feedback.variant).toBe("success");
    expect(feedback.message).toContain("Check your inbox");
  });

  it("maps auth errors instead of showing success (AUTH-001)", () => {
    const feedback = parseEmailSignInFeedback({
      ok: false,
      error: "Configuration",
    });

    expect(feedback.variant).toBe("error");
    expect(feedback.message).not.toContain("Check your inbox");
    expect(feedback.message).toContain("email");
  });

  it("returns a generic failure when sign-in does not succeed", () => {
    const feedback = parseEmailSignInFeedback({ ok: false, error: null });

    expect(feedback.variant).toBe("error");
    expect(feedback.message).toBe("Could not send the sign-in email.");
  });
});
