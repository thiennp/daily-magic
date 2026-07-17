import type { AdapterUser } from "next-auth/adapters";

import { createNeonAuthAdapter } from "@/lib/auth/neonAdapter";
import isTestAgentWitchEmail from "@/lib/auth/isTestAgentWitchEmail";
import { appendE2eCleanupLogForTestEmail } from "@/lib/e2e/appendE2eCleanupLog";

const findOrCreateUserByEmail = async (
  email: string,
): Promise<AdapterUser | null> => {
  const adapter = createNeonAuthAdapter();
  const existingUser = await adapter.getUserByEmail?.(email);

  if (existingUser) {
    return existingUser;
  }

  const newUser = {
    email,
    emailVerified: new Date(),
    name: email.split("@")[0] ?? email,
  };

  const created = (await adapter.createUser?.(newUser as AdapterUser)) ?? null;

  if (created?.id && isTestAgentWitchEmail(email)) {
    appendE2eCleanupLogForTestEmail({
      email,
      kind: "user.created",
      entityType: "users",
      entityId: created.id,
    });
  }

  return created;
};

export default findOrCreateUserByEmail;
