import { randomBytes } from "node:crypto";

import {
  buildDeviceAuthChallengePayload,
  verifyAgentWitchChallenge,
} from "@/lib/agentWitch/deviceAuth/agentWitchEd25519";
import { signAgentWitchServerAttestation } from "@/lib/agentWitch/deviceAuth/agentWitchServerSigningKey";

export type AgentDeviceAuthHelloPayload = {
  readonly devicePublicKey: string;
  readonly nonce: string;
  readonly signature: string;
  readonly origin: string;
  readonly claimToken?: string;
};

export type AgentDeviceAuthServerAttestation = {
  readonly challenge: string;
  readonly serverAttestation: string;
  readonly serverPublicKey: string;
  readonly origin: string;
};

export const verifyDeviceAuthHello = (
  payload: AgentDeviceAuthHelloPayload,
): boolean => {
  const challenge = buildDeviceAuthChallengePayload({
    nonce: payload.nonce,
    origin: payload.origin,
    publicKeyRaw: payload.devicePublicKey,
  });
  return verifyAgentWitchChallenge(
    payload.devicePublicKey,
    challenge,
    payload.signature,
  );
};

export const buildServerDeviceAuthAttestation = (input: {
  readonly origin: string;
  readonly devicePublicKey: string;
  readonly serverPublicKey: string;
}): AgentDeviceAuthServerAttestation => {
  const challenge = randomBytes(32).toString("base64url");
  const attestationPayload = `${input.origin}\n${input.devicePublicKey}\n${challenge}`;
  return {
    challenge,
    serverAttestation: signAgentWitchServerAttestation(attestationPayload),
    serverPublicKey: input.serverPublicKey,
    origin: input.origin,
  };
};
