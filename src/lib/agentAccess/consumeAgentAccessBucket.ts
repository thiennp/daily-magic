import { asRowArray, getSql } from "@/lib/db";

import { AGENT_ACCESS_RATE_LIMIT_WINDOW_SECONDS } from "@/lib/agentAccess/agentAccess.constant";
import { ensureAgentAccessSchema } from "@/lib/agentAccess/ensureAgentAccessSchema";

const countBucket = async (
  subjectHash: string,
  bucket: string,
): Promise<number> => {
  const sql = getSql();
  const since = new Date(
    Date.now() - AGENT_ACCESS_RATE_LIMIT_WINDOW_SECONDS * 1000,
  );
  const rows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS attempt_count
      FROM agent_access_api_attempts
      WHERE subject_hash = ${subjectHash}
        AND bucket = ${bucket}
        AND created_at > ${since.toISOString()}
    `,
  );
  const count = rows[0]?.attempt_count;

  return typeof count === "number" ? count : Number(count ?? 0);
};

export const countAgentAccessBucketAttempts = async (input: {
  readonly subjectHash: string;
  readonly bucket: string;
}): Promise<number> => {
  await ensureAgentAccessSchema();

  return countBucket(input.subjectHash, input.bucket);
};

export const recordAgentAccessBucketAttempt = async (input: {
  readonly subjectHash: string;
  readonly bucket: string;
}): Promise<void> => {
  await ensureAgentAccessSchema();
  const sql = getSql();
  await sql`
    INSERT INTO agent_access_api_attempts (subject_hash, bucket)
    VALUES (${input.subjectHash}, ${input.bucket})
  `;
};

export const consumeAgentAccessBucket = async (input: {
  readonly subjectHash: string;
  readonly bucket: string;
  readonly limit: number;
}): Promise<boolean> => {
  const recent = await countAgentAccessBucketAttempts(input);

  if (recent >= input.limit) {
    return false;
  }

  await recordAgentAccessBucketAttempt(input);

  return true;
};
