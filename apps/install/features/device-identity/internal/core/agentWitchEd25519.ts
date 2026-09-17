import {
  createPrivateKey,
  createPublicKey,
  generateKeyPairSync,
  randomBytes,
  sign,
  verify,
  type KeyObject,
} from "node:crypto";

const ED25519_SPKI_PREFIX = Buffer.from("302a300506032b6570032100", "hex");

export const encodeEd25519PublicKeyRaw = (publicKey: KeyObject): string => {
  const der = publicKey.export({ type: "spki", format: "der" });
  const raw = der.subarray(der.length - 32);
  return raw.toString("base64url");
};

export const decodeEd25519PublicKeyRaw = (rawBase64Url: string): KeyObject => {
  const raw = Buffer.from(rawBase64Url, "base64url");
  if (raw.length !== 32) {
    throw new Error("Ed25519 public key must be 32 bytes");
  }
  return createPublicKey({
    key: Buffer.concat([ED25519_SPKI_PREFIX, raw]),
    format: "der",
    type: "spki",
  });
};

export const generateAgentWitchEd25519KeyPair = (): {
  readonly publicKeyRaw: string;
  readonly privateKeyPem: string;
} => {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  return {
    publicKeyRaw: encodeEd25519PublicKeyRaw(publicKey),
    privateKeyPem: privateKey
      .export({ type: "pkcs8", format: "pem" })
      .toString(),
  };
};

export const loadEd25519PrivateKeyPem = (pem: string): KeyObject =>
  createPrivateKey(pem);

export const signAgentWitchChallenge = (
  privateKey: KeyObject,
  challenge: string,
): string => {
  const signature = sign(null, Buffer.from(challenge, "utf8"), privateKey);
  return signature.toString("base64url");
};

export const verifyAgentWitchChallenge = (
  publicKeyRaw: string,
  challenge: string,
  signatureBase64Url: string,
): boolean => {
  try {
    const publicKey = decodeEd25519PublicKeyRaw(publicKeyRaw);
    return verify(
      null,
      Buffer.from(challenge, "utf8"),
      publicKey,
      Buffer.from(signatureBase64Url, "base64url"),
    );
  } catch {
    return false;
  }
};

export const buildDeviceAuthChallengePayload = (input: {
  readonly nonce: string;
  readonly origin: string;
  readonly publicKeyRaw: string;
}): string => `${input.origin}\n${input.publicKeyRaw}\n${input.nonce}`;

export const createDeviceAuthNonce = (): string =>
  randomBytes(32).toString("base64url");
