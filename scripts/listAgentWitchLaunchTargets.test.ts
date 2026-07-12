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

describe("listAgentWitchLaunchTargets", () => {
  it("returns legacy launch agent when only root config exists", () => {
    const installDir = createTempInstallDir();
    fs.writeFileSync(path.join(installDir, "config.json"), "{}");

    expect(listAgentWitchLaunchTargets(installDir)).toEqual([
      {
        profileEmail: null,
        launchAgentLabel: "com.daily-magic.agent-witch",
      },
    ]);
  });

  it("returns profile launch agents from profiles directory", () => {
    const installDir = createTempInstallDir();
    const profileDir = path.join(
      installDir,
      "profiles",
      "nguyenphongthien@gmail.com",
    );
    fs.mkdirSync(profileDir, { recursive: true });
    fs.writeFileSync(path.join(profileDir, "config.json"), "{}");

    expect(listAgentWitchLaunchTargets(installDir)).toEqual([
      {
        profileEmail: "nguyenphongthien@gmail.com",
        launchAgentLabel:
          "com.daily-magic.agent-witch.nguyenphongthien-at-gmail-com",
      },
    ]);
  });
});
