import { describe, expect, it } from "vitest";

import {
  buildWriterCliInvocation,
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
} from "./buildWriterCliInvocation";

describe("buildWriterCliInvocation", () => {
  const commands = resolveWriterCliCommands({});

  it("builds claude-cli invocation with full permissions", () => {
    expect(
      buildWriterCliInvocation("claude-cli", "  run tests  ", commands),
    ).toEqual({
      command: "claude",
      args: ["-p", "--dangerously-skip-permissions", "run tests"],
    });
  });

  it("builds codex exec with full filesystem access", () => {
    expect(buildWriterCliInvocation("codex", "sync rules", commands)).toEqual({
      command: "codex",
      args: ["exec", "-s", "danger-full-access", "sync rules"],
    });
  });

  it("builds cursor agent without sandbox", () => {
    expect(buildWriterCliInvocation("cursor", "write file", commands)).toEqual({
      command: "cursor",
      args: [
        "agent",
        "-p",
        "--force",
        "--trust",
        "--sandbox",
        "disabled",
        "write file",
      ],
    });
  });

  it("builds antigravity headless invocation", () => {
    expect(buildWriterCliInvocation("antigravity", "plan", commands)).toEqual({
      command: "agy",
      args: ["-p", "--dangerously-skip-permissions", "plan"],
    });
  });

  it("uses custom command paths from config", () => {
    const custom = resolveWriterCliCommands({
      claudeCommand: "/opt/claude",
      codexCommand: "/opt/codex",
      cursorCommand: "/opt/cursor",
      antigravityCommand: "/opt/agy",
    });

    expect(buildWriterCliInvocation("cursor", "task", custom)?.command).toBe(
      "/opt/cursor",
    );
  });

  it("returns null for empty prompts", () => {
    expect(buildWriterCliInvocation("codex", "", commands)).toBeNull();
    expect(buildWriterCliInvocation("codex", "   ", commands)).toBeNull();
  });
});

describe("isHarnessWriterAgentId", () => {
  it("accepts known writer agents", () => {
    expect(isHarnessWriterAgentId("claude-cli")).toBe(true);
    expect(isHarnessWriterAgentId("codex")).toBe(true);
    expect(isHarnessWriterAgentId("cursor")).toBe(true);
    expect(isHarnessWriterAgentId("antigravity")).toBe(true);
  });

  it("rejects unknown values", () => {
    expect(isHarnessWriterAgentId("gpt")).toBe(false);
  });
});
