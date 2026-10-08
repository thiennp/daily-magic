import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  acquireFolderWriteLock,
  releaseFolderWriteLocksForRun,
} from "./folderWriteLock";

describe("folderWriteLock", () => {
  const dirs: string[] = [];

  const createTempDir = () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "test-tmp-"));
    dirs.push(dir);
    return dir;
  };

  afterEach(() => {
    for (const d of dirs) {
      fs.rmSync(d, { recursive: true, force: true });
    }
    dirs.length = 0;
  });

  it("acquire/release", () => {
    const installDir = createTempDir();
    const res = acquireFolderWriteLock({
      installDir,
      accountEmail: "a@a.com",
      folderRealPath: "/a",
      runId: "r1",
    });
    expect(res.ok).toBe(true);

    releaseFolderWriteLocksForRun({ installDir, runId: "r1" });

    const res2 = acquireFolderWriteLock({
      installDir,
      accountEmail: "b@b.com",
      folderRealPath: "/a",
      runId: "r2",
    });
    expect(res2.ok).toBe(true);
  });

  it("same account second run shares the lock and file survives until both released", () => {
    const installDir = createTempDir();
    acquireFolderWriteLock({
      installDir,
      accountEmail: "a@a.com",
      folderRealPath: "/a",
      runId: "r1",
    });

    const res2 = acquireFolderWriteLock({
      installDir,
      accountEmail: "a@a.com",
      folderRealPath: "/a",
      runId: "r2",
    });
    expect(res2.ok).toBe(true);

    releaseFolderWriteLocksForRun({ installDir, runId: "r1" });

    const res3 = acquireFolderWriteLock({
      installDir,
      accountEmail: "b@b.com",
      folderRealPath: "/a",
      runId: "r3",
    });
    expect(res3.ok).toBe(false);

    releaseFolderWriteLocksForRun({ installDir, runId: "r2" });

    const res4 = acquireFolderWriteLock({
      installDir,
      accountEmail: "b@b.com",
      folderRealPath: "/a",
      runId: "r4",
    });
    expect(res4.ok).toBe(true);
  });

  it("other account refused while held", () => {
    const installDir = createTempDir();
    acquireFolderWriteLock({
      installDir,
      accountEmail: "a@a.com",
      folderRealPath: "/a",
      runId: "r1",
    });

    const res = acquireFolderWriteLock({
      installDir,
      accountEmail: "b@b.com",
      folderRealPath: "/a",
      runId: "r2",
    });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.holderAccountEmail).toBe("a@a.com");
    }
  });

  it("stale lock is taken over", () => {
    const installDir = createTempDir();
    acquireFolderWriteLock({
      installDir,
      accountEmail: "a@a.com",
      folderRealPath: "/a",
      runId: "r1",
    });

    const res = acquireFolderWriteLock({
      installDir,
      accountEmail: "b@b.com",
      folderRealPath: "/a",
      runId: "r2",
      isProcessAlive: () => false,
    });
    expect(res.ok).toBe(true);
  });

  it("malformed lock file is taken over", () => {
    const installDir = createTempDir();
    acquireFolderWriteLock({
      installDir,
      accountEmail: "a@a.com",
      folderRealPath: "/a",
      runId: "r1",
    });

    const locksDir = path.join(installDir, "folder-write-locks");
    const files = fs.readdirSync(locksDir);
    fs.writeFileSync(path.join(locksDir, files[0]), "{ bad json");

    const res = acquireFolderWriteLock({
      installDir,
      accountEmail: "b@b.com",
      folderRealPath: "/a",
      runId: "r2",
    });
    expect(res.ok).toBe(true);
  });
});
