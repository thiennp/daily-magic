import { getSql } from "@/lib/db";

/**
 * Signing in through the emailed link, or a Google account whose email Google
 * has verified, proves control of the address. Email-locked project invites
 * check this flag, so set it (once) after such a sign-in.
 */
export const markUserEmailVerified = async (userId: string): Promise<void> => {
  await getSql()`
    UPDATE users
    SET email_verified = NOW()
    WHERE id = ${userId} AND email_verified IS NULL
  `;
};
