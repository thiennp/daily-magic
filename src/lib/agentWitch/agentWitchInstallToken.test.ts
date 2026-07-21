import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallCommandWithToken } from "@/lib/agentWitch/buildAgentWitchInstallCommandWithToken";
import {
  generateAgentWitchPairingToken,
  isValidAgentWitchPairingToken,
} from "@/lib/agentWitch/generateAgentWitchPairingToken";
import { parseRegisterInstallBody } from "@/lib/agentWitch/parseRegisterInstallBody";
import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

describe("generateAgentWitchPairingToken", () => {
  it("creates a 64-character hex token", () => {
    const token = generateAgentWitchPairingToken();
    expect(token).toHaveLength(64);
    expect(isValidAgentWitchPairingToken(token)).toBe(true);
  });

  it("rejects invalid pairing tokens", () => {
    expect(isValidAgentWitchPairingToken("")).toBe(false);
    expect(isValidAgentWitchPairingToken("abc")).toBe(false);
    expect(isValidAgentWitchPairingToken("g".repeat(64))).toBe(false);
  });
});

describe("buildAgentWitchInstallCommandWithToken", () => {
  it("embeds token and email in the install curl command", () => {
    const pairingToken = "a".repeat(64);
    const command = buildAgentWitchInstallCommandWithToken({
      origin: "https://www.agentwitch.com",
      pairingToken,
      profileEmail: "Owner@Example.com",
    });

    expect(command).toContain("curl -fsSL");
    expect(command).toContain("token=" + pairingToken);
    expect(command).toContain("email=owner%40example.com");
    expect(command).toContain("| bash");
  });
});

describe("parseRegisterInstallBody", () => {
  it("accepts a valid register-install payload", () => {
    const pairingToken = "b".repeat(64);
    expect(
      parseRegisterInstallBody({
        pairingToken,
        deviceLabel: "MacBook-Pro",
      }),
    ).toEqual({
      pairingToken,
      deviceLabel: "MacBook-Pro",
    });
  });

  it("rejects missing device labels", () => {
    expect(
      parseRegisterInstallBody({
        pairingToken: "c".repeat(64),
        deviceLabel: " ",
      }),
    ).toBeNull();
  });
});

describe("renderInstallAgentWitchScript preset token", () => {
  it("injects preset pairing token and profile email into install script", () => {
    const pairingToken = "d".repeat(64);
    const script = renderInstallAgentWitchScript("http://localhost:3000", {
      presetPairingToken: pairingToken,
      presetProfileEmail: "owner@example.com",
    });

    expect(script).toContain(`PRESET_PAIRING_TOKEN="${pairingToken}"`);
    expect(script).toContain('PRESET_PROFILE_EMAIL="owner@example.com"');
    expect(script).toContain("/api/agent-witch/register-install");
  });
});
