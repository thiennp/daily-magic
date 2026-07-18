import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { spawnAgentWitchClient } from "./spawnAgentWitchClient";

const tempDirs: string[] = [];

const createTempInstallDir = (): string => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "agent-witch-install-"),
  );
  tempDirs.push(tempDir);
  return tempDir;
};

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

describe("spawnAgentWitchClient", () => {
  it("fails when Agent Witch is not installed", () => {
    const installDir = createTempInstallDir();

    expect(spawnAgentWitchClient(installDir)).toEqual({
      ok: false,
      errorMessage: "Agent Witch install not found.",
    });
  });
});
