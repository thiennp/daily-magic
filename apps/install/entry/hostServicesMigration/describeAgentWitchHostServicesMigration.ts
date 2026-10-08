import type { AgentWitchHostServicesMigrationResult } from "./migrateAgentWitchMonolithToAccountServices";

/** One log line per migration outcome. */
export const describeAgentWitchHostServicesMigration = (
  result: AgentWitchHostServicesMigrationResult,
): string => {
  switch (result.kind) {
    case "skipped":
      return `skipped (${result.reason})`;
    case "noop":
      return `noop (${String(result.services.accounts.length)} account services)`;
    case "migrated":
      return `migrated ${result.services.accounts.map((account) => account.email).join(", ")} (backup ${result.backupDir})`;
    case "rolled_back":
      return `rolled_back (${result.reason}; backup ${result.backupDir})`;
    case "busy":
      return "busy (another process is migrating)";
  }
};
