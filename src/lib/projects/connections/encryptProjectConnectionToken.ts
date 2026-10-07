import { createCipheriv, randomBytes } from "node:crypto";

import { deriveProjectConnectionEncryptionKey } from "@/lib/projects/connections/deriveProjectConnectionEncryptionKey";

export const encryptProjectConnectionToken = (
  token: string,
  authSecret: string,
): { readonly ciphertext: string; readonly iv: string } => {
  const key = deriveProjectConnectionEncryptionKey(authSecret);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return {
    ciphertext: Buffer.concat([encrypted, tag]).toString("base64"),
    iv: iv.toString("base64"),
  };
};
