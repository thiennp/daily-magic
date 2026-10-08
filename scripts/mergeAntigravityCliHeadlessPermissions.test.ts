import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  AGENT_WITCH_ANTIGRAVITY_HEADLESS_COMMAND_ALLOW_RULE,
  resolveAntigravityCliSettingsJsonPath,
} from "./antigravityCliHeadlessPermissions.constant";
import { mergeAntigravityCliHeadlessPermissions } from "./mergeAntigravityCliHeadlessPermissions";

describe("mergeAntigravityCliHeadlessPermissions", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("appends command(*) without removing existing allow rules", () => {
    const home = fs.mkdtempSync(path.join(os.tmpdir(), "agy-settings-home-"));
    tempDirs.push(home);
    const settingsPath = resolveAntigravityCliSettingsJsonPath(home);
    fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    fs.writeFileSync(
      settingsPath,
      `${JSON.stringify(
        {
          permissions: {
            allow: ["command(git)"],
            ask: ["command(*)"],
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const result = mergeAntigravityCliHeadlessPermissions(home);
    expect(result.wrote).toBe(true);

    const parsed = JSON.parse(fs.readFileSync(settingsPath, "utf8")) as {
      permissions: { allow: string[]; ask: string[] };
    };
    expect(parsed.permissions.allow).toEqual([
      "command(git)",
      AGENT_WITCH_ANTIGRAVITY_HEADLESS_COMMAND_ALLOW_RULE,
    ]);
    expect(parsed.permissions.ask).toEqual(["command(*)"]);
  });

  it("is idempotent when the allow rule is already present", () => {
    const home = fs.mkdtempSync(path.join(os.tmpdir(), "agy-settings-home-"));
    tempDirs.push(home);
    const settingsPath = resolveAntigravityCliSettingsJsonPath(home);
    fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    fs.writeFileSync(
      settingsPath,
      `${JSON.stringify(
        {
          permissions: {
            allow: [AGENT_WITCH_ANTIGRAVITY_HEADLESS_COMMAND_ALLOW_RULE],
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const result = mergeAntigravityCliHeadlessPermissions(home);
    expect(result.wrote).toBe(false);
  });
});
