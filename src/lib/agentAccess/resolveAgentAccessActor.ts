import { asRowArray, getSql } from "@/lib/db";
import { GlobalRole } from "@/lib/auth/roles";
import type AuthActor from "@/lib/auth/types/AuthActor.type";

import { hashAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import { ensureAgentAccessSchema } from "@/lib/agentAccess/ensureAgentAccessSchema";
import type { AgentAccessRegistrationMethod } from "@/lib/agentAccess/agentAccess.constant";

export interface AgentAccessActor extends AuthActor {
  readonly name: string | null;
  readonly registrationMethod: AgentAccessRegistrationMethod;
}

const readMethod = (value: unknown): AgentAccessRegistrationMethod =>
  value === "agentmail" ? "agentmail" : "none";

export const resolveAgentAccessActor = async (
  token: string,
): Promise<AgentAccessActor | null> => {
  await ensureAgentAccessSchema();
  const sql = getSql();
  const tokenHash = hashAgentAccessToken(token);
  const rows = asRowArray(
    await sql`
      SELECT users.id, users.email, users.name, users.image, users.global_role,
             agent_access_tokens.registration_method
      FROM agent_access_tokens
      JOIN users ON users.id = agent_access_tokens.user_id
      WHERE agent_access_tokens.token_hash = ${tokenHash}
      LIMIT 1
    `,
  );
  const row = rows[0];

  if (
    row === undefined ||
    typeof row.email !== "string" ||
    typeof row.id !== "string"
  ) {
    return null;
  }

  await sql`
    UPDATE agent_access_tokens
    SET last_used_at = NOW()
    WHERE token_hash = ${tokenHash}
  `;

  return {
    id: row.id,
    email: row.email,
    name: typeof row.name === "string" ? row.name : null,
    globalRole: GlobalRole.USER,
    registrationMethod: readMethod(row.registration_method),
  };
};
