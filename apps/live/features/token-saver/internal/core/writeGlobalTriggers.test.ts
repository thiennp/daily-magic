import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { createTempCliIo } from "./createNodeCliFs";
import { writeGlobalTriggers } from "./writeGlobalTriggers";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

describe("writeGlobalTriggers", () => {
  it("writes all global CLIs into an injected home (never real ~)", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-globals-"));
    tempDirs.push(root);
    const io = createTempCliIo(root);
    const first = writeGlobalTriggers({ io });
    expect(first.cursorMcp.wrote).toBe(true);
    expect(first.codexConfig.wrote).toBe(true);
    expect(first.codexAgents.wrote).toBe(true);
    expect(first.claudeHook.wrote).toBe(true);
    expect(first.cursorMcp.path.startsWith(root)).toBe(true);
    const second = writeGlobalTriggers({ io });
    expect(second.cursorMcp.wrote).toBe(false);
    expect(second.codexConfig.wrote).toBe(false);
    expect(second.codexAgents.wrote).toBe(false);
    expect(second.claudeHook.wrote).toBe(false);
  });
});
