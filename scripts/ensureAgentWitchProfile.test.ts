import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { ensureAgentWitchProfile } from "./ensureAgentWitchProfile";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  delete process.env.AGENT_WITCH_HOME;
});

describe("ensureAgentWitchProfile", () => {
  it("AGENT-047: does not copy another account token or steal active-profile", () => {
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-ensure-"),
    );
    tempDirs.push(installDir);
    process.env.AGENT_WITCH_HOME = installDir;

    fs.mkdirSync(path.join(installDir, "profiles", "a@example.com"), {
      recursive: true,
    });
    fs.writeFileSync(
      path.join(installDir, "profiles", "a@example.com", "config.json"),
      `${JSON.stringify({
        email: "a@example.com",
        pairingToken: "token-a",
        wsUrl: "wss://example",
      })}\n`,
    );
    fs.writeFileSync(
      path.join(installDir, "active-profile.json"),
      `${JSON.stringify({ email: "a@example.com" })}\n`,
    );

    expect(() => ensureAgentWitchProfile("b@example.com")).toThrow(
      /do not reuse another account/,
    );

    const created = ensureAgentWitchProfile("b@example.com", {
      pairingToken: "token-b",
      wsUrl: "wss://example",
    });
    expect(created.pairingToken).toBe("token-b");
    expect(
      JSON.parse(
        fs.readFileSync(path.join(installDir, "active-profile.json"), "utf8"),
      ),
    ).toEqual({ email: "a@example.com" });
    expect(
      JSON.parse(
        fs.readFileSync(
          path.join(installDir, "profiles", "a@example.com", "config.json"),
          "utf8",
        ),
      ).pairingToken,
    ).toBe("token-a");
  });
});
