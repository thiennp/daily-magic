import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { createTempCliIo } from "./createNodeCliFs";
import { CLAUDE_GLOBAL_CLAUDE_MD_RELATIVE } from "./tokenSaverMarkers.constants";
import { writeClaudeGlobalClaudeMd } from "./writeClaudeGlobalClaudeMd";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

describe("writeClaudeGlobalClaudeMd", () => {
  it("writes knowledge instructions for Claude Code", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-claude-md-"));
    tempDirs.push(root);
    const io = createTempCliIo(root);
    expect(writeClaudeGlobalClaudeMd({ io }).wrote).toBe(true);
    const body = io.readUtf8(path.join(root, CLAUDE_GLOBAL_CLAUDE_MD_RELATIVE));
    expect(body).toContain("/knowledge/update");
    expect(body).toContain("any local agent");
    expect(body).toContain("# BEGIN agent-witch-token-saver-task-intake");
    expect(body).toContain("AgentWitch · task intake");
    expect(writeClaudeGlobalClaudeMd({ io }).wrote).toBe(false);
  });
});
