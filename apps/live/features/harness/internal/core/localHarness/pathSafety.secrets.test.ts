import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { assertReadableFileUnderHome, isSecretLikePath } from "./pathSafety";

describe("secret-like paths", () => {
  it("flags keys, tokens and credential folders", () => {
    for (const secret of [
      "/Users/me/.ssh/id_ed25519",
      "/Users/me/.aws/credentials",
      "/Users/me/app/.env.local",
      "/Users/me/.agent-witch/profiles/a@b.com/config.json",
      "/Users/me/certs/server.pem",
    ]) {
      expect(isSecretLikePath(secret)).toBe(true);
    }
    for (const fine of [
      "/Users/me/.cursor/rules/style.mdc",
      "/Users/me/code/app/src/index.ts",
      "/Users/me/code/app/config.json",
    ]) {
      expect(isSecretLikePath(fine)).toBe(false);
    }
  });

  it("does not hand out a secret file under the home folder", () => {
    const dir = fs.mkdtempSync(path.join(os.homedir(), ".aw-path-test-"));
    try {
      const ssh = path.join(dir, ".ssh");
      fs.mkdirSync(ssh);
      fs.writeFileSync(path.join(ssh, "id_rsa"), "secret");
      fs.writeFileSync(path.join(dir, "notes.md"), "ok");
      expect(assertReadableFileUnderHome(path.join(ssh, "id_rsa"))).toBeNull();
      expect(
        assertReadableFileUnderHome(path.join(dir, "notes.md")),
      ).not.toBeNull();
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
