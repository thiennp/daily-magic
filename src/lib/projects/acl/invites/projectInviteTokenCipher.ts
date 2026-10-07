import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from "node:crypto";

import { PROJECT_INVITE_TOKEN_ENCRYPT_SALT } from "@/lib/projects/acl/invites/projectInvite.constants";

/**
 * Invite token at rest (107): same scheme as project connection tokens and
 * the Cursor Cloud API key — AES-256-GCM, key = scrypt(AUTH_SECRET, purpose
 * salt), 12-byte IV, 16-byte tag appended to the ciphertext (base64).
 * A dedicated salt keeps invite ciphertexts unusable with other purpose keys.
 */
const deriveKey = (authSecret: string): Buffer =>
  scryptSync(authSecret, PROJECT_INVITE_TOKEN_ENCRYPT_SALT, 32);

export type ProjectInviteTokenCiphertext = {
  readonly ciphertext: string;
  readonly iv: string;
};

/** AUTH_SECRET or null (null = store no ciphertext; Copy later unavailable). */
export const resolveProjectInviteTokenSecret = (): string | null => {
  const secret = process.env.AUTH_SECRET;
  return typeof secret === "string" && secret.length > 0 ? secret : null;
};

export const encryptProjectInviteToken = (
  token: string,
  authSecret: string,
): ProjectInviteTokenCiphertext => {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", deriveKey(authSecret), iv);
  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);
  return {
    ciphertext: Buffer.concat([encrypted, cipher.getAuthTag()]).toString(
      "base64",
    ),
    iv: iv.toString("base64"),
  };
};

/** Throws on a wrong secret or tampered data (GCM auth tag). */
export const decryptProjectInviteToken = (
  stored: ProjectInviteTokenCiphertext,
  authSecret: string,
): string => {
  const data = Buffer.from(stored.ciphertext, "base64");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    deriveKey(authSecret),
    Buffer.from(stored.iv, "base64"),
  );
  decipher.setAuthTag(data.subarray(data.length - 16));
  return Buffer.concat([
    decipher.update(data.subarray(0, data.length - 16)),
    decipher.final(),
  ]).toString("utf8");
};

/** Encrypt when AUTH_SECRET is set; otherwise null (never throws). */
export const tryEncryptProjectInviteToken = (
  token: string,
): ProjectInviteTokenCiphertext | null => {
  const secret = resolveProjectInviteTokenSecret();
  if (secret === null) return null;
  try {
    return encryptProjectInviteToken(token, secret);
  } catch {
    return null;
  }
};
