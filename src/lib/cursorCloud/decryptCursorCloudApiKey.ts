import { createDecipheriv } from "node:crypto";

import { deriveCursorCloudEncryptionKey } from "@/lib/cursorCloud/deriveCursorCloudEncryptionKey";

export const decryptCursorCloudApiKey = (
  ciphertext: string,
  iv: string,
  authSecret: string,
): string => {
  const key = deriveCursorCloudEncryptionKey(authSecret);
  const data = Buffer.from(ciphertext, "base64");
  const authTag = data.subarray(data.length - 16);
  const encrypted = data.subarray(0, data.length - 16);
  const decipher = createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(iv, "base64"),
  );
  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
    "utf8",
  );
};
