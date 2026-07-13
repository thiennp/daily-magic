import type { AdapterUser } from "next-auth/adapters";

import { createNeonAuthAdapter } from "@/lib/auth/neonAdapter";

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

  return (await adapter.createUser?.(newUser as AdapterUser)) ?? null;
};

export default findOrCreateUserByEmail;
