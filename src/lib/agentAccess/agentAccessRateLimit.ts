import { asRowArray, getSql } from "@/lib/db";

import { AGENT_ACCESS_RATE_LIMIT_PER_HOUR } from "@/lib/agentAccess/agentAccess.constant";

export const countRecentAgentAccessAttempts = async (
  ipHash: string,
): Promise<number> => {
  const sql = getSql();
  const since = new Date(Date.now() - 60 * 60 * 1000);
  const rows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS attempt_count
      FROM agent_access_registration_attempts
      WHERE ip_hash = ${ipHash}
        AND created_at > ${since.toISOString()}
    `,
  );
  const count = rows[0]?.attempt_count;

  return typeof count === "number" ? count : Number(count ?? 0);
};

export const recordAgentAccessAttempt = async (
  ipHash: string,
): Promise<void> => {
  const sql = getSql();
  await sql`
    INSERT INTO agent_access_registration_attempts (ip_hash)
    VALUES (${ipHash})
  `;
};

export const isAgentAccessRateLimited = (attemptCount: number): boolean =>
  attemptCount >= AGENT_ACCESS_RATE_LIMIT_PER_HOUR;
