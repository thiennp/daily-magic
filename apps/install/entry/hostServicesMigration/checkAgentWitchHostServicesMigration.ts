import { readAgentWitchHostServices } from "@agent-witch/install-layout";

import { appendAgentWitchHostServicesMigrationLog } from "./appendAgentWitchHostServicesMigrationLog";
import { describeAgentWitchHostServicesMigration } from "./describeAgentWitchHostServicesMigration";
import { acquireAgentWitchHostServicesMigrationLock } from "./hostServicesMigrationLock";
import { listAgentWitchMigratableAccounts } from "./listAgentWitchMigratableAccounts";
import type { AgentWitchHostServicesMigrationResult } from "./migrateAgentWitchMonolithToAccountServices";
import { planAgentWitchHostServicesMigration } from "./planAgentWitchHostServicesMigration";

const planResult = (
  installDir: string,
): AgentWitchHostServicesMigrationResult => {
  const services = readAgentWitchHostServices(installDir);
  const plan = planAgentWitchHostServicesMigration({
    accounts: listAgentWitchMigratableAccounts(installDir),
    existing: services,
  });
  if (plan.kind === "skip") {
    return { kind: "skipped", reason: plan.reason };
  }
  if (plan.kind === "noop" && services !== null) {
    return { kind: "noop", services };
  }
  return {
    kind: "pending",
    pendingEmails: plan.kind === "migrate" ? plan.newEmails : [],
  };
};

/**
 * d5e39215: a restarted account host re-runs the idempotent migration check
 * without side effects (no service start/stop, plists or backups: an
 * account host verifying itself before it is up would roll back) and logs
 * the result to logs/host-services-migration.log.
 */
export const checkAgentWitchHostServicesMigration = (input: {
  readonly installDir: string;
}): AgentWitchHostServicesMigrationResult => {
  const lock = acquireAgentWitchHostServicesMigrationLock(input.installDir);
  const result: AgentWitchHostServicesMigrationResult =
    lock === null
      ? { kind: "busy" }
      : (() => {
          try {
            return planResult(input.installDir);
          } finally {
            lock.release();
          }
        })();
  appendAgentWitchHostServicesMigrationLog(
    input.installDir,
    `[agent-witch] Host services migration: ${describeAgentWitchHostServicesMigration(result)}`,
  );
  return result;
};
