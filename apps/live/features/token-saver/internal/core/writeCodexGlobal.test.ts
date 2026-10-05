import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { createTempCliIo } from "./createNodeCliFs";
import { MARKER_BEGIN } from "./tokenSaverMarkers.constants";
import { writeCodexGlobalAgents } from "./writeCodexGlobalAgents";
import { writeCodexGlobalConfig } from "./writeCodexGlobalConfig";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

describe("writeCodexGlobal", () => {
  it("merges config.toml and AGENTS.md without clobbering user text", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-codex-"));
    tempDirs.push(root);
    const io = createTempCliIo(root);
    const codex = path.join(root, ".codex");
    io.mkdirp(codex);
    io.writeUtf8(path.join(codex, "config.toml"), "model = \"o3\"\n");
    io.writeUtf8(path.join(codex, "AGENTS.md"), "# User agents\n");
    expect(writeCodexGlobalConfig({ io }).wrote).toBe(true);
    expect(writeCodexGlobalAgents({ io }).wrote).toBe(true);
    const toml = io.readUtf8(path.join(codex, "config.toml"));
    expect(toml.startsWith("model = \"o3\"")).toBe(true);
    expect(toml).toContain(MARKER_BEGIN);
    expect(toml).toContain("[mcp_servers.agent-witch]");
    const agents = io.readUtf8(path.join(codex, "AGENTS.md"));
    expect(agents.startsWith("# User agents")).toBe(true);
    expect(agents).toContain("check_context");
    expect(writeCodexGlobalConfig({ io }).wrote).toBe(false);
    expect(writeCodexGlobalAgents({ io }).wrote).toBe(false);
  });
});
