import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import {
  buildWriterCliInvocation,
  buildWriterSessionStartInvocation,
  cursorCommandUsesStandaloneAgentBinary,
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
} from "./buildWriterCliInvocation";
import {
  LOCAL_CLI_CLAUDE_ALLOWED_TOOLS,
  LOCAL_CLI_RUN_LIMITS,
} from "./localCliRunLimits.constant";

describe("buildWriterCliInvocation", () => {
  const commands = resolveWriterCliCommands({
    // Non-default path so tests stay on `cursor agent` (not standalone `agent` on Cloud VMs).
    cursorCommand: "/usr/bin/cursor",
  });

  it("builds claude-cli invocation with the workspace-write profile and limits", () => {
    expect(
      buildWriterCliInvocation("claude-cli", "  run tests  ", commands),
    ).toEqual({
      command: "claude",
      args: [
        "-p",
        "--output-format",
        "json",
        "--permission-mode",
        "dontAsk",
        "--allowedTools",
        "Read,Glob,Grep,Edit,Write,TodoWrite,Bash(git status *),Bash(git diff *),Bash(git log *),Bash(git show *)",
        "--max-turns",
        "30",
        "--max-budget-usd",
        "2.00",
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
        "--permission-mode",
        "dontAsk",
        "--allowedTools",
        "Read,Glob,Grep,Edit,Write,TodoWrite,Bash(git status *),Bash(git diff *),Bash(git log *),Bash(git show *)",
        "--max-turns",
        "30",
        "--max-budget-usd",
        "2.00",
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
      args: ["--continue", "--sandbox", "-p", "follow up"],
    });
  });

  it("builds codex exec with workspace-write sandbox and approval never", () => {
    expect(buildWriterCliInvocation("codex", "sync rules", commands)).toEqual({
      command: "codex",
      args: [
        "exec",
        "-s",
        "workspace-write",
        "-c",
        'approval_policy="never"',
        "sync rules",
      ],
    });
  });

  it("builds cursor agent with the sandbox enabled and no --force", () => {
    expect(buildWriterCliInvocation("cursor", "write file", commands)).toEqual({
      command: "/usr/bin/cursor",
      args: [
        "agent",
        "-p",
        "--trust",
        "--sandbox",
        "enabled",
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
      command: "/usr/bin/cursor",
      args: [
        "agent",
        "--continue",
        "-p",
        "--trust",
        "--sandbox",
        "enabled",
        "follow up",
      ],
    });
  });

  it("builds antigravity headless invocation", () => {
    expect(buildWriterCliInvocation("antigravity", "plan", commands)).toEqual({
      command: "agy",
      args: ["--sandbox", "-p", "plan"],
    });
  });

  it("never places another flag immediately after antigravity -p", () => {
    const invocation = buildWriterCliInvocation(
      "antigravity",
      "plan",
      commands,
    );
    expect(invocation).not.toBeNull();
    const promptFlagIndex = invocation?.args.indexOf("-p") ?? -1;
    expect(promptFlagIndex).toBeGreaterThanOrEqual(0);
    const valueAfterPromptFlag = invocation?.args[promptFlagIndex + 1];
    expect(valueAfterPromptFlag).not.toMatch(/^--/);
    expect(valueAfterPromptFlag).toBe("plan");
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
      command: "/usr/bin/cursor",
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
    ).toEqual(["-p", "--trust", "--sandbox", "enabled", "task"]);
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

describe("S0-4 workspace-write profile", () => {
  const commands = resolveWriterCliCommands({ cursorCommand: "/usr/bin/cursor" });
  const writers = ["claude-cli", "codex", "cursor", "antigravity"] as const;
  const BYPASS = [
    "--dangerously-skip-permissions",
    "danger-full-access",
    "--dangerously-bypass-approvals-and-sandbox",
    "--yolo",
    "--force",
    "bypassPermissions",
    "disabled",
  ];

  it.each(writers)("%s never gets a full-bypass flag (first and continue turns)", (writer) => {
    for (const sessionTurn of ["first", "continue"] as const) {
      const args = buildWriterCliInvocation(writer, "task", commands, { sessionTurn })?.args ?? [];
      for (const flag of BYPASS) {
        expect(args).not.toContain(flag);
      }
      expect(args[args.length - 1]).toBe("task");
    }
  });

  it("takes claude limits from LOCAL_CLI_RUN_LIMITS (one place)", () => {
    const args = buildWriterCliInvocation("claude-cli", "task", commands)?.args ?? [];
    expect(args[args.indexOf("--max-turns") + 1]).toBe(String(LOCAL_CLI_RUN_LIMITS.maxTurns));
    expect(args[args.indexOf("--max-budget-usd") + 1]).toBe(
      LOCAL_CLI_RUN_LIMITS.maxBudgetUsd.toFixed(2),
    );
    expect(LOCAL_CLI_RUN_LIMITS).toEqual({ maxTurns: 30, maxMinutes: 30, maxBudgetUsd: 2 });
  });

  it("does not let the variadic --allowedTools swallow the prompt", () => {
    const args = buildWriterCliInvocation("claude-cli", "task", commands)?.args ?? [];
    const allowedIndex = args.indexOf("--allowedTools");
    expect(args[allowedIndex + 1]).toBe(LOCAL_CLI_CLAUDE_ALLOWED_TOOLS.join(","));
    expect(args[allowedIndex + 2]).toMatch(/^--/);
    // No unscoped Bash: only read-only git prefixes.
    expect([...LOCAL_CLI_CLAUDE_ALLOWED_TOOLS] as string[]).not.toContain("Bash");
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
