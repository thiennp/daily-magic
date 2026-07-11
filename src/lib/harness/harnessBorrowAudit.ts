import { asRowArray, getSql } from "@/lib/db";

const HARNESS_BORROW_RATE_LIMIT = 10;
const HARNESS_BORROW_WINDOW_MS = 60 * 60 * 1000;

export async function countRecentHarnessBorrows(
  borrowerUserId: string,
): Promise<number> {
  const sql = getSql();
  const windowStart = new Date(
    Date.now() - HARNESS_BORROW_WINDOW_MS,
  ).toISOString();
  const result = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS borrow_count
      FROM harness_borrows
      WHERE borrower_user_id = ${borrowerUserId}
        AND borrowed_at >= ${windowStart}
    `,
  );

  const count = result[0]?.borrow_count;
  return typeof count === "number" ? count : Number(count ?? 0);
}

export async function isHarnessBorrowRateLimited(
  borrowerUserId: string,
): Promise<boolean> {
  const recentCount = await countRecentHarnessBorrows(borrowerUserId);
  return recentCount >= HARNESS_BORROW_RATE_LIMIT;
}

export async function recordHarnessBorrow(input: {
  readonly borrowerUserId: string;
  readonly ownerUserId: string;
}): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO harness_borrows (borrower_user_id, owner_user_id)
    VALUES (${input.borrowerUserId}, ${input.ownerUserId})
  `;
}

export { HARNESS_BORROW_RATE_LIMIT };
