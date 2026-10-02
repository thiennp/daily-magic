import { ensureAgentAccessSchema } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { asRowArray, getSql } from "@/lib/db";

/** Human owner linked on agent_access_tokens.owner_user_id (nullable). */
export const resolveAgentLinkedOwnerUserId = async (
  agentUserId: string,
): Promise<string | null> => {
  await ensureAgentAccessSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT owner_user_id
      FROM agent_access_tokens
      WHERE user_id = ${agentUserId}
        AND owner_user_id IS NOT NULL
      LIMIT 1
    `,
  );
  const value = rows[0]?.owner_user_id;
  return typeof value === "string" && value.length > 0 ? value : null;
};

/** Preferred same-owner: linked human ownerUserId === project.owner_user_id. */
export const isAgentSameProjectOwner = async (input: {
  readonly agentUserId: string;
  readonly projectOwnerUserId: string;
}): Promise<boolean> => {
  const linked = await resolveAgentLinkedOwnerUserId(input.agentUserId);
  return linked !== null && linked === input.projectOwnerUserId;
};
