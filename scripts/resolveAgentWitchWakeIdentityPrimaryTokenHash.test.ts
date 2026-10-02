import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import hashPairingToken from "./hashPairingToken";
import { resolveAgentWitchWakeIdentityPrimaryTokenHash } from "./resolveAgentWitchWakeIdentityPrimaryTokenHash";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("resolveAgentWitchWakeIdentityPrimaryTokenHash (HOME-063)", () => {
  it("prefers active-profile.json over alphabetically first profile", () => {
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-wake-primary-"),
    );
    tempDirs.push(installDir);

    const activeEmail = "b@example.com";
    const otherEmail = "a@example.com";

    for (const email of [activeEmail, otherEmail]) {
      const profileDir = path.join(installDir, "profiles", email);
      fs.mkdirSync(profileDir, { recursive: true });
      fs.writeFileSync(
        path.join(profileDir, "config.json"),
        `${JSON.stringify({
          pairingToken: `token-${email}`,
          wsUrl: "wss://www.agentwitch.com/api/agent-witch/ws",
        })}\n`,
      );
    }

    fs.writeFileSync(
      path.join(installDir, "active-profile.json"),
      `${JSON.stringify({ email: activeEmail })}\n`,
    );

    expect(resolveAgentWitchWakeIdentityPrimaryTokenHash(installDir)).toBe(
      hashPairingToken(`token-${activeEmail}`),
    );
  });
});
