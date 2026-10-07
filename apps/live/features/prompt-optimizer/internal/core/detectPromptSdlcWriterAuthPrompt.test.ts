import { describe, expect, it } from "vitest";

import {
  AGY_AUTH_REQUIRED_PROMPT_STDERR,
  AGY_AUTH_TIMED_OUT_STDERR,
} from "./agyAuthRequiredOutput.fixture";
import {
  buildPromptSdlcWriterSignInMessage,
  detectPromptSdlcWriterAuthPrompt,
} from "./detectPromptSdlcWriterAuthPrompt";

describe("detectPromptSdlcWriterAuthPrompt", () => {
  it("detects the exact agy sign-in prompt on stderr (before the 60 s wait)", () => {
    expect(
      detectPromptSdlcWriterAuthPrompt({
        stdout: "",
        stderr: AGY_AUTH_REQUIRED_PROMPT_STDERR,
      }),
    ).toBe(true);
  });

  it("detects the first agy stderr line alone (streamed chunk)", () => {
    expect(
      detectPromptSdlcWriterAuthPrompt({
        stdout: "",
        stderr: "Authentication required. Please visit the URL to log in:\n",
      }),
    ).toBe(true);
  });

  it("detects the agy timeout tail", () => {
    expect(
      detectPromptSdlcWriterAuthPrompt({
        stdout: "",
        stderr: AGY_AUTH_TIMED_OUT_STDERR,
      }),
    ).toBe(true);
  });

  it("detects other CLIs' not-signed-in lines on stderr", () => {
    for (const stderr of [
      "Error: Not logged in. Please run `codex login`.",
      "Authentication required. Please run 'cursor-agent login'.",
      "Login required",
    ]) {
      expect(detectPromptSdlcWriterAuthPrompt({ stdout: "", stderr })).toBe(
        true,
      );
    }
  });

  it("ignores a model reply that merely mentions login wording", () => {
    expect(
      detectPromptSdlcWriterAuthPrompt({
        stdout:
          "Improved prompt: when the API says 'authentication required', ask the user to log in.",
        stderr: "",
      }),
    ).toBe(false);
    expect(
      detectPromptSdlcWriterAuthPrompt({
        stdout: "Tell users: please visit the URL to log in.",
        stderr: "",
      }),
    ).toBe(false);
  });

  it("detects a full interactive prompt printed on stdout", () => {
    expect(
      detectPromptSdlcWriterAuthPrompt({
        stdout: AGY_AUTH_REQUIRED_PROMPT_STDERR,
        stderr: "",
      }),
    ).toBe(true);
  });
});

describe("buildPromptSdlcWriterSignInMessage", () => {
  it("gives the plain Antigravity fix", () => {
    expect(buildPromptSdlcWriterSignInMessage("antigravity")).toBe(
      "Antigravity CLI isn't signed in on this computer. Open Terminal, run `agy` once and finish sign-in, then retry.",
    );
  });

  it("never contains a URL or OAuth state for any writer", () => {
    for (const writer of [
      "antigravity",
      "claude-cli",
      "codex",
      "cursor",
    ] as const) {
      const message = buildPromptSdlcWriterSignInMessage(writer);
      expect(message).not.toMatch(/https?:|accounts\.google|state=|client_id/i);
      expect(message).toMatch(/isn't signed in on this computer/);
    }
  });
});
