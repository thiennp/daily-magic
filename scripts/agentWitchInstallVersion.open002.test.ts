import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";

import {
  ensureAgentWitchInstallVersionRecorded,
  resolveAgentWitchHeartbeatInstallBundleVersion,
} from "./agentWitchInstallVersion";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

describe("agentWitchInstallVersion OPEN-002", () => {
  it("falls back to shipped bundle version for heartbeat when file is missing", () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-version-"));
    tempDirs.push(installDir);

    expect(resolveAgentWitchHeartbeatInstallBundleVersion(installDir)).toBe(
      AGENT_WITCH_INSTALL_BUNDLE_VERSION,
    );
  });

  it("writes install-version.json on startup when missing", () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-version-"));
    tempDirs.push(installDir);

    const record = ensureAgentWitchInstallVersionRecorded(
      installDir,
      "https://www.agentwitch.com",
    );

    expect(record.bundleVersion).toBe(AGENT_WITCH_INSTALL_BUNDLE_VERSION);
    expect(resolveAgentWitchHeartbeatInstallBundleVersion(installDir)).toBe(
      AGENT_WITCH_INSTALL_BUNDLE_VERSION,
    );
  });
});
