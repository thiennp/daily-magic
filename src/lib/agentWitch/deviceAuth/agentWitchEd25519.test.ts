import { describe, expect, it } from "vitest";

import {
  buildDeviceAuthChallengePayload,
  generateAgentWitchEd25519KeyPair,
  loadEd25519PrivateKeyPem,
  signAgentWitchChallenge,
  verifyAgentWitchChallenge,
} from "@/lib/agentWitch/deviceAuth/agentWitchEd25519";

describe("agentWitchEd25519", () => {
  it("signs and verifies a device auth challenge (AGENT-017)", () => {
    const keypair = generateAgentWitchEd25519KeyPair();
    const challenge = buildDeviceAuthChallengePayload({
      nonce: "nonce-1",
      origin: "https://www.agentwitch.com",
      publicKeyRaw: keypair.publicKeyRaw,
    });
    const privateKey = loadEd25519PrivateKeyPem(keypair.privateKeyPem);
    const signature = signAgentWitchChallenge(privateKey, challenge);

    expect(
      verifyAgentWitchChallenge(keypair.publicKeyRaw, challenge, signature),
    ).toBe(true);
    expect(
      verifyAgentWitchChallenge(keypair.publicKeyRaw, "tampered", signature),
    ).toBe(false);
  });
});
