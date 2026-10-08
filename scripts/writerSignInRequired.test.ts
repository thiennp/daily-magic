import { describe, expect, it } from "vitest";

import {
  CODEX_SIGN_IN_REQUIRED_MESSAGE,
  resolveWriterCliInstallLogLine,
  resolveWriterSignInRequiredReason,
} from "./writerSignInRequired";

describe("resolveWriterSignInRequiredReason (5ca01f06)", () => {
  it("fails fast when ensure-writer says Codex needs sign-in", () => {
    expect(
      resolveWriterSignInRequiredReason(
        "codex",
        "  Codex CLI needs ChatGPT sign-in. Complete browser login if prompted…\n",
      ),
    ).toBe(CODEX_SIGN_IN_REQUIRED_MESSAGE);
  });

  it("keeps waiting for other output or writers", () => {
    expect(
      resolveWriterSignInRequiredReason("codex", "→ Codex CLI (ChatGPT)\n"),
    ).toBeNull();
    expect(
      resolveWriterSignInRequiredReason(
        "claude-cli",
        "Codex CLI needs ChatGPT sign-in.",
      ),
    ).toBeNull();
  });
});

describe("resolveWriterCliInstallLogLine (77e29f7a)", () => {
  it("logs when ensure-writer installs a missing CLI", () => {
    expect(
      resolveWriterCliInstallLogLine(
        "  Installing Codex CLI on this computer (not found on PATH).\n",
      ),
    ).toBe(
      "[agent-witch] ensure-writer: installing the Codex CLI on this computer (it was not on PATH).",
    );
    expect(
      resolveWriterCliInstallLogLine("  Codex CLI authenticated."),
    ).toBeNull();
  });
});
