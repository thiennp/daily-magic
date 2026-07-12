import { asRowArray, getSql } from "@/lib/db";

const CAPABILITY_FORK_RATE_LIMIT = 10;
const CAPABILITY_FORK_WINDOW_MS = 60 * 60 * 1000;

export async function countRecentCapabilityForks(
  borrowerUserId: string,
): Promise<number> {
  const sql = getSql();
  const windowStart = new Date(
    Date.now() - CAPABILITY_FORK_WINDOW_MS,
  ).toISOString();
  const result = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS fork_count
      FROM capability_forks
      WHERE borrower_user_id = ${borrowerUserId}
        AND forked_at >= ${windowStart}
    `,
  );

  const count = result[0]?.fork_count;
  return typeof count === "number" ? count : Number(count ?? 0);
}

export async function isCapabilityForkRateLimited(
  borrowerUserId: string,
): Promise<boolean> {
  const recentCount = await countRecentCapabilityForks(borrowerUserId);
  return recentCount >= CAPABILITY_FORK_RATE_LIMIT;
}

export async function recordCapabilityFork(input: {
  readonly borrowerUserId: string;
  readonly sourceCapabilityId: string;
  readonly forkedCapabilityId: string;
}): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO capability_forks (
      borrower_user_id,
      source_capability_id,
      forked_capability_id
    )
    VALUES (
      ${input.borrowerUserId},
      ${input.sourceCapabilityId},
      ${input.forkedCapabilityId}
    )
  `;
}

export { CAPABILITY_FORK_RATE_LIMIT };
