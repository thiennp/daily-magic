import type { AdapterUser } from "next-auth/adapters";

import { createNeonAuthAdapter } from "@/lib/auth/neonAdapter";
import { asRowArray, getSql } from "@/lib/db";
import { isAgentAccessSyntheticEmail } from "@/lib/agentAccess/isAgentAccessSyntheticEmail";
import type { AgentAccessRegisterFailure } from "@/lib/agentAccess/types/AgentAccessRegisterOutcome.type";

const readUserId = (row: unknown): string | null => {
  if (typeof row !== "object" || row === null) {
    return null;
  }

  const id = (row as { id?: unknown }).id;

  return typeof id === "string" ? id : null;
};

const userHasAgentAccessToken = async (userId: string): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id FROM agent_access_tokens WHERE user_id = ${userId} LIMIT 1
    `,
  );

  return rows.length > 0;
};

const createAgentAccessUser = async (
  email: string,
  displayName: string | null,
): Promise<AdapterUser | null> => {
  const adapter = createNeonAuthAdapter();
  const name = displayName ?? email.split("@")[0] ?? email;

  try {
    return (
      (await adapter.createUser?.({
        email,
        emailVerified: new Date(),
        name,
      } as AdapterUser)) ?? null
    );
  } catch {
    return null;
  }
};

const accountExistsFailure = (): AgentAccessRegisterFailure => ({
  ok: false,
  status: 409,
  error: "That account already exists. Register a new agent instead.",
  code: "account_exists",
});

export const resolveAgentAccessRegisterUser = async (input: {
  readonly email: string;
  readonly displayName: string | null;
}): Promise<string | AgentAccessRegisterFailure> => {
  const sql = getSql();
  const existingUserId = readUserId(
    asRowArray(
      await sql`SELECT id FROM users WHERE email = ${input.email} LIMIT 1`,
    )[0],
  );

  if (existingUserId === null) {
    const created = await createAgentAccessUser(input.email, input.displayName);

    if (created?.id !== undefined) {
      return created.id;
    }

    const racedUserId = readUserId(
      asRowArray(
        await sql`SELECT id FROM users WHERE email = ${input.email} LIMIT 1`,
      )[0],
    );

    return racedUserId === null
      ? {
          ok: false,
          status: 500,
          error: "Could not create the account.",
          code: "account_create_failed",
        }
      : accountExistsFailure();
  }

  if (await userHasAgentAccessToken(existingUserId)) {
    return accountExistsFailure();
  }

  if (!isAgentAccessSyntheticEmail(input.email)) {
    return accountExistsFailure();
  }

  return existingUserId;
};
