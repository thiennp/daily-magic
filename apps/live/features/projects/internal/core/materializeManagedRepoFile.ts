import fs from "node:fs";
import path from "node:path";

import type { AgentWitchMaterializationLedger } from "./agentWitchMaterializationLedger.types";
import { sha256FileAtPath, sha256Utf8Content } from "./sha256ProjectFile";

export type MaterializeManagedRepoFileResult =
  | { readonly kind: "written" }
  | { readonly kind: "skipped_unchanged" }
  | { readonly kind: "backed_up_user_file"; readonly backupPath: string };

const backupUserFile = (
  repoRoot: string,
  backupsDir: string,
  destinationAbsolute: string,
  repoRelativeDestination: string,
): string => {
  const timestamp = new Date().toISOString().replaceAll(":", "-");
  const backupAbsolute = path.join(
    backupsDir,
    timestamp,
    repoRelativeDestination,
  );
  fs.mkdirSync(path.dirname(backupAbsolute), { recursive: true });
  fs.copyFileSync(destinationAbsolute, backupAbsolute);
  const backupRelative = path
    .relative(repoRoot, backupAbsolute)
    .replaceAll("\\", "/");
  return backupRelative;
};

export const materializeManagedRepoFile = (input: {
  readonly repoRoot: string;
  readonly backupsDir: string;
  readonly repoRelativeDestination: string;
  readonly sourceAbsolutePath: string;
  readonly componentId: string;
  readonly versionId: string;
  readonly ledger: AgentWitchMaterializationLedger;
}): MaterializeManagedRepoFileResult => {
  const destinationAbsolute = path.join(
    input.repoRoot,
    input.repoRelativeDestination,
  );
  const sourceSha = sha256FileAtPath(input.sourceAbsolutePath);
  if (sourceSha === null) {
    throw new Error("Could not read harness source file.");
  }

  const existingEntry = input.ledger.entries[input.repoRelativeDestination];
  if (fs.existsSync(destinationAbsolute)) {
    const destSha = sha256FileAtPath(destinationAbsolute);
    if (destSha === sourceSha) {
      return { kind: "skipped_unchanged" };
    }

    const managedBySameComponent =
      existingEntry !== undefined &&
      existingEntry.componentId === input.componentId;

    if (!managedBySameComponent && destSha !== null) {
      const backupPath = backupUserFile(
        input.repoRoot,
        input.backupsDir,
        destinationAbsolute,
        input.repoRelativeDestination,
      );
      fs.mkdirSync(path.dirname(destinationAbsolute), { recursive: true });
      fs.copyFileSync(input.sourceAbsolutePath, destinationAbsolute);
      return { kind: "backed_up_user_file", backupPath };
    }
  }

  fs.mkdirSync(path.dirname(destinationAbsolute), { recursive: true });
  fs.copyFileSync(input.sourceAbsolutePath, destinationAbsolute);
  return { kind: "written" };
};

export const buildLedgerEntryForManagedFile = (input: {
  readonly componentId: string;
  readonly versionId: string;
  readonly sourceAbsolutePath: string;
  readonly backupPath?: string;
}): AgentWitchMaterializationLedger["entries"][string] => {
  const sha256 = sha256FileAtPath(input.sourceAbsolutePath);
  if (sha256 === null) {
    throw new Error("Could not hash harness source file.");
  }

  return {
    componentId: input.componentId,
    versionId: input.versionId,
    sha256,
    mode: "managed",
    writtenAt: new Date().toISOString(),
    ...(input.backupPath !== undefined ? { backupPath: input.backupPath } : {}),
  };
};

export const readUtf8FileIfExists = (absolutePath: string): string | null => {
  if (!fs.existsSync(absolutePath)) {
    return null;
  }

  try {
    return fs.readFileSync(absolutePath, "utf8");
  } catch {
    return null;
  }
};

export const verifyLedgerFileMatches = (
  absolutePath: string,
  expectedSha256: string,
): boolean => {
  const actual = sha256FileAtPath(absolutePath);
  return actual === expectedSha256;
};

export { sha256Utf8Content };
