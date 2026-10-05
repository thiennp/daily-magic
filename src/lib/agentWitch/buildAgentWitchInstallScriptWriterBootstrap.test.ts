import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptWriterBootstrap } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterBootstrap";

describe("buildAgentWitchInstallScriptWriterBootstrap", () => {
  it("does not invoke interactive claude or agy auth login in ensure-writer", () => {
    const script = buildAgentWitchInstallScriptWriterBootstrap();

    expect(script).not.toMatch(/^\s*claude auth login/m);
    expect(script).not.toMatch(/^\s*agy auth login/m);
    expect(script).not.toMatch(/^\s*cursor agent login/m);
  });

  it("checks gemini antigravity-cli oauth token path for agy auth", () => {
    const script = buildAgentWitchInstallScriptWriterBootstrap();

    expect(script).toContain(".gemini/antigravity-cli/antigravity-oauth-token");
    expect(script).not.toContain(
      'if [[ -f "${HOME}/.config/agy/credentials.json" ]]; then',
    );
  });
});
