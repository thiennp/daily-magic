import { join } from "node:path";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { checkAgentWitchHostServicesMigration } from "./checkAgentWitchHostServicesMigration";
import { acquireAgentWitchHostServicesMigrationLock } from "./hostServicesMigrationLock";

describe("checkAgentWitchHostServicesMigration", () => {
  it("returns busy if locked", () => {
    const tmpDir = join(__dirname, ".tmp-check-locked-" + Date.now());
    rmSync(tmpDir, { recursive: true, force: true });
    mkdirSync(tmpDir, { recursive: true });
    const lock = acquireAgentWitchHostServicesMigrationLock(tmpDir);
    expect(lock).toBeDefined();

    try {
      const result = checkAgentWitchHostServicesMigration({
        installDir: tmpDir,
      });
      expect(result.kind).toBe("busy");
    } finally {
      lock?.release();
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("returns noop if nothing to migrate", () => {
    const tmpDir = join(__dirname, ".tmp-check-noop-" + Date.now());
    rmSync(tmpDir, { recursive: true, force: true });
    mkdirSync(tmpDir, { recursive: true });

    try {
      const result = checkAgentWitchHostServicesMigration({
        installDir: tmpDir,
      });
      expect(result.kind).toEqual("skipped");
      expect(result).toMatchObject({ reason: "no_accounts" });
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("returns pending if there are accounts to migrate", () => {
    const tmpDir = join(__dirname, ".tmp-check-pending-" + Date.now());
    rmSync(tmpDir, { recursive: true, force: true });
    mkdirSync(tmpDir, { recursive: true });

    try {
      const profileDir = join(tmpDir, "profiles", "a@x.com");
      mkdirSync(profileDir, { recursive: true });
      writeFileSync(join(profileDir, "config.json"), "{}");
      const profileDir2 = join(tmpDir, "profiles", "b@x.com");
      mkdirSync(profileDir2, { recursive: true });
      writeFileSync(join(profileDir2, "config.json"), "{}");

      const result = checkAgentWitchHostServicesMigration({
        installDir: tmpDir,
      });
      expect(result.kind).toBe("pending");
      if (result.kind === "pending") {
        expect(result.pendingEmails).toEqual(["a@x.com", "b@x.com"]);
      }
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
