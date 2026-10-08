import fs from "node:fs";
import path from "node:path";

import {
  resolveAgentWitchAccountProfileDir,
  resolveAgentWitchLaunchAgentPrefix,
} from "@agent-witch/install-layout";
import type { AgentWitchHostServiceAccount } from "@agent-witch/install-layout/types";
import {
  AGENT_WITCH_SYSTEMD_USER_UNIT_NAME,
  resolveAgentWitchSystemdUserUnitDir,
} from "@agent-witch/install-linux-launch";
import { resolveAgentWitchAccountLaunchAgentPlistPath } from "@agent-witch/install-macos-launch";

export type AgentWitchBackupAccount = Pick<
  AgentWitchHostServiceAccount,
  "email" | "launchAgentLabel" | "systemdUnitName"
>;

export interface AgentWitchHostServicesBackupEntry {
  readonly originalPath: string;
  readonly backupName: string;
  readonly existed: boolean;
}

export interface AgentWitchHostServicesBackupManifest {
  readonly createdAt: string;
  readonly entries: readonly AgentWitchHostServicesBackupEntry[];
}

const MANIFEST_FILE_NAME = "manifest.json";

const formatBackupStamp = (now: Date): string =>
  now
    .toISOString()
    .replaceAll(/[-:]/g, "")
    .replace(/\.\d+Z$/, "Z");

/**
 * Service definitions, ports and discovery files the migration may write.
 * Never profile secrets (config.json, device-keypair.json, writer-api-secrets.json).
 */
export const listAgentWitchHostServicesBackupPaths = (input: {
  readonly installDir: string;
  readonly homeDir: string;
  readonly platform: NodeJS.Platform;
  readonly accounts: readonly AgentWitchBackupAccount[];
}): readonly string[] => {
  const unitDir = resolveAgentWitchSystemdUserUnitDir(input.homeDir);
  const serviceFiles =
    input.platform === "darwin"
      ? [
          resolveAgentWitchAccountLaunchAgentPlistPath(
            input.homeDir,
            resolveAgentWitchLaunchAgentPrefix(input.installDir),
          ),
          ...input.accounts.map((account) =>
            resolveAgentWitchAccountLaunchAgentPlistPath(
              input.homeDir,
              account.launchAgentLabel,
            ),
          ),
        ]
      : input.platform === "linux"
        ? [
            path.join(unitDir, AGENT_WITCH_SYSTEMD_USER_UNIT_NAME),
            ...input.accounts.map((account) =>
              path.join(unitDir, account.systemdUnitName),
            ),
          ]
        : [];
  return [
    ...serviceFiles,
    path.join(input.installDir, "wake-port.json"),
    path.join(input.installDir, "local-app-accounts.json"),
    path.join(input.installDir, "host-services.json"),
    ...input.accounts.flatMap((account) => {
      const profileDir = resolveAgentWitchAccountProfileDir(
        input.installDir,
        account.email,
      );
      return [
        path.join(profileDir, "wake-port.json"),
        path.join(profileDir, "local-app-port.json"),
      ];
    }),
  ];
};

/** Copies every listed file (mode kept) to `backups/host-services-<ts>/` + manifest.json. */
export const backupAgentWitchHostServicesFiles = (input: {
  readonly installDir: string;
  readonly homeDir: string;
  readonly platform: NodeJS.Platform;
  readonly accounts: readonly AgentWitchBackupAccount[];
  readonly now: Date;
}): string => {
  const backupDir = path.join(
    input.installDir,
    "backups",
    `host-services-${formatBackupStamp(input.now)}`,
  );
  fs.mkdirSync(backupDir, { recursive: true });
  const entries = listAgentWitchHostServicesBackupPaths(input).map(
    (originalPath, index): AgentWitchHostServicesBackupEntry => {
      const backupName = `${String(index).padStart(2, "0")}-${path.basename(originalPath)}`;
      if (!fs.existsSync(originalPath)) {
        return { originalPath, backupName, existed: false };
      }
      const backupPath = path.join(backupDir, backupName);
      fs.copyFileSync(originalPath, backupPath);
      fs.chmodSync(backupPath, fs.statSync(originalPath).mode);
      return { originalPath, backupName, existed: true };
    },
  );
  const manifest: AgentWitchHostServicesBackupManifest = {
    createdAt: input.now.toISOString(),
    entries,
  };
  fs.writeFileSync(
    path.join(backupDir, MANIFEST_FILE_NAME),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  return backupDir;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readManifestEntries = (
  backupDir: string,
): readonly AgentWitchHostServicesBackupEntry[] => {
  const parsed: unknown = JSON.parse(
    fs.readFileSync(path.join(backupDir, MANIFEST_FILE_NAME), "utf8"),
  );
  if (!isRecord(parsed) || !Array.isArray(parsed.entries)) {
    throw new Error(`Invalid backup manifest in ${backupDir}`);
  }
  return parsed.entries.flatMap((entry) =>
    isRecord(entry) &&
    typeof entry.originalPath === "string" &&
    typeof entry.backupName === "string" &&
    typeof entry.existed === "boolean"
      ? [
          {
            originalPath: entry.originalPath,
            backupName: entry.backupName,
            existed: entry.existed,
          },
        ]
      : [],
  );
};

/** Puts every backed-up file back and removes files that did not exist before. */
export const restoreAgentWitchHostServicesBackup = (
  backupDir: string,
): void => {
  for (const entry of readManifestEntries(backupDir)) {
    if (!entry.existed) {
      fs.rmSync(entry.originalPath, { force: true });
      continue;
    }
    const backupPath = path.join(backupDir, entry.backupName);
    fs.mkdirSync(path.dirname(entry.originalPath), { recursive: true });
    fs.copyFileSync(backupPath, entry.originalPath);
    fs.chmodSync(entry.originalPath, fs.statSync(backupPath).mode);
  }
};
