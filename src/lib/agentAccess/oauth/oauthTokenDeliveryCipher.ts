import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from "node:crypto";

const PREFIX = "enc:v1:";
const SALT = "agentwitch-oauth-token-delivery-v1";

const deriveKey = (authSecret: string): Buffer =>
  scryptSync(authSecret, SALT, 32);

const readSecret = (): string | null => {
  const secret = process.env.AUTH_SECRET;
  return typeof secret === "string" && secret.length > 0 ? secret : null;
};

/**
 * OAuth tokens wait here until the client exchanges its code. AES-256-GCM with a key derived from
 * AUTH_SECRET (own salt), so a database read or backup leak does not hand out live bearer tokens.
 * Without AUTH_SECRET the value is stored as is (the app cannot sign anyone in then either).
 */
export const sealOauthDeliveryToken = (token: string): string => {
  const secret = readSecret();
  if (secret === null) return token;
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", deriveKey(secret), iv);
  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);
  const sealed = Buffer.concat([encrypted, cipher.getAuthTag()]).toString(
    "base64",
  );
  return `${PREFIX}${iv.toString("base64")}:${sealed}`;
};

/** Reads a sealed value; a value without the prefix is a legacy plaintext row. */
export const openOauthDeliveryToken = (stored: string): string => {
  if (!stored.startsWith(PREFIX)) return stored;
  const secret = readSecret();
  if (secret === null)
    throw new Error("AUTH_SECRET is required to read OAuth tokens.");
  const [ivB64, dataB64] = stored.slice(PREFIX.length).split(":");
  const data = Buffer.from(dataB64 ?? "", "base64");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    deriveKey(secret),
    Buffer.from(ivB64 ?? "", "base64"),
  );
  decipher.setAuthTag(data.subarray(data.length - 16));
  return Buffer.concat([
    decipher.update(data.subarray(0, data.length - 16)),
    decipher.final(),
  ]).toString("utf8");
};
