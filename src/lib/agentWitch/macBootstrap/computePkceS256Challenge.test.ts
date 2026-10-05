import { describe, expect, it } from "vitest";

import { computePkceS256Challenge } from "@/lib/agentWitch/macBootstrap/computePkceS256Challenge";
import { verifyPkceS256 } from "@/lib/agentWitch/macBootstrap/verifyPkceS256";

describe("PKCE S256", () => {
  it("matches RFC 7636 appendix B vector", () => {
    // https://datatracker.ietf.org/doc/html/rfc7636#appendix-B
    const verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
    const challenge = computePkceS256Challenge(verifier);
    expect(challenge).toBe("E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM");
    expect(
      verifyPkceS256({ codeVerifier: verifier, codeChallenge: challenge }),
    ).toBe(true);
    expect(
      verifyPkceS256({
        codeVerifier: verifier,
        codeChallenge: "wrong-challenge-value-paddingxxxx",
      }),
    ).toBe(false);
  });
});
