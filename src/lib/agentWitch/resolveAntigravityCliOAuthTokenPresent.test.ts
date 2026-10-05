import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  ANTIGRAVITY_CLI_GEMINI_STATE_DIR,
  ANTIGRAVITY_CLI_LEGACY_CREDENTIALS_RELATIVE_PATH,
  ANTIGRAVITY_CLI_OAUTH_TOKEN_FILENAME,
} from "@/lib/agentWitch/antigravityCliAuthLocations.constant";
import { resolveAntigravityCliOAuthTokenPresent } from "@/lib/agentWitch/resolveAntigravityCliOAuthTokenPresent";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

const makeTempHome = (): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-auth-home-"));
  tempDirs.push(dir);
  return dir;
};

describe("resolveAntigravityCliOAuthTokenPresent", () => {
  it("returns true when gemini antigravity-cli oauth token exists", () => {
    const home = makeTempHome();
    const tokenDir = path.join(home, ANTIGRAVITY_CLI_GEMINI_STATE_DIR);
    fs.mkdirSync(tokenDir, { recursive: true });
    fs.writeFileSync(
      path.join(tokenDir, ANTIGRAVITY_CLI_OAUTH_TOKEN_FILENAME),
      "token",
    );

    expect(resolveAntigravityCliOAuthTokenPresent(home)).toBe(true);
  });

  it("returns true for legacy agy credentials.json when present", () => {
    const home = makeTempHome();
    const legacyDir = path.join(
      home,
      path.dirname(ANTIGRAVITY_CLI_LEGACY_CREDENTIALS_RELATIVE_PATH),
    );
    fs.mkdirSync(legacyDir, { recursive: true });
    fs.writeFileSync(
      path.join(home, ANTIGRAVITY_CLI_LEGACY_CREDENTIALS_RELATIVE_PATH),
      "{}",
    );

    expect(resolveAntigravityCliOAuthTokenPresent(home)).toBe(true);
  });

  it("returns false when no auth files exist", () => {
    const home = makeTempHome();
    expect(resolveAntigravityCliOAuthTokenPresent(home)).toBe(false);
  });
});
