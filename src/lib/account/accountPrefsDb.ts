import { asRowArray, getSql } from "@/lib/db";
import {
  sanitizeAccountPrefs,
  type AccountPrefs,
} from "@/lib/account/accountPrefs";

const state: { promise: Promise<void> | null } = { promise: null };

/** Idempotent runtime twin of db/migrations/127-users-account-prefs.sql. */
const ensureAccountPrefsColumn = (): Promise<void> => {
  if (state.promise === null) {
    state.promise = getSql()`
      ALTER TABLE users
        ADD COLUMN IF NOT EXISTS account_prefs JSONB NOT NULL DEFAULT '{}'::jsonb
    `
      .then(() => undefined)
      .catch((error: unknown) => {
        state.promise = null;
        throw error;
      });
  }
  return state.promise;
};

export const loadAccountPrefs = async (
  userId: string,
): Promise<{ readonly name: string | null; readonly prefs: AccountPrefs }> => {
  await ensureAccountPrefsColumn();
  const row = asRowArray(
    await getSql()`SELECT name, account_prefs FROM users WHERE id = ${userId}`,
  )[0];
  return {
    name:
      row?.name === null || row?.name === undefined ? null : String(row.name),
    prefs: sanitizeAccountPrefs(row?.account_prefs),
  };
};

export const saveAccountName = async (
  userId: string,
  name: string,
): Promise<void> => {
  await getSql()`UPDATE users SET name = ${name} WHERE id = ${userId}`;
};

export const saveAccountPrefs = async (
  userId: string,
  prefs: AccountPrefs,
): Promise<void> => {
  await ensureAccountPrefsColumn();
  await getSql()`
    UPDATE users SET account_prefs = ${JSON.stringify(prefs)}::jsonb
    WHERE id = ${userId}
  `;
};
