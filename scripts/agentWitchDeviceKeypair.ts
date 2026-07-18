import fs from "node:fs";
import path from "node:path";

import {
  buildDeviceAuthChallengePayload,
  createDeviceAuthNonce,
  generateAgentWitchEd25519KeyPair,
  loadEd25519PrivateKeyPem,
  signAgentWitchChallenge,
  verifyAgentWitchChallenge,
} from "./agentWitchEd25519";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

const DEVICE_KEYPAIR_FILE_NAME = "device-keypair.json";

export type AgentWitchDeviceKeypair = {
  readonly publicKeyRaw: string;
  readonly privateKeyPem: string;
};

const resolveKeypairPath = (layout: AgentWitchLocalLayout): string =>
  path.join(layout.installDir, DEVICE_KEYPAIR_FILE_NAME);

export const loadOrCreateAgentWitchDeviceKeypair = (
  layout: AgentWitchLocalLayout,
): AgentWitchDeviceKeypair => {
  const keypairPath = resolveKeypairPath(layout);
  if (fs.existsSync(keypairPath)) {
    const raw = fs.readFileSync(keypairPath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "publicKeyRaw" in parsed &&
      "privateKeyPem" in parsed &&
      typeof (parsed as AgentWitchDeviceKeypair).publicKeyRaw === "string" &&
      typeof (parsed as AgentWitchDeviceKeypair).privateKeyPem === "string"
    ) {
      return parsed as AgentWitchDeviceKeypair;
    }
  }

  const generated = generateAgentWitchEd25519KeyPair();
  fs.mkdirSync(path.dirname(keypairPath), { recursive: true });
  fs.writeFileSync(keypairPath, JSON.stringify(generated, null, 2), {
    mode: 0o600,
  });
  return generated;
};

export const buildDeviceAuthHelloFields = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly origin: string;
  readonly claimToken?: string;
}): {
  readonly devicePublicKey: string;
  readonly nonce: string;
  readonly signature: string;
  readonly origin: string;
  readonly claimToken?: string;
} => {
  const keypair = loadOrCreateAgentWitchDeviceKeypair(input.layout);
  const nonce = createDeviceAuthNonce();
  const challenge = buildDeviceAuthChallengePayload({
    nonce,
    origin: input.origin,
    publicKeyRaw: keypair.publicKeyRaw,
  });
  const privateKey = loadEd25519PrivateKeyPem(keypair.privateKeyPem);
  const signature = signAgentWitchChallenge(privateKey, challenge);
  return {
    devicePublicKey: keypair.publicKeyRaw,
    nonce,
    signature,
    origin: input.origin,
    ...(input.claimToken !== undefined ? { claimToken: input.claimToken } : {}),
  };
};

export const verifyServerAttestationLocally = (input: {
  readonly serverPublicKey: string;
  readonly origin: string;
  readonly devicePublicKey: string;
  readonly challenge: string;
  readonly serverAttestation: string;
}): boolean => {
  const attestationPayload = `${input.origin}\n${input.devicePublicKey}\n${input.challenge}`;
  return verifyAgentWitchChallenge(
    input.serverPublicKey,
    attestationPayload,
    input.serverAttestation,
  );
};
