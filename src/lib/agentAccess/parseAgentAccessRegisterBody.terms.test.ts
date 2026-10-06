import { describe, expect, it } from "vitest";

import {
  AWC_TERMS_ACCEPTANCE_REQUIRED_CODE,
  AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR,
  AWC_TERMS_VERSION,
} from "@/lib/agentAccess/awcTermsVersion.constant";
import { parseAgentAccessRegisterBody } from "@/lib/agentAccess/parseAgentAccessRegisterBody";

describe("parseAgentAccessRegisterBody terms gate", () => {
  it("accepts none and agentmail with terms and rejects other methods", () => {
    const none = parseAgentAccessRegisterBody({
      method: "none",
      acceptTerms: true,
      termsVersion: AWC_TERMS_VERSION,
    });
    expect(none.ok && none.body.method).toBe("none");
    const mail = parseAgentAccessRegisterBody({
      method: "agentmail",
      displayName: "Scout",
      acceptTerms: true,
      termsVersion: AWC_TERMS_VERSION,
    });
    expect(mail.ok && mail.body.displayName).toBe("Scout");
    const badMethod = parseAgentAccessRegisterBody({ method: "gmail" });
    expect(badMethod.ok).toBe(false);
    expect(!badMethod.ok && badMethod.code).toBe("invalid_arguments");
    const longName = parseAgentAccessRegisterBody({
      method: "none",
      displayName: "x".repeat(81),
      acceptTerms: true,
      termsVersion: AWC_TERMS_VERSION,
    });
    expect(longName.ok).toBe(false);
    expect(!longName.ok && longName.code).toBe("invalid_arguments");
  });

  it("requires acceptTerms true and current termsVersion", () => {
    const missing = parseAgentAccessRegisterBody({ method: "none" });
    expect(missing).toEqual({
      ok: false,
      code: AWC_TERMS_ACCEPTANCE_REQUIRED_CODE,
      error: AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR,
      status: 400,
    });
    const falsy = parseAgentAccessRegisterBody({
      method: "none",
      acceptTerms: false,
      termsVersion: AWC_TERMS_VERSION,
    });
    expect(falsy.ok).toBe(false);
    expect(!falsy.ok && falsy.code).toBe(AWC_TERMS_ACCEPTANCE_REQUIRED_CODE);
    const stale = parseAgentAccessRegisterBody({
      method: "none",
      acceptTerms: true,
      termsVersion: "1999-01-01",
    });
    expect(stale.ok).toBe(false);
    expect(!stale.ok && stale.error).toBe(AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR);
    expect(AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR).toContain(
      "https://www.agentwitch.com/terms",
    );
    expect(AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR).toContain(
      "https://www.agentwitch.com/privacy",
    );
    expect(AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR).toContain(AWC_TERMS_VERSION);
  });
});
