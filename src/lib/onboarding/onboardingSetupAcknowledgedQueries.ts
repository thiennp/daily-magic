import { asRowArray, getSql } from "@/lib/db";

export async function getUserOnboardingSetupAcknowledged(
  userId: string,
): Promise<boolean> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT onboarding_setup_acknowledged
      FROM users
      WHERE id = ${userId}
    `,
  );

  return result[0]?.onboarding_setup_acknowledged === true;
}

export async function markUserOnboardingSetupAcknowledged(
  userId: string,
): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE users
    SET onboarding_setup_acknowledged = TRUE
    WHERE id = ${userId}
  `;
}
