import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { createTempCliIo } from "./createNodeCliFs";
import { writeCursorGlobalMcp } from "./writeCursorGlobalMcp";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

describe("writeCursorGlobalMcp", () => {
  it("writes fresh mcp.json and preserves sibling servers on re-run", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-cmcp-"));
    tempDirs.push(root);
    const io = createTempCliIo(root);
    const cursorDir = path.join(root, ".cursor");
    io.mkdirp(cursorDir);
    io.writeUtf8(
      path.join(cursorDir, "mcp.json"),
      `${JSON.stringify({ mcpServers: { other: { command: "x" } } }, null, 2)}\n`,
    );
    const first = writeCursorGlobalMcp({ io });
    expect(first.wrote).toBe(true);
    const parsed = JSON.parse(io.readUtf8(first.path)) as {
      mcpServers: Record<string, { command: string; args?: string[] }>;
    };
    expect(parsed.mcpServers.other.command).toBe("x");
    expect(parsed.mcpServers["agent-witch"]?.command).toBe("agent-witch");
    expect(parsed.mcpServers["agent-witch"]?.args).toEqual(["mcp"]);
    expect(writeCursorGlobalMcp({ io }).wrote).toBe(false);
  });
});
