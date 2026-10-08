import os from "node:os";

import {
  ensureAgentWitchAccountWakePort,
  readAgentWitchHostServices,
  readAgentWitchWakePortFromFile,
  resolveAgentWitchAccountLaunchAgentLabel,
  resolveAgentWitchAccountSystemdUnitName,
  writeAgentWitchHostServices,
} from "@agent-witch/install-layout";
import type {
  AgentWitchHostServiceAccount,
  AgentWitchHostServicesFile,
} from "@agent-witch/install-layout/types";
import { writeAgentWitchAccountSystemdUnit } from "@agent-witch/install-linux-launch";
import { writeAgentWitchAccountLaunchAgentPlist } from "@agent-witch/install-macos-launch";

import { startAgentWitchAccountHosts } from "../hostLauncher/startAgentWitchAccountHosts";
import { stopAgentWitchAccountHosts } from "../hostLauncher/stopAgentWitchAccountHosts";
import { isAgentWitchProcessRunningUnderSystemdUserService } from "../legacyScriptDeps";

import {
  backupAgentWitchHostServicesFiles,
  restoreAgentWitchHostServicesBackup,
} from "./backupAgentWitchHostServicesFiles";
import { acquireAgentWitchHostServicesMigrationLock } from "./hostServicesMigrationLock";
import {
  appendAgentWitchHostServicesMigrationAttempt,
  readLastAgentWitchHostServicesMigrationAttempt,
} from "./hostServicesMigrationState";
import { listAgentWitchMigratableAccounts } from "./listAgentWitchMigratableAccounts";
import { planAgentWitchHostServicesMigration } from "./planAgentWitchHostServicesMigration";
import { verifyAgentWitchAccountHostsUp } from "./verifyAgentWitchAccountHostsUp";

export interface AgentWitchHostServicesMigrationDeps {
  readonly isRunningUnderSystemd: () => boolean;
  readonly startAccountHosts: (
    services: AgentWitchHostServicesFile,
  ) => Promise<unknown>;
  readonly stopAccountHosts: (
    services: AgentWitchHostServicesFile,
    emails: readonly string[],
  ) => Promise<unknown>;
  readonly verifyAccountHostsUp: (
    accounts: readonly AgentWitchHostServiceAccount[],
  ) => Promise<
    { readonly ok: true } | { readonly ok: false; readonly reason: string }
  >;
  readonly acquireLock: typeof acquireAgentWitchHostServicesMigrationLock;
  /** undefined = free 127.0.0.1 port from the OS. */
  readonly allocateWakePort: (() => Promise<number>) | undefined;
  readonly log: (message: string) => void;
}

export type AgentWitchHostServicesMigrationResult =
  | { readonly kind: "skipped"; readonly reason: string }
  | { readonly kind: "noop"; readonly services: AgentWitchHostServicesFile }
  | {
      readonly kind: "migrated";
      readonly services: AgentWitchHostServicesFile;
      readonly backupDir: string;
    }
  | {
      readonly kind: "rolled_back";
      readonly reason: string;
      readonly backupDir: string;
    }
  | { readonly kind: "busy" };

const toMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const buildNewAccounts = async (input: {
  readonly installDir: string;
  readonly newEmails: readonly string[];
  readonly existing: readonly AgentWitchHostServiceAccount[];
  readonly allocateWakePort: (() => Promise<number>) | undefined;
}): Promise<readonly AgentWitchHostServiceAccount[]> => {
  const rootWakePort = readAgentWitchWakePortFromFile(input.installDir);
  const taken = [
    ...(rootWakePort === null ? [] : [rootWakePort]),
    ...input.existing.map((account) => account.wakePort),
  ];
  return input.newEmails.reduce<Promise<AgentWitchHostServiceAccount[]>>(
    async (previous, email) => {
      const built = await previous;
      const wakePort = await ensureAgentWitchAccountWakePort({
        installDir: input.installDir,
        email,
        avoidPorts: [...taken, ...built.map((account) => account.wakePort)],
        ...(input.allocateWakePort === undefined
          ? {}
          : { allocatePort: input.allocateWakePort }),
      });
      return [
        ...built,
        {
          email,
          launchAgentLabel: resolveAgentWitchAccountLaunchAgentLabel(
            input.installDir,
            email,
          ),
          systemdUnitName: resolveAgentWitchAccountSystemdUnitName(email),
          wakePort,
        },
      ];
    },
    Promise.resolve([]),
  );
};

const writeServiceDefinitions = (input: {
  readonly installDir: string;
  readonly homeDir: string;
  readonly platform: NodeJS.Platform;
  readonly accounts: readonly AgentWitchHostServiceAccount[];
  readonly isRunningUnderSystemd: () => boolean;
}): void => {
  for (const account of input.accounts) {
    if (input.platform === "darwin") {
      writeAgentWitchAccountLaunchAgentPlist({
        installDir: input.installDir,
        homeDir: input.homeDir,
        account,
      });
    } else if (input.platform === "linux" && input.isRunningUnderSystemd()) {
      writeAgentWitchAccountSystemdUnit({
        installDir: input.installDir,
        homeDir: input.homeDir,
        account,
      });
    }
  }
};

/**
 * AWL-ISO-4: turn a single-service multi-account host into one service per
 * account (idempotent, backup first, rollback when the account hosts do not
 * come up). Profiles, pairing keys and AWL ports are never rewritten; the
 * legacy com.agent-witch / agent-witch.service stays as the launcher.
 */
