import { randomUUID } from "node:crypto";

import { AUTH_SESSION_MAX_AGE_SECONDS } from "@/lib/auth/devSecret.constant";
import { createNeonAuthAdapter } from "@/lib/auth/neonAdapter";

const buildSessionExpiry = (): Date =>
  new Date(Date.now() + AUTH_SESSION_MAX_AGE_SECONDS * 1000);

const createDatabaseAuthSession = async (
  userId: string,
): Promise<{ readonly sessionToken: string; readonly expires: Date }> => {
  const adapter = createNeonAuthAdapter();
  const sessionToken = randomUUID();
  const expires = buildSessionExpiry();

  await adapter.createSession?.({
    sessionToken,
    userId,
    expires,
  });

  return { sessionToken, expires };
};

export default createDatabaseAuthSession;
