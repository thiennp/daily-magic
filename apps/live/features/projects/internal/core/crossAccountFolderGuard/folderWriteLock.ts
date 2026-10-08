import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { FOLDER_WRITE_LOCKS_DIR_NAME } from "./crossAccountFolderGuard.constant";

export interface FolderWriteLockFile {
  readonly folderRealPath: string;
  readonly accountEmail: string;
  readonly pid: number;
  readonly runIds: readonly string[];
  readonly acquiredAt: string;
}

const defaultIsProcessAlive = (pid: number): boolean => {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
};

const getLockFilePath = (installDir: string, folderRealPath: string) => {
  const hash = crypto.createHash("sha256").update(folderRealPath).digest("hex");
  return path.join(installDir, FOLDER_WRITE_LOCKS_DIR_NAME, `${hash}.json`);
};

export const acquireFolderWriteLock = (input: {
  readonly installDir: string;
  readonly accountEmail: string;
  readonly folderRealPath: string;
  readonly runId: string;
  readonly isProcessAlive?: (pid: number) => boolean;
}):
  | { readonly ok: true }
  | { readonly ok: false; readonly holderAccountEmail: string } => {
  const isProcessAlive = input.isProcessAlive || defaultIsProcessAlive;
  const locksDir = path.join(input.installDir, FOLDER_WRITE_LOCKS_DIR_NAME);
  const lockFilePath = getLockFilePath(input.installDir, input.folderRealPath);
  const nowIso = new Date().toISOString();

  fs.mkdirSync(locksDir, { recursive: true });

  for (let attempt = 0; attempt < 3; attempt++) {
    const newLock: FolderWriteLockFile = {
      folderRealPath: input.folderRealPath,
      accountEmail: input.accountEmail,
      pid: process.pid,
      runIds: [input.runId],
      acquiredAt: nowIso,
    };

    try {
      fs.writeFileSync(lockFilePath, JSON.stringify(newLock, null, 2) + "\n", {
        flag: "wx",
      });
      return { ok: true };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
        throw error;
      }
    }

    let existingLock: FolderWriteLockFile | null = null;
    try {
      const raw = fs.readFileSync(lockFilePath, "utf-8");
      existingLock = JSON.parse(raw) as FolderWriteLockFile;
    } catch {
      // unreadable/malformed
    }

    if (
      !existingLock ||
      !existingLock.pid ||
      !isProcessAlive(existingLock.pid) ||
      !Array.isArray(existingLock.runIds) ||
      existingLock.runIds.length === 0
    ) {
      try {
        fs.unlinkSync(lockFilePath);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          throw error;
        }
      }
      continue;
    }

    if (
      existingLock.accountEmail.trim().toLowerCase() ===
      input.accountEmail.trim().toLowerCase()
    ) {
      if (!existingLock.runIds.includes(input.runId)) {
        const updatedLock: FolderWriteLockFile = {
          ...existingLock,
          runIds: [...existingLock.runIds, input.runId],
        };
        const tmpPath = `${lockFilePath}.${process.pid}.${Date.now()}.tmp`;
        fs.writeFileSync(
          tmpPath,
          JSON.stringify(updatedLock, null, 2) + "\n",
          "utf-8",
        );
        fs.renameSync(tmpPath, lockFilePath);
      }
      return { ok: true };
    }

    return { ok: false, holderAccountEmail: existingLock.accountEmail };
  }

  return { ok: false, holderAccountEmail: "unknown" };
};

export const releaseFolderWriteLocksForRun = (input: {
  readonly installDir: string;
  readonly runId: string;
}): void => {
  const locksDir = path.join(input.installDir, FOLDER_WRITE_LOCKS_DIR_NAME);
  let files: string[];
  try {
    files = fs.readdirSync(locksDir);
  } catch {
    return;
  }

  for (const file of files) {
    if (!file.endsWith(".json")) {
      continue;
    }
    const lockFilePath = path.join(locksDir, file);

    try {
      const raw = fs.readFileSync(lockFilePath, "utf-8");
      const lock = JSON.parse(raw) as FolderWriteLockFile;
      if (Array.isArray(lock.runIds) && lock.runIds.includes(input.runId)) {
        const newRunIds = lock.runIds.filter((id) => id !== input.runId);
        if (newRunIds.length === 0) {
          fs.unlinkSync(lockFilePath);
        } else {
          const updatedLock: FolderWriteLockFile = {
            ...lock,
            runIds: newRunIds,
          };
          const tmpPath = `${lockFilePath}.${process.pid}.${Date.now()}.tmp`;
          fs.writeFileSync(
            tmpPath,
            JSON.stringify(updatedLock, null, 2) + "\n",
            "utf-8",
          );
          fs.renameSync(tmpPath, lockFilePath);
        }
      }
    } catch {
      // ignore
    }
  }
};
