import { describe, expect, it } from "vitest";

import buildLoginFeedbackFromAuthError from "@/features/auth/utils/buildLoginFeedbackFromAuthError";
import normalizeAuthErrorCode from "@/features/auth/utils/normalizeAuthErrorCode";

describe("normalizeAuthErrorCode", () => {
  it("strips a trailing /signin segment from broken default error links", () => {
    expect(normalizeAuthErrorCode("Verification/signin")).toBe("Verification");
    expect(normalizeAuthErrorCode("Verification")).toBe("Verification");
  });
});

describe("buildLoginFeedbackFromAuthError", () => {
  it("uses neutral verification copy (expired, reused, or invalid link)", () => {
    const feedback = buildLoginFeedbackFromAuthError("Verification");
    expect(feedback.variant).toBe("error");
    expect(feedback.title).toBe("Sign-in link not valid");
    expect(feedback.message).toMatch(/expired|already been used/i);
    expect(feedback.message).toMatch(/Request a new email link/i);
  });

  it("maps Verification/signin after normalization", () => {
    const code = normalizeAuthErrorCode("Verification/signin");
    expect(code).toBe("Verification");
    expect(buildLoginFeedbackFromAuthError(code ?? "").title).toBe(
      "Sign-in link not valid",
    );
  });
});
