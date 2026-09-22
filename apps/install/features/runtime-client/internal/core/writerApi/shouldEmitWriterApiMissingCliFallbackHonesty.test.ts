import { describe, expect, it, vi } from "vitest";

import type { AgentWitchRunConfig } from "../readAgentWitchRunConfig";

const mocks = vi.hoisted(() => ({
  readWriterApiProviderSecret: vi.fn(),
}));

vi.mock("./readWriterApiSecrets", () => ({
  readWriterApiProviderSecret: mocks.readWriterApiProviderSecret,
}));

import { shouldEmitWriterApiMissingCliFallbackHonesty } from "./shouldEmitWriterApiMissingCliFallbackHonesty";

const baseConfig = (
  writerExecutionBackend: "cli" | "api",
): AgentWitchRunConfig =>
  ({
    layout: { configPath: "/tmp/.agent-witch/config.json" },
    workspace: "/tmp/workspace",
    writerExecutionBackend,
    claudeCommand: "claude",
    codexCommand: "codex",
    cursorCommand: "cursor",
    antigravityCommand: "antigravity",
  }) as AgentWitchRunConfig;

describe("shouldEmitWriterApiMissingCliFallbackHonesty", () => {
  it("returns false when Writer API path is active", () => {
    mocks.readWriterApiProviderSecret.mockReturnValue({
      apiKey: "sk-test",
    });

    expect(
      shouldEmitWriterApiMissingCliFallbackHonesty(
        baseConfig("api"),
        "claude-cli",
      ),
    ).toBe(false);
  });

  it("returns true for CLI path when anthropic key is absent", () => {
    mocks.readWriterApiProviderSecret.mockReturnValue(null);

    expect(
      shouldEmitWriterApiMissingCliFallbackHonesty(
        baseConfig("cli"),
        "claude-cli",
      ),
    ).toBe(true);
  });
});
