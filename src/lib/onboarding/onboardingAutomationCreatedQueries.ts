import { asRowArray, getSql } from "@/lib/db";

export async function getUserOnboardingAutomationCreated(
  userId: string,
): Promise<boolean> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT onboarding_automation_created
      FROM users
      WHERE id = ${userId}
    `,
  );

  return result[0]?.onboarding_automation_created === true;
}

export async function markUserOnboardingAutomationCreated(
  userId: string,
): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE users
    SET onboarding_automation_created = TRUE
    WHERE id = ${userId}
  `;
}
