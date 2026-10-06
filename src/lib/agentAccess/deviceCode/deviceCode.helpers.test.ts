import { describe, expect, it } from "vitest";

import {
  DEVICE_VERIFY_COPY,
  deviceVerifyMessageForErrorCode,
} from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import {
  formatUserCodeDisplay,
  hashUserCode,
  normalizeUserCode,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { requireAwcTermsAcceptance } from "@/lib/agentAccess/requireAwcTermsAcceptance";

describe("device-code user_code helpers", () => {
  it("formats and normalizes XXXX-XXXX consonant codes", () => {
    expect(formatUserCodeDisplay("BCDFGHJK")).toBe("BCDF-GHJK");
    expect(normalizeUserCode("bcdF-ghjk")).toBe("BCDFGHJK");
    expect(hashUserCode("BCDF-GHJK")).toBe(hashUserCode("BCDFGHJK"));
  });

  it("verify page copy includes locked owner line and never says bot", () => {
    expect(DEVICE_VERIFY_COPY.title).toBe(
      "You'll be this assistant's owner",
    );
    expect(DEVICE_VERIFY_COPY.ownerLine).toBe(DEVICE_VERIFY_COPY.title);
    expect(DEVICE_VERIFY_COPY.pageTitle).toBe(
      "Become this assistant's owner | AgentWitch",
    );
    expect(DEVICE_VERIFY_COPY.sub).toBe(
      "This gives the assistant its own AgentWitch account, linked to you. It can ask to join a project when it has an invite. It sees nothing in a project until the project owner approves it.",
    );
    expect(DEVICE_VERIFY_COPY.stop).toBe(
      "The project owner can remove it from the project's Members at any time.",
    );
    expect(DEVICE_VERIFY_COPY.codeLabel).toBe("Code");
    expect(DEVICE_VERIFY_COPY.lookUp).toBe("Continue");
    expect(DEVICE_VERIFY_COPY.confirmed).toBe(
      "Confirmed. You're this assistant's owner. A project still needs the project owner's approval before the assistant can join. You can close this page.",
    );
    expect(DEVICE_VERIFY_COPY.termsNotice).toBe(
      "By confirming, you accept the Terms and Privacy Policy for this assistant.",
    );
    expect(
      `${DEVICE_VERIFY_COPY.termsNoticePrefix}Terms and Privacy Policy${DEVICE_VERIFY_COPY.termsNoticeSuffix}`,
    ).toBe(DEVICE_VERIFY_COPY.termsNotice);
    expect(DEVICE_VERIFY_COPY.denied).toBe(
      "Denied. The assistant was not linked to you.",
    );
    expect(DEVICE_VERIFY_COPY.codeHelper).toBe(
      "Enter the code your assistant gave you.",
    );
    expect(DEVICE_VERIFY_COPY.loginRequired).toBe(
      "Sign in to become this assistant's owner.",
    );
    const joined = Object.values(DEVICE_VERIFY_COPY).join(" ");
    expect(joined.toLowerCase()).not.toMatch(/\bbot\b/);
  });

  it("maps every device error code to Product EN", () => {
    expect(deviceVerifyMessageForErrorCode("expired")).toBe(
      DEVICE_VERIFY_COPY.expired,
    );
    expect(deviceVerifyMessageForErrorCode("invalid_code")).toBe(
      DEVICE_VERIFY_COPY.notFound,
    );
    expect(deviceVerifyMessageForErrorCode("already_decided")).toBe(
      DEVICE_VERIFY_COPY.alreadyDecided,
    );
    expect(deviceVerifyMessageForErrorCode("rate_limited")).toBe(
      DEVICE_VERIFY_COPY.rateLimited,
    );
    expect(deviceVerifyMessageForErrorCode("token_create_failed")).toBe(
      DEVICE_VERIFY_COPY.failed,
    );
    expect(deviceVerifyMessageForErrorCode("not_pending")).toBe(
      DEVICE_VERIFY_COPY.failed,
    );
    expect(deviceVerifyMessageForErrorCode("account_exists")).toBe(
      DEVICE_VERIFY_COPY.failed,
    );
    expect(deviceVerifyMessageForErrorCode("totally_unknown")).toBe(
      DEVICE_VERIFY_COPY.failed,
    );
  });

  it("normalizes ?code= prefill as XXXX-XXXX", () => {
    expect(formatUserCodeDisplay(normalizeUserCode("bcdFghjk"))).toBe(
      "BCDF-GHJK",
    );
    expect(formatUserCodeDisplay(normalizeUserCode("BCDF-GHJK"))).toBe(
      "BCDF-GHJK",
    );
  });
});

describe("requireAwcTermsAcceptance", () => {
  it("rejects missing or stale terms", () => {
    expect(requireAwcTermsAcceptance({}).ok).toBe(false);
    expect(
      requireAwcTermsAcceptance({
        acceptTerms: true,
        termsVersion: "1999-01-01",
      }).ok,
    ).toBe(false);
  });

  it("accepts current terms", () => {
    expect(
      requireAwcTermsAcceptance({
        acceptTerms: true,
        termsVersion: AWC_TERMS_VERSION,
      }),
    ).toEqual({ ok: true, termsVersion: AWC_TERMS_VERSION });
  });
});
