import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import hashPairingToken from "./hashPairingToken";
import { resolveConnectedProfileWakeIdentityPrimaryTokenHash } from "./resolveConnectedProfileWakeIdentityPrimaryTokenHash";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("resolveConnectedProfileWakeIdentityPrimaryTokenHash (HOME-064)", () => {
  it("prefers the profile with the freshest non-stale connection health", () => {
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-connected-profile-"),
    );
    tempDirs.push(installDir);
    const previousHome = process.env.AGENT_WITCH_HOME;
    process.env.AGENT_WITCH_HOME = installDir;

    const activeEmail = "active@example.com";
    const connectedEmail = "connected@example.com";
    const now = Date.now();

    for (const [email, token, ackOffsetMs] of [
      [activeEmail, "token-active", 60_000],
      [connectedEmail, "token-connected", 0],
    ] as const) {
      const profileDir = path.join(installDir, "profiles", email);
      fs.mkdirSync(profileDir, { recursive: true });
      fs.writeFileSync(
        path.join(profileDir, "config.json"),
        `${JSON.stringify({
          pairingToken: token,
          wsUrl: "wss://www.agentwitch.com/api/agent-witch/ws",
        })}\n`,
      );
      fs.writeFileSync(
        path.join(profileDir, "connection-health.json"),
        `${JSON.stringify({
          lastAckAt: new Date(now - ackOffsetMs).toISOString(),
          wsUrl: "wss://www.agentwitch.com/api/agent-witch/ws",
          connectedAt: new Date(now - 120_000).toISOString(),
        })}\n`,
      );
    }

    fs.writeFileSync(
      path.join(installDir, "active-profile.json"),
      `${JSON.stringify({ email: activeEmail })}\n`,
    );

    expect(
      resolveConnectedProfileWakeIdentityPrimaryTokenHash(installDir),
    ).toBe(hashPairingToken("token-connected"));

    if (previousHome === undefined) {
      delete process.env.AGENT_WITCH_HOME;
    } else {
      process.env.AGENT_WITCH_HOME = previousHome;
    }
  });
});
