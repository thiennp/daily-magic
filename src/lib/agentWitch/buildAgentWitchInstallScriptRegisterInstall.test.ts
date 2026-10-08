import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptRegisterInstall } from "@/lib/agentWitch/buildAgentWitchInstallScriptRegisterInstall";

describe("buildAgentWitchInstallScriptRegisterInstall", () => {
  it("AGENT-048: register-install device label includes macOS username", () => {
    const script = buildAgentWitchInstallScriptRegisterInstall({
      appOrigin: "https://www.agentwitch.com",
    });

    expect(script).toContain("MACOS_USERNAME=");
    expect(script).toContain(
      'DEVICE_LABEL="${DEVICE_HOSTNAME}#${MACOS_USERNAME}"',
    );
    expect(script).toContain("/api/agent-witch/register-install");
    expect(script).toContain("installBundleVersion");
    expect(script).toContain("wakePort");
    expect(script).toContain("REGISTER_PLATFORM");
    expect(script).toContain("platformRaw === 'linux'");
  });

  it("HOME-065 Soft HOLD: fails loud on register-install 404/409 (no || true mask)", () => {
    const script = buildAgentWitchInstallScriptRegisterInstall({
      appOrigin: "https://www.agentwitch.com",
    });

    expect(script).toContain("REGISTER_HTTP_CODE=");
    expect(script).toContain('"%{http_code}"');
    expect(script).toContain('"${REGISTER_HTTP_CODE}" == "404"');
    expect(script).toContain('"${REGISTER_HTTP_CODE}" == "409"');
    expect(script).toContain("exit 1");
    expect(script).not.toContain(">/dev/null 2>&1 || true");
    expect(script).toContain(
      "This install token is invalid or revoked. Open Home → Connect this computer for a fresh command.",
    );
  });

  it("keeps the registered device id for the finish summary before deleting the body", () => {
    const script = buildAgentWitchInstallScriptRegisterInstall({
      appOrigin: "https://www.agentwitch.com",
    });
    const readAt = script.indexOf("REGISTERED_DEVICE_ID=");

    expect(readAt).toBeGreaterThan(-1);
    expect(script.lastIndexOf('rm -f "${REGISTER_BODY_FILE}"')).toBeGreaterThan(
      readAt,
    );
    expect(script).toContain("/^[A-Za-z0-9-]{1,64}$/");
  });
});
