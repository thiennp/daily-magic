import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import hashPairingToken from "./hashPairingToken";
import { listAgentWitchLocalTokenHashes } from "./listAgentWitchLocalTokenHashes";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("listAgentWitchLocalTokenHashes", () => {
  it("AGENT-047: collects hashes from legacy and profile configs", () => {
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-hashes-"),
    );
    tempDirs.push(installDir);

    fs.writeFileSync(
      path.join(installDir, "config.json"),
      `${JSON.stringify({ pairingToken: "legacy-token", wsUrl: "wss://x" })}\n`,
    );
    fs.mkdirSync(path.join(installDir, "profiles", "a@example.com"), {
      recursive: true,
    });
    fs.writeFileSync(
      path.join(installDir, "profiles", "a@example.com", "config.json"),
      `${JSON.stringify({ pairingToken: "profile-token", wsUrl: "wss://x" })}\n`,
    );

    const hashes = listAgentWitchLocalTokenHashes(installDir);
    expect(hashes).toEqual(
      expect.arrayContaining([
        hashPairingToken("legacy-token"),
        hashPairingToken("profile-token"),
      ]),
    );
    expect(hashes).toHaveLength(2);
  });
});
