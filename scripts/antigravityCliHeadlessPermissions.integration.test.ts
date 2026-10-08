import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { mergeAntigravityCliHeadlessPermissions } from "./mergeAntigravityCliHeadlessPermissions";
import { resolveAntigravityCliSettingsJsonPath } from "./antigravityCliHeadlessPermissions.constant";

const resolveAgyBinary = (): string | null => {
  const candidates = [path.join(os.homedir(), ".local", "bin", "agy"), "agy"];
  for (const candidate of candidates) {
    try {
      execFileSync(candidate, ["--version"], { stdio: "pipe" });
      return candidate;
    } catch {
      // try next
    }
  }
  return null;
};

describe("antigravity headless permissions integration", () => {
  it.skipIf(resolveAgyBinary() === null)(
    "merged settings allow headless read of a fixture file",
    () => {
      const agy = resolveAgyBinary();
      if (agy === null) {
        return;
      }
      const home = fs.mkdtempSync(path.join(os.tmpdir(), "agy-integ-home-"));
      const fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-fixture-"));
      const fixtureFile = path.join(fixtureDir, "probe.txt");
      fs.writeFileSync(fixtureFile, "agy-headless-read-ok\n", "utf8");

      mergeAntigravityCliHeadlessPermissions(home);
      const settingsPath = resolveAntigravityCliSettingsJsonPath(home);
      const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8")) as {
        permissions: { allow: string[] };
      };
      expect(settings.permissions.allow).toContain("read_file(*)");

      const output = execFileSync(
        agy,
        [
          "--sandbox",
          "-p",
          `Read the file at ${fixtureFile} and reply with exactly its single line of text.`,
        ],
        {
          cwd: fixtureDir,
          env: {
            ...process.env,
            HOME: home,
          },
          encoding: "utf8",
          timeout: 120_000,
        },
      );

      expect(output).toContain("agy-headless-read-ok");
    },
  );
});
