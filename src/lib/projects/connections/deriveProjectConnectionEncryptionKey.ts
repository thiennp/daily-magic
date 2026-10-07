import { scryptSync } from "node:crypto";

import { PROJECT_CONNECTIONS_ENCRYPT_SALT } from "@/lib/projects/connections/projectConnection.constants";

export const deriveProjectConnectionEncryptionKey = (
  authSecret: string,
): Buffer => scryptSync(authSecret, PROJECT_CONNECTIONS_ENCRYPT_SALT, 32);
