import { describe, expect, it } from "vitest";

import { OAUTH_CONSENT_COPY } from "@/features/agent-access/oauth-consent/oauthConsentCopy.constant";

describe("OAuth consent copy", () => {
  it("has owner line, name+continue-at host labels, and never says bot", () => {
    expect(OAUTH_CONSENT_COPY.title).toBe(
      "You'll be this assistant's owner",
    );
    expect(OAUTH_CONSENT_COPY.sub).toContain(
      "does not give the assistant access",
    );
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
    expect(OAUTH_CONSENT_COPY.openLinkHint).toBe(
      "Open the link your assistant gave you to continue.",
    );
    const joined = Object.values(OAUTH_CONSENT_COPY).join(" ");
    expect(joined.toLowerCase()).not.toMatch(/\bbot\b/);
    expect(joined.toLowerCase()).not.toMatch(/\boauth\b/);
  });
});
