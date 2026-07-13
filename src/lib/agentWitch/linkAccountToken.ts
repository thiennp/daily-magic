import { createHmac, timingSafeEqual } from "node:crypto";

const LINK_ACCOUNT_TTL_MS = 5 * 60 * 1000;

export interface VerifiedLinkAccountToken {
  readonly userId: string;
  readonly email: string;
}

const readAuthSecret = (): string | null => {
  const secret = process.env.AUTH_SECRET?.trim();
  return secret !== undefined && secret.length > 0 ? secret : null;
};

export const createLinkAccountToken = (
  userId: string,
  email: string,
): string | null => {
  const secret = readAuthSecret();
  if (secret === null) {
    return null;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const expiresAt = Date.now() + LINK_ACCOUNT_TTL_MS;
  const payload = `${userId}:${normalizedEmail}:${expiresAt}`;
  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  return Buffer.from(`${payload}:${signature}`).toString("base64url");
};

export const verifyLinkAccountToken = (
  token: string,
): VerifiedLinkAccountToken | null => {
  const secret = readAuthSecret();
  if (secret === null) {
    return null;
  }

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const separatorIndex = decoded.lastIndexOf(":");
    if (separatorIndex < 0) {
      return null;
    }

    const payload = decoded.slice(0, separatorIndex);
    const signature = decoded.slice(separatorIndex + 1);
    const expectedSignature = createHmac("sha256", secret)
      .update(payload)
      .digest("base64url");

    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);
    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return null;
    }

    const [userId, email, expiresAtRaw] = payload.split(":");
    const expiresAt = Number(expiresAtRaw);
    if (
      userId === undefined ||
      email === undefined ||
      !Number.isFinite(expiresAt) ||
      expiresAt < Date.now()
    ) {
      return null;
    }

    return { userId, email };
  } catch {
    return null;
  }
};
