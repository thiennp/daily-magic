import { scryptSync } from "node:crypto";

export const deriveCursorCloudEncryptionKey = (authSecret: string): Buffer =>
  scryptSync(authSecret, "cursor-cloud-api-key-v1", 32);
