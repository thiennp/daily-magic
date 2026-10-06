import { describe, expect, it } from "vitest";

import { OAUTH_CONSENT_COPY } from "@/features/agent-access/oauth-consent/oauthConsentCopy.constant";

describe("OAuth consent copy", () => {
  it("has owner line, name+continue-at host labels, and never says bot", () => {
    expect(OAUTH_CONSENT_COPY.title).toBe(
      "You'll be this assistant's owner",
    );
    expect(OAUTH_CONSENT_COPY.sub).toBe(
      "This gives the assistant its own AgentWitch account, linked to you. It can ask to join a project when it has an invite. It sees nothing in a project until the project owner approves it.",
    );
    expect(OAUTH_CONSENT_COPY.stop).toBe(
      "The project owner can remove it from the project's Members at any time.",
    );
    expect(OAUTH_CONSENT_COPY.termsLabel).toBe(
      "I accept the Terms and Privacy Policy for this assistant.",
    );
    expect(
      `${OAUTH_CONSENT_COPY.termsLabelPrefix}Terms and Privacy Policy${OAUTH_CONSENT_COPY.termsLabelSuffix}`,
    ).toBe(OAUTH_CONSENT_COPY.termsLabel);
    expect(OAUTH_CONSENT_COPY.confirmed).toContain("project owner's approval");
    expect(OAUTH_CONSENT_COPY.denied).toBe(
      "Denied. The assistant was not linked to you.",
    );
    expect(OAUTH_CONSENT_COPY.clientLabel).toBe("Assistant");
    expect(OAUTH_CONSENT_COPY.clientFallback).toBe("this assistant");
    expect(OAUTH_CONSENT_COPY.continueAtLabel).toBe("Returns to");
    expect(OAUTH_CONSENT_COPY.continueAtFallback).toBe("this app");
    expect(OAUTH_CONSENT_COPY.continueHint).toBe(
      "After you confirm, you'll go back there to finish setting up this assistant.",
    );
    expect(OAUTH_CONSENT_COPY.expired).toBe(
      "This link expired. Start again from your assistant.",
    );
    expect(OAUTH_CONSENT_COPY.termsRequired).toBe(
      "Accept the Terms and Privacy Policy to continue.",
    );
    expect(OAUTH_CONSENT_COPY.openLinkHint).toBe(
      "Open the link your assistant gave you to continue.",
    );
    const joined = Object.values(OAUTH_CONSENT_COPY).join(" ");
    expect(joined.toLowerCase()).not.toMatch(/\bbot\b/);
    expect(joined.toLowerCase()).not.toMatch(/\boauth\b/);
  });
});
