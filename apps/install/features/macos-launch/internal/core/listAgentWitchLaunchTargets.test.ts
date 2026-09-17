import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";

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

describe("listAgentWitchLaunchTargets (AGENT-059)", () => {
  it("returns a single canonical launch agent for an install home", () => {
    const installDir = createTempInstallDir();
    fs.writeFileSync(path.join(installDir, "config.json"), "{}");

    expect(listAgentWitchLaunchTargets(installDir)).toEqual([
      {
        profileEmail: null,
        launchAgentLabel: "com.agent-witch",
      },
    ]);
  });

  it("still returns one launch agent when multiple profiles exist", () => {
    const installDir = createTempInstallDir();
    for (const profileEmail of ["a@example.com", "b@example.com"]) {
      const profileDir = path.join(installDir, "profiles", profileEmail);
      fs.mkdirSync(profileDir, { recursive: true });
      fs.writeFileSync(path.join(profileDir, "config.json"), "{}");
    }

    expect(listAgentWitchLaunchTargets(installDir)).toEqual([
      {
        profileEmail: "a@example.com",
        launchAgentLabel: "com.agent-witch",
      },
    ]);
  });
});
