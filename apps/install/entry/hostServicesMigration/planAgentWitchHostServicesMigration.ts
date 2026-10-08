import type { AgentWitchHostServicesFile } from "@agent-witch/install-layout/types";

export type AgentWitchHostServicesMigrationPlan =
  | { readonly kind: "skip"; readonly reason: "single_account" | "no_accounts" }
  | { readonly kind: "noop" }
  | { readonly kind: "migrate"; readonly newEmails: readonly string[] };

/**
 * Pure. No host-services.json: 0 / 1 account is left alone, >= 2 migrate.
 * With host-services.json: add accounts installed later; never drop a listed one.
 */
export const planAgentWitchHostServicesMigration = (input: {
  readonly accounts: readonly string[];
  readonly existing: AgentWitchHostServicesFile | null;
}): AgentWitchHostServicesMigrationPlan => {
  if (input.existing === null) {
    if (input.accounts.length === 0) {
      return { kind: "skip", reason: "no_accounts" };
    }
    return input.accounts.length === 1
      ? { kind: "skip", reason: "single_account" }
      : { kind: "migrate", newEmails: input.accounts };
  }
  const listed = new Set(
    input.existing.accounts.map((account) => account.email),
  );
  const newEmails = input.accounts.filter((email) => !listed.has(email));
  return newEmails.length === 0
    ? { kind: "noop" }
    : { kind: "migrate", newEmails };
};
