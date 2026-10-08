import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES } from "./antigravityCliPermissionAllowRules";
import { resolveAntigravityCliSettingsJsonPath } from "./antigravityCliHeadlessPermissions.constant";
import { mergeAntigravityCliHeadlessPermissions } from "./mergeAntigravityCliHeadlessPermissions";

describe("mergeAntigravityCliHeadlessPermissions", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("strips invalid allow rules and merges headless writer rules", () => {
    const home = fs.mkdtempSync(path.join(os.tmpdir(), "agy-settings-home-"));
    tempDirs.push(home);
    const settingsPath = resolveAntigravityCliSettingsJsonPath(home);
    fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    fs.writeFileSync(
      settingsPath,
      `${JSON.stringify(
        {
          permissions: {
            allow: ["read(*)", "command(git)"],
          },
          qaMarker: "keep",
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const result = mergeAntigravityCliHeadlessPermissions(home);
    expect(result.wrote).toBe(true);

    const parsed = JSON.parse(fs.readFileSync(settingsPath, "utf8")) as {
      permissions: { allow: string[] };
      qaMarker: string;
    };
    expect(parsed.qaMarker).toBe("keep");
    expect(parsed.permissions.allow).toEqual([
      "command(git)",
      ...AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES,
    ]);
    expect(parsed.permissions.allow).not.toContain("read(*)");
  });

  it("appends headless rules without removing existing valid allow rules", () => {
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
      ...AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES,
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
            allow: [...AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES],
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
