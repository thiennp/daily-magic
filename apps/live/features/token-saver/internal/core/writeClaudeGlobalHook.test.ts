import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { createTempCliIo } from "./createNodeCliFs";
import {
  CLAUDE_HOOK_COMMAND,
  CLAUDE_STOP_HOOK_COMMAND,
} from "./tokenSaverMarkers.constants";
import { writeClaudeGlobalHook } from "./writeClaudeGlobalHook";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

describe("writeClaudeGlobalHook", () => {
  it("upserts UserPromptSubmit and keeps other settings", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-claude-"));
    tempDirs.push(root);
    const io = createTempCliIo(root);
    const dir = path.join(root, ".claude");
    io.mkdirp(dir);
    io.writeUtf8(
      path.join(dir, "settings.json"),
      `${JSON.stringify({ theme: "dark", hooks: { PreToolUse: [] } }, null, 2)}\n`,
    );
    expect(writeClaudeGlobalHook({ io }).wrote).toBe(true);
    const parsed = JSON.parse(io.readUtf8(path.join(dir, "settings.json"))) as {
      theme: string;
      hooks: { UserPromptSubmit: unknown[]; PreToolUse: unknown[] };
    };
    expect(parsed.theme).toBe("dark");
    expect(parsed.hooks.PreToolUse).toEqual([]);
    const blob = JSON.stringify(parsed.hooks.UserPromptSubmit);
    expect(blob).toContain(CLAUDE_HOOK_COMMAND);
    expect(writeClaudeGlobalHook({ io }).wrote).toBe(false);
  });

  it("adds the Stop hook when only the prompt hook is installed, once", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-claude-"));
    tempDirs.push(root);
    const io = createTempCliIo(root);
    const file = path.join(root, ".claude", "settings.json");
    io.mkdirp(path.dirname(file));
    io.writeUtf8(
      file,
      JSON.stringify({
        hooks: {
          Stop: [{ hooks: [{ type: "command", command: "echo mine" }] }],
          UserPromptSubmit: [
            { hooks: [{ type: "command", command: CLAUDE_HOOK_COMMAND }] },
          ],
        },
      }),
    );
    expect(writeClaudeGlobalHook({ io }).wrote).toBe(true);
    const stop = (
      JSON.parse(io.readUtf8(file)) as { hooks: { Stop: unknown[] } }
    ).hooks.Stop;
    expect(stop).toHaveLength(2);
    expect(JSON.stringify(stop)).toContain("echo mine");
    expect(JSON.stringify(stop)).toContain(CLAUDE_STOP_HOOK_COMMAND);
    expect(writeClaudeGlobalHook({ io }).wrote).toBe(false);
  });
});
