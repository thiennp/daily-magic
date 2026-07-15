import { asRowArray, getSql } from "@/lib/db";

export async function getUserOnboardingFirstTaskSent(
  userId: string,
): Promise<boolean> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT onboarding_first_task_sent
      FROM users
      WHERE id = ${userId}
    `,
  );

  return result[0]?.onboarding_first_task_sent === true;
}

export async function markUserOnboardingFirstTaskSent(
  userId: string,
): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE users
    SET onboarding_first_task_sent = TRUE
    WHERE id = ${userId}
  `;
}
