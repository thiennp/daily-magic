import { createPublicKey, type KeyObject } from "node:crypto";

import {
  encodeEd25519PublicKeyRaw,
  generateAgentWitchEd25519KeyPair,
  loadEd25519PrivateKeyPem,
  signAgentWitchChallenge,
} from "@/lib/agentWitch/deviceAuth/agentWitchEd25519";

const agentWitchServerKeyGlobal = globalThis as typeof globalThis & {
  __dailyMagicAgentWitchServerPrivateKey?: KeyObject;
  __dailyMagicAgentWitchServerPublicKeyRaw?: string;
};

const resolveOrCreateServerKeyPair = (): {
  readonly privateKey: KeyObject;
  readonly publicKeyRaw: string;
} => {
  if (
    agentWitchServerKeyGlobal.__dailyMagicAgentWitchServerPrivateKey !==
      undefined &&
    agentWitchServerKeyGlobal.__dailyMagicAgentWitchServerPublicKeyRaw !==
      undefined
  ) {
    return {
      privateKey:
        agentWitchServerKeyGlobal.__dailyMagicAgentWitchServerPrivateKey,
      publicKeyRaw:
        agentWitchServerKeyGlobal.__dailyMagicAgentWitchServerPublicKeyRaw,
    };
  }

  const fromEnv = process.env.AGENT_WITCH_SERVER_SIGNING_KEY_PEM?.trim();
  const privateKeyPem =
    fromEnv !== undefined && fromEnv.length > 0
      ? fromEnv
      : generateAgentWitchEd25519KeyPair().privateKeyPem;

  const privateKey = loadEd25519PrivateKeyPem(privateKeyPem);
  const publicKeyRaw = encodeEd25519PublicKeyRaw(createPublicKey(privateKey));

  agentWitchServerKeyGlobal.__dailyMagicAgentWitchServerPrivateKey = privateKey;
  agentWitchServerKeyGlobal.__dailyMagicAgentWitchServerPublicKeyRaw =
    publicKeyRaw;

  return { privateKey, publicKeyRaw };
};

export const getAgentWitchServerPublicKeyRaw = (): string =>
  resolveOrCreateServerKeyPair().publicKeyRaw;

export const signAgentWitchServerAttestation = (challenge: string): string => {
  const { privateKey } = resolveOrCreateServerKeyPair();
  return signAgentWitchChallenge(privateKey, challenge);
};