export const migrateAgentWitchMonolithToAccountServices = async (input: {
  readonly installDir: string;
  readonly bundleVersion: string;
  readonly homeDir?: string;
  readonly platform?: NodeJS.Platform;
  readonly selfPid?: number;
  readonly now?: () => Date;
  readonly deps?: Partial<AgentWitchHostServicesMigrationDeps>;
}): Promise<AgentWitchHostServicesMigrationResult> => {
  const homeDir = input.homeDir ?? os.homedir();
  const platform = input.platform ?? process.platform;
  const selfPid = input.selfPid ?? process.pid;
  const now = input.now ?? (() => new Date());
  const deps: AgentWitchHostServicesMigrationDeps = {
    isRunningUnderSystemd: isAgentWitchProcessRunningUnderSystemdUserService,
    startAccountHosts: (services) =>
      startAgentWitchAccountHosts({
        installDir: input.installDir,
        homeDir,
        platform,
        services,
      }),
    stopAccountHosts: (services, emails) =>
      stopAgentWitchAccountHosts({
        installDir: input.installDir,
        services,
        onlyEmails: emails,
        disable: true,
        homeDir,
        platform,
        selfPid,
      }),
    verifyAccountHostsUp: (accounts) =>
      verifyAgentWitchAccountHostsUp({
        installDir: input.installDir,
        accounts,
        selfPid,
      }),
    acquireLock: acquireAgentWitchHostServicesMigrationLock,
    allocateWakePort: undefined,
    log: (message) => {
      console.log(message);
    },
    ...input.deps,
  };

  const lock = deps.acquireLock(input.installDir);
  if (lock === null) {
    return { kind: "busy" };
  }
  try {
    const last = readLastAgentWitchHostServicesMigrationAttempt(
      input.installDir,
    );
    if (
      last?.result === "rolled_back" &&
      last.bundleVersion === input.bundleVersion
    ) {
      return { kind: "skipped", reason: "rolled_back_on_this_bundle" };
    }
    const existing = readAgentWitchHostServices(input.installDir);
    const plan = planAgentWitchHostServicesMigration({
      accounts: listAgentWitchMigratableAccounts(input.installDir),
      existing,
    });
    if (plan.kind === "skip") {
      return { kind: "skipped", reason: plan.reason };
    }
    if (plan.kind === "noop" && existing !== null) {
      return { kind: "noop", services: existing };
    }
    const newEmails = plan.kind === "migrate" ? plan.newEmails : [];
    const existingAccounts = existing?.accounts ?? [];

    // Backup first so files created below (wake-port.json, plists, units) are
    // recorded as new and removed again on rollback.
    const backupDir = backupAgentWitchHostServicesFiles({
      installDir: input.installDir,
      homeDir,
      platform,
      accounts: [
        ...existingAccounts,
        ...newEmails.map((email) => ({
          email,
          launchAgentLabel: resolveAgentWitchAccountLaunchAgentLabel(
            input.installDir,
            email,
          ),
          systemdUnitName: resolveAgentWitchAccountSystemdUnitName(email),
        })),
      ],
      now: now(),
    });

    const pending: { services: AgentWitchHostServicesFile | null } = {
      services: null,
    };
    try {
      const newAccounts = await buildNewAccounts({
        installDir: input.installDir,
        newEmails,
        existing: existingAccounts,
        allocateWakePort: deps.allocateWakePort,
      });
      const accounts = [...existingAccounts, ...newAccounts];
      writeServiceDefinitions({
        installDir: input.installDir,
        homeDir,
        platform,
        accounts,
        isRunningUnderSystemd: deps.isRunningUnderSystemd,
      });
      const services = writeAgentWitchHostServices(
        input.installDir,
        accounts,
        now(),
      );
      pending.services = services;
      await deps.startAccountHosts(services);
      const verified = await deps.verifyAccountHostsUp(accounts);
      if (!verified.ok) {
        throw new Error(verified.reason);
      }
      appendAgentWitchHostServicesMigrationAttempt(input.installDir, {
        at: now().toISOString(),
        bundleVersion: input.bundleVersion,
        result: "migrated",
        backupDir,
      });
      return { kind: "migrated", services, backupDir };
    } catch (error) {
      const reason = toMessage(error);
      deps.log(
        `[agent-witch] Host services migration failed (${reason}); rolling back from ${backupDir}.`,
      );
      if (pending.services !== null) {
        await deps
          .stopAccountHosts(pending.services, newEmails)
          .catch((stopError: unknown) => {
            deps.log(
              `[agent-witch] Rollback could not stop account hosts: ${toMessage(stopError)}`,
            );
          });
      }
      try {
        restoreAgentWitchHostServicesBackup(backupDir);
      } catch (restoreError) {
        deps.log(
          `[agent-witch] Rollback could not restore ${backupDir}: ${toMessage(restoreError)}`,
        );
      }
      appendAgentWitchHostServicesMigrationAttempt(input.installDir, {
        at: now().toISOString(),
        bundleVersion: input.bundleVersion,
        result: "rolled_back",
        reason,
        backupDir,
      });
      return { kind: "rolled_back", reason, backupDir };
    }
  } finally {
    lock.release();
  }
};
