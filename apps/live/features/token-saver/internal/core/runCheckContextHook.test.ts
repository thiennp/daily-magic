import { describe, expect, it, vi } from "vitest";

import type { CheckContextResult } from "../../public-api/types";
import { CHECK_CONTEXT_CREATE_PROMPT } from "./checkContextHookText.constant";
import { runCheckContextHook } from "./runCheckContextHook";
import {
  CHECK_CONTEXT_HOOK_NAME,
  CHECK_CONTEXT_HOOK_SUBCOMMAND,
  CLAUDE_HOOK_COMMAND,
} from "./tokenSaverMarkers.constants";

const claudeInput = {
  session_id: "sess-1",
  transcript_path: "/tmp/t.jsonl",
  cwd: "/repo",
  permission_mode: "default",
  hook_event_name: "UserPromptSubmit",
  prompt: "fix the sqlite busy error",
};

const run = async (
  stdin: string | Error,
  runner: (raw: unknown) => CheckContextResult | Promise<CheckContextResult>,
) => {
  const stdout: string[] = [];
  const stderr: string[] = [];
  const runCheckContext = vi.fn(runner);
  const code = await runCheckContextHook({
    readStdin: async () => {
      if (stdin instanceof Error) {
        throw stdin;
      }
      return stdin;
    },
    writeStdout: (text) => stdout.push(text),
    writeStderr: (text) => stderr.push(text),
    runCheckContext,
  });
  return { code, stdout: stdout.join(""), stderr: stderr.join(""), runCheckContext };
};

const parseContext = (stdout: string): unknown =>
  (JSON.parse(stdout) as {
    hookSpecificOutput: { hookEventName: string; additionalContext: string };
  }).hookSpecificOutput;

describe("runCheckContextHook (Claude UserPromptSubmit)", () => {
  it("setup_project writes exactly the subcommand the app entry dispatches", () => {
    expect(CLAUDE_HOOK_COMMAND).toBe("agent-witch mcp-hook check_context");
    expect(CHECK_CONTEXT_HOOK_SUBCOMMAND).toBe("mcp-hook");
    expect(CHECK_CONTEXT_HOOK_NAME).toBe("check_context");
  });

  it("maps stdin {cwd,prompt,session_id} to check_context and prints the tip on hit", async () => {
    const out = await run(JSON.stringify(claudeInput), () => ({
      status: "hit",
      projectId: "p1",
      pitfalls: [{ id: "sqlite-busy", avoidance: "set busy_timeout" }],
      tip: "AgentWitch tip · check_context\nsqlite-busy|set busy_timeout",
    }));
    expect(out.code).toBe(0);
    expect(out.runCheckContext).toHaveBeenCalledWith({
      cwd: "/repo",
      message: "fix the sqlite busy error",
      sessionId: "sess-1",
    });
    expect(parseContext(out.stdout)).toEqual({
      hookEventName: "UserPromptSubmit",
      additionalContext:
        "AgentWitch tip · check_context\nsqlite-busy|set busy_timeout",
    });
    expect(out.stderr).toBe("");
  });

  it("prints the create prompt on none + promptCreate", async () => {
    const out = await run(JSON.stringify(claudeInput), () => ({
      status: "none",
      promptCreate: true,
    }));
    expect(out.code).toBe(0);
    expect(parseContext(out.stdout)).toEqual({
      hookEventName: "UserPromptSubmit",
      additionalContext: CHECK_CONTEXT_CREATE_PROMPT,
    });
  });

  it.each<CheckContextResult>([
    { status: "miss", projectId: "p1" },
    { status: "none" },
    { status: "none", promptCreate: false },
    { status: "hit", projectId: "p1", pitfalls: [], tip: "  " },
  ])("prints nothing for %j", async (result) => {
    const out = await run(JSON.stringify(claudeInput), () => result);
    expect(out).toMatchObject({ code: 0, stdout: "", stderr: "" });
  });

  it("bad stdin: exit 0, nothing on stdout, runner not called, stderr note", async () => {
    for (const stdin of ["", "not json", "[1,2]", "null", "\"str\""]) {
      const out = await run(stdin, () => ({ status: "hit", tip: "x" }));
      expect(out.code).toBe(0);
      expect(out.stdout).toBe("");
      expect(out.runCheckContext).not.toHaveBeenCalled();
      expect(out.stderr).toContain("mcp-hook");
    }
  });

  it("omits blank / non-string fields", async () => {
    const out = await run(
      JSON.stringify({ cwd: "  ", prompt: 42, session_id: null }),
      () => ({ status: "none" }),
    );
    expect(out.runCheckContext).toHaveBeenCalledWith({});
    expect(out.stdout).toBe("");
  });

  it("runner throw / reject and stdin failure never block: exit 0, stderr only", async () => {
    const thrown = await run(JSON.stringify(claudeInput), () => {
      throw new Error("db locked");
    });
    expect(thrown).toMatchObject({ code: 0, stdout: "" });
    expect(thrown.stderr).toContain("db locked");

    const rejected = await run(JSON.stringify(claudeInput), async () => {
      throw new Error("async fail");
    });
    expect(rejected).toMatchObject({ code: 0, stdout: "" });
    expect(rejected.stderr).toContain("async fail");

    const stdinFailed = await run(new Error("EPIPE"), () => ({ status: "hit", tip: "x" }));
    expect(stdinFailed).toMatchObject({ code: 0, stdout: "" });
    expect(stdinFailed.stderr).toContain("EPIPE");
  });

  it("still exits 0 when stderr itself throws", async () => {
    const code = await runCheckContextHook({
      readStdin: async () => "nope",
      writeStdout: () => undefined,
      writeStderr: () => {
        throw new Error("closed");
      },
      runCheckContext: () => ({ status: "none" }),
    });
    expect(code).toBe(0);
  });
});
