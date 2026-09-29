import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import {
  buildWriterCliInvocation,
  buildWriterSessionStartInvocation,
  cursorCommandUsesStandaloneAgentBinary,
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
} from "./buildWriterCliInvocation";

describe("buildWriterCliInvocation", () => {
  const commands = resolveWriterCliCommands({
    cursorCommand: "cursor",
  });

  it("builds claude-cli invocation with full permissions", () => {
    expect(
      buildWriterCliInvocation("claude-cli", "  run tests  ", commands),
    ).toEqual({
      command: "claude",
      args: [
        "-p",
        "--output-format",
        "json",
        "--dangerously-skip-permissions",
        "run tests",
      ],
    });
  });

  it("builds claude-cli continuation turn", () => {
    expect(
      buildWriterCliInvocation("claude-cli", "follow up", commands, {
        sessionTurn: "continue",
      }),
    ).toEqual({
      command: "claude",
      args: [
        "--continue",
        "-p",
        "--output-format",
        "json",
        "--dangerously-skip-permissions",
        "follow up",
      ],
    });
  });

  it("builds antigravity continuation turn", () => {
    expect(
      buildWriterCliInvocation("antigravity", "follow up", commands, {
        sessionTurn: "continue",
      }),
    ).toEqual({
      command: "agy",
      args: ["--continue", "-p", "--dangerously-skip-permissions", "follow up"],
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

  it("builds cursor agent continuation turn", () => {
    expect(
      buildWriterCliInvocation("cursor", "follow up", commands, {
        sessionTurn: "continue",
      }),
    ).toEqual({
      command: "cursor",
      args: [
        "agent",
        "--continue",
        "-p",
        "--force",
        "--trust",
        "--sandbox",
        "disabled",
        "follow up",
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

  it("builds cursor session start invocation", () => {
    expect(buildWriterSessionStartInvocation("cursor", commands)).toEqual({
      command: "cursor",
      args: ["agent", "-v"],
    });
  });

  it("builds standalone cursor-agent session start invocation", () => {
    const standalone = resolveWriterCliCommands({
      cursorCommand: "/home/dev/.local/bin/agent",
    });
    expect(buildWriterSessionStartInvocation("cursor", standalone)).toEqual({
      command: "/home/dev/.local/bin/agent",
      args: ["-v"],
    });
    expect(
      buildWriterCliInvocation("cursor", "task", standalone)?.args,
    ).toEqual(["-p", "--force", "--trust", "--sandbox", "disabled", "task"]);
  });

  it("detects standalone cursor agent binaries by basename", () => {
    expect(cursorCommandUsesStandaloneAgentBinary("agent")).toBe(true);
    expect(cursorCommandUsesStandaloneAgentBinary("cursor-agent")).toBe(true);
    expect(cursorCommandUsesStandaloneAgentBinary("cursor")).toBe(false);
    expect(cursorCommandUsesStandaloneAgentBinary("/opt/cursor")).toBe(false);
  });

  it("resolves default cursor placeholder to standalone agent when installed", () => {
    const existsSpy = vi.spyOn(fs, "existsSync").mockImplementation((p) => {
      return String(p).endsWith("/.local/bin/agent");
    });
    const resolved = resolveWriterCliCommands({ cursorCommand: "cursor" });
    expect(resolved.cursorCommand).toMatch(/[/\\]agent$/);
    expect(
      buildWriterCliInvocation("cursor", "task", resolved)?.args,
    ).not.toContain("agent");
    existsSpy.mockRestore();
  });

  it("builds claude-cli session start invocation", () => {
    expect(buildWriterSessionStartInvocation("claude-cli", commands)).toEqual({
      command: "claude",
      args: ["-v"],
    });
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
